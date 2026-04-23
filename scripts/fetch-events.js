const https = require("https");
const fs = require("fs");
const path = require("path");

const ICS_URL =
  process.env.ICS_URL ||
  "https://calendar.google.com/calendar/ical/albhakticommunity108%40gmail.com/public/basic.ics";
const OUTPUT = path.join(__dirname, "..", "src", "data", "events.json");
const DISPLAY_TIMEZONE = "America/Chicago";

function fetchUrl(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          if (redirectsLeft <= 0) return reject(new Error("Too many redirects"));
          res.resume();
          return fetchUrl(res.headers.location, redirectsLeft - 1).then(
            resolve,
            reject
          );
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function unfold(ics) {
  return ics.replace(/\r?\n[ \t]/g, "");
}

function unescapeIcs(s) {
  return s
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseEvents(ics) {
  const lines = unfold(ics).split(/\r?\n/);
  const events = [];
  let current = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") current = {};
    else if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
    } else if (current) {
      const idx = line.indexOf(":");
      if (idx < 0) continue;
      const head = line.slice(0, idx);
      const value = line.slice(idx + 1);
      const [key, ...paramParts] = head.split(";");
      const params = paramParts.join(";");
      if (key === "SUMMARY") current.summary = unescapeIcs(value);
      else if (key === "DESCRIPTION") current.description = unescapeIcs(value);
      else if (key === "LOCATION") current.location = unescapeIcs(value);
      else if (key === "DTSTART") current.dtstart = { value, params };
      else if (key === "DTEND") current.dtend = { value, params };
      else if (key === "UID") current.uid = value;
    }
  }
  return events;
}

function parseIcsDate(dt) {
  if (!dt) return null;
  const { value, params } = dt;
  const dateOnly =
    /VALUE=DATE(?!-TIME)/.test(params) || /^\d{8}$/.test(value);
  if (dateOnly) {
    const y = +value.slice(0, 4);
    const m = +value.slice(4, 6) - 1;
    const d = +value.slice(6, 8);
    return {
      date: new Date(Date.UTC(y, m, d, 12, 0, 0)),
      allDay: true,
    };
  }
  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!m) return null;
  const [, Y, Mo, D, H, Mi, S, Z] = m;
  if (Z === "Z") {
    return {
      date: new Date(Date.UTC(+Y, +Mo - 1, +D, +H, +Mi, +S)),
      allDay: false,
      utc: true,
    };
  }
  return {
    date: new Date(+Y, +Mo - 1, +D, +H, +Mi, +S),
    allDay: false,
    floating: true,
    components: { H, Mi },
  };
}

function formatDate(parsed) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: parsed.utc || !parsed.floating ? DISPLAY_TIMEZONE : undefined,
  };
  return new Intl.DateTimeFormat("en-US", options).format(parsed.date);
}

function formatTimePart(parsed) {
  if (parsed.floating) {
    let h = +parsed.components.H;
    const mi = parsed.components.Mi;
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${mi} ${ampm}`;
  }
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: DISPLAY_TIMEZONE,
  }).format(parsed.date);
}

function formatTime(start, end) {
  if (!start) return "";
  if (start.allDay) return "All Day";
  const s = formatTimePart(start);
  if (!end || end.allDay) return s;
  return `${s} - ${formatTimePart(end)}`;
}

function cleanDescription(desc, location) {
  if (!desc) return location ? `Location: ${location}` : "";
  let cleaned = desc
    .replace(/-::~:~::[\s\S]*$/, "")
    .replace(/https?:\/\/\S*calendar\.google\.com\S*/gi, "")
    .trim();
  if (!cleaned && location) cleaned = `Location: ${location}`;
  return cleaned;
}

async function main() {
  try {
    const ics = await fetchUrl(ICS_URL);
    const raw = parseEvents(ics);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const upcoming = raw
      .map((e) => ({
        ...e,
        start: parseIcsDate(e.dtstart),
        end: parseIcsDate(e.dtend),
      }))
      .filter((e) => e.start && e.start.date >= startOfToday)
      .sort((a, b) => a.start.date - b.start.date);

    const output = upcoming.map((e) => ({
      date: formatDate(e.start),
      title: e.summary || "Untitled Event",
      time: formatTime(e.start, e.end),
      description: cleanDescription(e.description, e.location),
    }));

    if (output.length === 0) {
      console.warn(
        "[fetch-events] Calendar returned 0 upcoming events. Keeping existing events.json so the UI stays populated."
      );
      return;
    }

    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + "\n", "utf8");
    console.log(
      `[fetch-events] Wrote ${output.length} upcoming event(s) to ${path.relative(
        process.cwd(),
        OUTPUT
      )}`
    );
  } catch (err) {
    console.warn(
      `[fetch-events] Could not fetch calendar (${err.message}). Keeping existing events.json.`
    );
    process.exit(0);
  }
}

main();
