const https = require("https");
const fs = require("fs");
const path = require("path");

const GRAPH_VERSION = "v22.0";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "";
const IG_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "";
const OUTPUT = path.join(__dirname, "..", "src", "data", "gallery.json");
const MAX_POSTS = 10;

const MEDIA_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,timestamp,permalink," +
  "children{id,media_type,media_url,thumbnail_url}";

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8");
          if (res.statusCode !== 200) {
            return reject(
              new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`)
            );
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error("Invalid JSON from Meta Graph API"));
          }
        });
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function normalizeMedia(item) {
  const mediaType = (item.media_type || "IMAGE").toUpperCase();

  if (mediaType === "VIDEO") {
    return {
      id: item.id,
      mediaType: "VIDEO",
      image: item.thumbnail_url || item.media_url || "",
      videoUrl: item.media_url || null,
      caption: item.caption || "",
      permalink: item.permalink || "",
      timestamp: item.timestamp || null,
    };
  }

  if (mediaType === "CAROUSEL_ALBUM") {
    const firstChild = item.children?.data?.[0] || {};
    const childType = (firstChild.media_type || "IMAGE").toUpperCase();
    return {
      id: item.id,
      mediaType: "CAROUSEL_ALBUM",
      image:
        childType === "VIDEO"
          ? firstChild.thumbnail_url || firstChild.media_url || ""
          : firstChild.media_url || "",
      videoUrl: null,
      caption: item.caption || "",
      permalink: item.permalink || "",
      timestamp: item.timestamp || null,
    };
  }

  return {
    id: item.id,
    mediaType: "IMAGE",
    image: item.media_url || "",
    videoUrl: null,
    caption: item.caption || "",
    permalink: item.permalink || "",
    timestamp: item.timestamp || null,
  };
}

async function main() {
  if (!ACCESS_TOKEN || !IG_ACCOUNT_ID) {
    console.warn(
      "[fetch-instagram] META_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID not set. Skipping; keeping existing gallery.json."
    );
    return;
  }

  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/${IG_ACCOUNT_ID}/media` +
    `?fields=${encodeURIComponent(MEDIA_FIELDS)}` +
    `&limit=${MAX_POSTS}` +
    `&access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  try {
    const response = await fetchJson(url);
    const items = Array.isArray(response.data) ? response.data : [];
    const posts = items
      .map(normalizeMedia)
      .filter((p) => p.image)
      .slice(0, MAX_POSTS);

    if (posts.length === 0) {
      console.warn(
        "[fetch-instagram] Instagram returned 0 posts. Keeping existing gallery.json so the UI stays populated."
      );
      return;
    }

    fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2) + "\n", "utf8");
    console.log(
      `[fetch-instagram] Wrote ${posts.length} post(s) to ${path.relative(
        process.cwd(),
        OUTPUT
      )}`
    );
  } catch (err) {
    console.warn(
      `[fetch-instagram] Could not fetch (${err.message}). Keeping existing gallery.json.`
    );
    process.exit(0);
  }
}

main();
