import { useEffect, useRef, useState } from "react";

const schedule = [
  { time: "5:00 AM",  title: "Early Risers",               optional: true,  desc: "Tulasi Arati & Deity Greeting",                                     icon: "🌅" },
  { time: "5:15 AM",  title: "Morning Walk",               optional: true,  desc: "Neighborhood Japa Walk",                                             icon: "🚶" },
  { time: "6:00 AM",  title: "Morning Program",            optional: false, desc: "Guruvashtakam, Nrsimha Prayers, Announcements, Daily Inspiration",   icon: "🙏" },
  { time: "6:30 AM",  title: "Japa Meditation",            optional: false, desc: "Personal Mantra Meditation on Beads",                                icon: "📿" },
  { time: "7:30 AM",  title: "Honoring Srila Prabhupada",  optional: false, desc: "Guru Puja",                                                          icon: "🪔" },
  { time: "7:45 AM",  title: "Morning Class",              optional: false, desc: "Srimad Bhagavatam Curriculum in Discussion Format",                  icon: "📖" },
  { time: "8:30 AM",  title: "Breakfast Prasadam",         optional: false, desc: null,                                                                 icon: "🍽️" },
  { time: "9 – 5",    title: "Work / Study Outside",       optional: false, desc: null,                                                                 icon: "💼" },
  { time: "2:30 PM",  title: "Lunch Prasadam",             optional: false, desc: "Grab from KH/KL or when back",                                      icon: "🥗" },
  { time: "6:00 PM",  title: "Evening Class",              optional: false, desc: "Bhakti Shastri Curriculum",                                         icon: "✏️" },
  { time: "7:00 PM",  title: "Evening Snack",              optional: false, desc: null,                                                                 icon: "🫖" },
];

const plusItems = [
  { label: "Weekly Events",          icon: "📅" },
  { label: "Nature Retreats",        icon: "🌿" },
  { label: "Sunday Community Lunch", icon: "🍛" },
  { label: "Saturday Harinams",      icon: "🎶" },
  { label: "& More",                 icon: "✨" },
];

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function TimelineItem({ item, index }) {
  const [ref, visible] = useReveal(0.1);
  const delay = `${index * 80}ms`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`group relative flex items-start gap-3 sm:gap-5 transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Timeline spine + dot */}
      <div className="relative flex flex-col items-center" style={{ width: 36 }}>
        <div className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300
          ${item.optional
            ? "border-clay/40 bg-sandal text-base group-hover:border-clay group-hover:scale-110"
            : "border-saffron bg-white text-base group-hover:bg-saffron/10 group-hover:scale-110"
          }`}
        >
          <span>{item.icon}</span>
        </div>
        {/* connector line — hide on last item */}
        <div className="w-px flex-1 bg-gradient-to-b from-saffron/40 to-saffron/10 mt-1" style={{ minHeight: 28 }} />
      </div>

      {/* Card */}
      <div className={`mb-4 flex-1 rounded-xl border px-3 py-3 shadow-sm transition-all duration-300
        group-hover:-translate-y-0.5 group-hover:shadow-md
        sm:mb-5 sm:rounded-2xl sm:px-5 sm:py-4
        ${item.optional
          ? "border-amber-100 bg-white/70"
          : "border-white/80 bg-white/90"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-base font-bold text-ink leading-snug">
            {item.title}
          </p>
          <div className="flex items-center gap-2">
            {item.optional && (
              <span className="rounded-full bg-sandal px-2.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-clay">
                Optional
              </span>
            )}
            <span className="font-body text-xs font-bold text-saffron tabular-nums">
              {item.time}
            </span>
          </div>
        </div>
        {item.desc && (
          <p className="mt-1 font-body text-xs text-stone-500 leading-relaxed">
            {item.desc}
          </p>
        )}
      </div>
    </div>
  );
}

function StudentLife() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [plusRef, plusVisible] = useReveal(0.15);

  return (
    <section className="pt-10 pb-12">
      <div className="section-shell">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`mb-6 text-center transition-all duration-700 ease-out
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="eyebrow">Student Life</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl md:text-4xl lg:text-5xl">
            A Day in the Life
          </h2>
          <p className="mt-2 font-body text-sm font-semibold uppercase tracking-widest text-clay">
            of a Part-Time KHSA Student
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-saffron to-transparent" />
        </div>

        {/* ── Timeline ── */}
        <div className="mx-auto max-w-lg">
          {schedule.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}

          {/* Last dot cap */}
          <div className="flex items-center gap-5">
            <div style={{ width: 36 }} className="flex justify-center">
              <div className="h-3 w-3 rounded-full bg-saffron/40" />
            </div>
          </div>
        </div>

        {/* ── Plus section ── */}
        <div
          ref={plusRef}
          className={`mx-auto mt-10 max-w-lg transition-all duration-700 ease-out
            ${plusVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="overflow-hidden rounded-2xl bg-[#1e3a5f]">
            <div className="px-6 pt-5 pb-2">
              <p className="font-display text-xl font-bold uppercase tracking-widest text-marigold">
                Plus
              </p>
              <p className="mt-0.5 font-body text-xs text-white/50 uppercase tracking-wide">
                Community life beyond the daily schedule
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 border-t border-white/10 mt-3">
              {plusItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 bg-[#1e3a5f] px-5 py-3.5
                    ${i === plusItems.length - 1 && plusItems.length % 2 !== 0 ? "col-span-2" : ""}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-body text-xs font-semibold text-white/80 uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default StudentLife;
