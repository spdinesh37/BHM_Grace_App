import { useEffect, useRef, useState } from "react";
import ExpandCards from "../components/ExpandCards";

const fullTimeSchedule = [
  { time: "5:00 AM",  title: "Early Risers",               optional: true,  desc: "Tulasi Arati & Deity Greeting",                                     icon: "🌅" },
  { time: "5:15 AM",  title: "Morning Walk",               optional: true,  desc: "Neighborhood Japa Walk",                                             icon: "🚶" },
  { time: "6:00 AM",  title: "Morning Program",            optional: false, desc: "Guruvashtakam, Nrsimha Prayers, Announcements, Daily Inspiration",   icon: "🙏" },
  { time: "6:30 AM",  title: "Japa Meditation",            optional: false, desc: "Personal Mantra Meditation on Beads",                                icon: "📿" },
  { time: "7:30 AM",  title: "Honoring Srila Prabhupada",  optional: false, desc: "Guru Puja",                                                          icon: "🪔" },
  { time: "7:45 AM",  title: "Morning Class",              optional: false, desc: "Srimad Bhagavatam Curriculum in Discussion Format",                  icon: "📖" },
  { time: "8:30 AM",  title: "Breakfast Prasadam",         optional: false, desc: null,                                                                 icon: "🍽️" },
  { time: "9 – 2",    title: "Krishna Lunch / Care / Book", optional: false, desc: null,                                                                icon: "💼" },
  { time: "2:30 PM",  title: "Lunch Prasadam + Reading",   optional: false, desc: "Meet in temple room",                                                icon: "🥗" },
  { time: "6:00 PM",  title: "Evening Class",              optional: false, desc: "Bhakti Shastri Curriculum",                                          icon: "✏️" },
  { time: "7:00 PM",  title: "Evening Snack",              optional: false, desc: null,                                                                 icon: "🫖" },
];

const partTimeSchedule = [
  { time: "5:00 AM",  title: "Early Risers",               optional: true,  desc: "Tulasi Arati & Deity Greeting",                                     icon: "🌅" },
  { time: "5:15 AM",  title: "Morning Walk",               optional: true,  desc: "Neighborhood Japa Walk",                                             icon: "🚶" },
  { time: "6:00 AM",  title: "Morning Program",            optional: false, desc: "Guruvashtakam, Nrsimha Prayers, Announcements, Daily Inspiration",   icon: "🙏" },
  { time: "6:30 AM",  title: "Japa Meditation",            optional: false, desc: "Personal Mantra Meditation on Beads",                                icon: "📿" },
  { time: "7:30 AM",  title: "Honoring Srila Prabhupada",  optional: false, desc: "Guru Puja",                                                          icon: "🪔" },
  { time: "7:45 AM",  title: "Morning Class",              optional: false, desc: "Srimad Bhagavatam Curriculum in Discussion Format",                  icon: "📖" },
  { time: "8:30 AM",  title: "Breakfast Prasadam",         optional: false, desc: null,                                                                 icon: "🍽️" },
  { time: "9 – 5",    title: "Work / Study Outside",       optional: false, desc: null,                                                                 icon: "💼" },
  { time: "2:30 PM",  title: "Lunch Prasadam",             optional: false, desc: "Grab from KH/KL or when back",                                       icon: "🥗" },
  { time: "6:00 PM",  title: "Evening Class",              optional: false, desc: "Bhakti Shastri Curriculum",                                          icon: "✏️" },
  { time: "7:00 PM",  title: "Evening Snack",              optional: false, desc: null,                                                                 icon: "🫖" },
];

const plusItems = [
  { label: "Weekly Events",          icon: "📅" },
  { label: "Nature Retreats",        icon: "🌿" },
  { label: "Sunday Community Lunch", icon: "🍛" },
  { label: "Saturday Harinams",      icon: "🎶" },
  { label: "& More",                 icon: "✨" },
];

const fullTimeResidence = [
  "Chores + 25 hrs/week work",
  "Krishna Lunch / Books",
  "2-year renewable residence",
  "Bhakti shastri / vaibhava",
  "Rent waived",
  "Utilities + grocery",
];

const partTimeResidence = [
  "Chores only",
  "Work / study outside",
  "2-year lease agreement",
  "Bhakti shastri",
  "First week free trial",
  "$250 + utilities + grocery",
];

const rules = [
  {
    title: "Empathy",
    rule: "Refraining from eating meat, fish or eggs",
    text: "Honor life, not death—choose a vegetarian lifestyle that nourishes with minimal harm. Share the gift of bhakti you have received with others.",
  },
  {
    title: "Discipline",
    rule: "Refraining from intoxication",
    text: "Don't be lazy — that will only bring you down. Discipline is what moves you forward in life. Discipline is only possible with a sober and steady mind.",
  },
  {
    title: "Truthfulness",
    rule: "Refraining from gambling / lying",
    text: "Be honest with yourself and others. Spiritual progress requires knowing where you are, which is only possible through honesty in heart and mind.",
  },
  {
    title: "Purity",
    rule: "Refraining from illicit sex",
    text: "Be clean and guard the mind from lust, greed, anger, envy, illusion, and madness — the deepest impurity is seeing others as objects of pleasure.",
  },
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
  const delay = `${index * 60}ms`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`group relative flex items-start gap-3 transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="relative flex flex-col items-center" style={{ width: 32 }}>
        <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300
          ${item.optional
            ? "border-clay/40 bg-sandal text-sm group-hover:border-clay group-hover:scale-110"
            : "border-saffron bg-white text-sm group-hover:bg-saffron/10 group-hover:scale-110"
          }`}
        >
          <span>{item.icon}</span>
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-saffron/40 to-saffron/10 mt-1" style={{ minHeight: 24 }} />
      </div>

      <div className={`mb-3 flex-1 rounded-xl border px-3 py-2.5 shadow-sm transition-all duration-300
        group-hover:-translate-y-0.5 group-hover:shadow-md
        ${item.optional ? "border-yellow-100 bg-white/70" : "border-white/80 bg-white/90"}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-sm font-bold text-ink leading-snug">{item.title}</p>
          <div className="flex items-center gap-1.5">
            {item.optional && (
              <span className="rounded-full bg-sandal px-2 py-0.5 font-body text-[9px] font-semibold uppercase tracking-wide text-clay">
                Optional
              </span>
            )}
            <span className="font-body text-[11px] font-bold text-saffron tabular-nums">{item.time}</span>
          </div>
        </div>
        {item.desc && (
          <p className="mt-1 font-body text-[11px] text-stone-500 leading-relaxed">{item.desc}</p>
        )}
      </div>
    </div>
  );
}

function ScheduleColumn({ title, schedule }) {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <div className="flex-1">
      <div
        ref={headerRef}
        className={`mb-5 text-center transition-all duration-700 ease-out
          ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-saffron">
          {title}
        </p>
        <div className="mx-auto mt-2 h-px w-12 bg-gradient-to-r from-transparent via-saffron to-transparent" />
      </div>

      <div>
        {schedule.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
        <div className="flex items-center gap-3">
          <div style={{ width: 32 }} className="flex justify-center">
            <div className="h-3 w-3 rounded-full bg-saffron/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResidenceCard({ title, items, gradient, index }) {
  const [ref, visible] = useReveal(0.15);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms`, perspective: "1400px" }}
      className={`flex-1 transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-pressed={flipped}
        aria-label={`${title} — hover or tap to reveal`}
        className="group w-full cursor-pointer"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative w-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "320px",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/80 p-6 text-center sm:p-8"
            style={{
              backfaceVisibility: "hidden",
              background: gradient,
              boxShadow: "0 22px 60px -22px rgba(15,81,50,0.55)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.15), transparent 50%)",
              }}
            />
            <p className="relative z-10 font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
              Option
            </p>
            <h3
              className="relative z-10 mt-3 font-display text-4xl font-bold sm:text-5xl md:text-6xl"
              style={{
                color: "#f4d03f",
                textShadow: "0 2px 24px rgba(244,208,63,0.25), 0 1px 8px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </h3>
            <div className="relative z-10 mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r from-transparent via-marigold to-transparent" />
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-7"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, rgba(255,252,240,0.98), rgba(246,242,222,0.96))",
              borderColor: "rgba(244,208,63,0.45)",
              boxShadow: "0 32px 72px -32px rgba(15,60,40,0.35)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-green via-brand-green-light to-brand-yellow" />
            <p className="text-center font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-green">
              {title}
            </p>
            <h4 className="mt-1 text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
              What's Included
            </h4>
            <div className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-saffron to-marigold/40" />
            <ul className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-sm leading-relaxed text-stone-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </div>
  );
}

function StudentLife() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [plusRef, plusVisible] = useReveal(0.15);
  const [resHeaderRef, resHeaderVisible] = useReveal(0.2);
  const [rulesHeaderRef, rulesHeaderVisible] = useReveal(0.2);

  return (
    <>
      {/* ── Schedules ── */}
      <section className="pt-10 pb-12">
        <div className="section-shell">
          <div
            ref={headerRef}
            className={`mb-8 text-center transition-all duration-700 ease-out
              ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="eyebrow">Student Life</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl md:text-4xl lg:text-5xl">
              A Day in the Life
            </h2>
            <p className="mt-2 font-body text-sm text-stone-500">
              of a KHSA Student
            </p>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-saffron to-transparent" />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            <ScheduleColumn title="Full-Time KHSA Student" schedule={fullTimeSchedule} />
            <ScheduleColumn title="Part-Time KHSA Student" schedule={partTimeSchedule} />
          </div>

          {/* ── Plus section ── */}
          <div
            ref={plusRef}
            className={`mx-auto mt-12 transition-all duration-700 ease-out
              ${plusVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div
              className="relative overflow-hidden rounded-2xl px-6 py-7 sm:px-8 sm:py-8"
              style={{
                background: "linear-gradient(145deg, #1b7042, #0f5132, #092e1e)",
                boxShadow: "0 22px 60px -22px rgba(15,81,50,0.55)",
              }}
            >
              {/* Decorative pattern */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.10), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.18), transparent 50%)",
                }}
              />

              <div className="relative flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:gap-8">
                {/* Heading block */}
                <div className="text-center lg:shrink-0 lg:border-r lg:border-marigold/30 lg:pr-8 lg:text-left">
                  <p
                    className="font-display text-3xl font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: "#f4d03f",
                      textShadow: "0 2px 24px rgba(244,208,63,0.25), 0 1px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    Plus
                  </p>
                  <p className="mt-1 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                    Beyond the daily schedule
                  </p>
                </div>

                {/* Pills */}
                <div className="flex flex-1 flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                  {plusItems.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm transition-all hover:border-marigold/60 hover:bg-white/20"
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="font-body text-xs font-semibold uppercase tracking-wide text-white/90">
                        {item.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Residence Options ── */}
      <section className="pb-12 sm:pb-16">
        <div className="section-shell">
          <div
            ref={resHeaderRef}
            className={`mb-8 text-center transition-all duration-700 ease-out
              ${resHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="eyebrow">Residence Options</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
              Choose Your Path
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-saffron to-transparent" />
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:gap-6">
            <ResidenceCard
              title="Full-Time"
              items={fullTimeResidence}
              gradient="linear-gradient(145deg, #1b7042, #0f5132, #092e1e)"
              index={0}
            />
            <ResidenceCard
              title="Part-Time"
              items={partTimeResidence}
              gradient="linear-gradient(145deg, #2d5a3a, #1b7042, #0f5132)"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* ── Rules ── */}
      <section className="pb-16">
        <div className="section-shell">
          <div
            ref={rulesHeaderRef}
            className={`mb-8 text-center transition-all duration-700 ease-out
              ${rulesHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="eyebrow">Foundations of Practice</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-ink sm:text-4xl md:text-5xl">
              RULES
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-saffron to-transparent" />
          </div>

          <ExpandCards
            items={rules.map((rule, i) => ({
              title: rule.title,
              eyebrow: rule.rule,
              text: rule.text,
              gradient: [
                "linear-gradient(145deg, #1b7042, #0f5132, #092e1e)",
                "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
                "linear-gradient(145deg, #2d5a3a, #1b7042, #0f5132)",
                "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
              ][i % 4],
            }))}
          />
        </div>
      </section>
    </>
  );
}

export default StudentLife;
