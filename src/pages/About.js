import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import prabhupadaPortrait from "../assets/prabhupada-portrait.jpg";
import { useReveal } from "../components/useReveal";

const values = [
  {
    title: "Equal Vision",
    text: "We honor the inherent dignity and potential of every individual, embracing diversity as an opportunity.",
    accent: "rgba(122, 156, 224, 0.22)",
    glow: "rgba(122, 156, 224, 0.28)",
    offset: "-16px",
    tilt: -1.2
  },
  {
    title: "Respect",
    text: "We foster a culture of care and understanding, valuing all beings and their individual choices.",
    accent: "rgba(245, 220, 160, 0.24)",
    glow: "rgba(245, 220, 160, 0.3)",
    offset: "12px",
    tilt: 0.9
  },
  {
    title: "Compassion",
    text: "We practice and promote compassion in thought, word, and action towards all living beings.",
    accent: "rgba(168, 201, 177, 0.22)",
    glow: "rgba(168, 201, 177, 0.28)",
    offset: "-6px",
    tilt: -0.7
  },
  {
    title: "Servant-Leadership",
    text: "We lead through service that reflects integrity, humility, and dedication, inspiring others to embrace self-transformation.",
    accent: "rgba(220, 180, 148, 0.22)",
    glow: "rgba(220, 180, 148, 0.28)",
    offset: "16px",
    tilt: 1.1
  }
];

const pillars = [
  {
    title: "Serve",
    text: "Service creates a culture of contribution, humility, and practical care for the whole community."
  },
  {
    title: "Connect",
    text: "Connection grows through sincere association, shared practice, and relationships rooted in respect."
  },
  {
    title: "Grow",
    text: "Growth comes through Bhakti, reflection, learning, and the steady transformation of character."
  }
];

const missionVisionCards = [
  {
    key: "vision",
    title: "Vision",
    text: "To create a vibrant sanctuary for self-leadership, cultural education, and spiritual growth rooted in Bhakti Yoga.",
    alignment: "start"
  },
  {
    key: "mission",
    title: "Mission",
    text: "To empower, transform, and enlighten individuals through principles, values, and practices of Bhakti.",
    alignment: "end"
  }
];

const mix = (start, end, amount) => Math.round(start + (end - start) * amount);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function FlipCard({ item, index, isActive, onActivate, onDeactivate }) {
  const [ref, visible] = useReveal(0.1);
  const isVision = item.key === "vision";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        perspective: "1400px",
      }}
    >
      <button
        type="button"
        onClick={() => onActivate(item.key)}
        onMouseEnter={() => onActivate(item.key)}
        onMouseLeave={onDeactivate}
        onFocus={() => onActivate(item.key)}
        onBlur={onDeactivate}
        aria-pressed={isActive}
        aria-label={`${item.title} — hover or tap to reveal`}
        className="group w-full cursor-pointer"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative w-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isActive ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "260px",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/80 p-5 text-center sm:rounded-3xl sm:p-8"
            style={{
              backfaceVisibility: "hidden",
              background: isVision
                ? "linear-gradient(135deg, rgba(30,58,95,0.97), rgba(20,40,70,0.97))"
                : "linear-gradient(135deg, rgba(199,123,71,0.97), rgba(160,90,40,0.97))",
              boxShadow: "0 32px 72px -32px rgba(0,0,0,0.42)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background: isVision
                  ? "radial-gradient(circle at top left, rgba(243,180,81,0.4), transparent 55%)"
                  : "radial-gradient(circle at bottom right, rgba(255,255,255,0.25), transparent 55%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <p className="relative z-10 font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">Our</p>
            <h3 className="relative z-10 mt-2 font-display text-3xl font-semibold text-white sm:text-5xl md:text-6xl">
              {item.title}
            </h3>
            <div className="relative z-10 mt-4 flex items-center gap-3">
              <div className="h-px w-8 rounded-full bg-white/30" />
              <p className="font-body text-xs font-medium text-white/50">tap to reveal</p>
              <div className="h-px w-8 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border p-5 text-center sm:rounded-3xl sm:p-8"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, rgba(255,252,244,0.98), rgba(247,239,225,0.96))",
              borderColor: "rgba(243,180,81,0.35)",
              boxShadow: "0 32px 72px -32px rgba(90,60,20,0.35)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-saffron via-marigold to-clay/50" />
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-clay">{item.title}</p>
            <p className="mt-3 max-w-md font-display text-base font-medium leading-relaxed text-ink sm:mt-4 sm:text-xl md:text-2xl">
              {item.text}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

function VisionMissionSection({ cards, activeFeature, setActiveFeature }) {
  const [headerRef, headerVisible] = useReveal(0.1);

  return (
    <section className="py-8 sm:py-10 md:py-14">
      <div className="section-shell">
        <div
          ref={headerRef}
          className={`mb-6 text-center transition-all duration-700 ease-out sm:mb-8 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-saffron/60" />
            <p className="eyebrow">Who We Are</p>
            <div className="h-px w-8 bg-saffron/60" />
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
            Vision & Mission
          </h2>
          <p className="mt-2 font-body text-sm text-stone-500">Tap each card to reveal our statement</p>
          <div className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-saffron to-marigold/40" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
          {cards.map((item, i) => (
            <FlipCard
              key={item.key}
              item={item}
              index={i}
              isActive={activeFeature === item.key}
              onActivate={(key) => setActiveFeature(key)}
              onDeactivate={() => setActiveFeature((cur) => (cur === item.key ? null : cur))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const valueColors = [
  { border: "border-blue-200/60", accent: "from-blue-50 to-sky-50", icon: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  { border: "border-amber-200/60", accent: "from-amber-50 to-orange-50", icon: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  { border: "border-emerald-200/60", accent: "from-emerald-50 to-teal-50", icon: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  { border: "border-orange-200/60", accent: "from-orange-50 to-amber-50", icon: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
];

function ValueCard({ value, index }) {
  const [ref, visible] = useReveal(0.1);
  const color = valueColors[index % valueColors.length];

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border bg-white/90 p-5 shadow-[0_12px_40px_-16px_rgba(90,66,41,0.18)] transition-all duration-700 ease-out
        hover:-translate-y-1.5 hover:shadow-[0_24px_56px_-20px_rgba(90,66,41,0.26)]
        sm:rounded-2xl sm:p-6 md:p-7
        ${color.border}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron via-marigold to-clay/50" />

      {/* Hover gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-0`} />

      <div className="relative z-10">
        {/* Number + Title */}
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-body text-sm font-bold shadow-sm ${color.icon}`}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {value.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-200/80 to-transparent" />
          <div className={`h-1.5 w-1.5 rounded-full ${color.dot}`} />
          <div className="h-px flex-1 bg-gradient-to-l from-amber-200/80 to-transparent" />
        </div>

        {/* Description */}
        <p className="font-body text-sm leading-7 text-stone-600">
          {value.text}
        </p>
      </div>
    </article>
  );
}

function About() {
  const spotlightRef = useRef(null);
  const frameRef = useRef(0);
  const [spotlight, setSpotlight] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const updateEffects = () => {
      frameRef.current = 0;

      if (spotlightRef.current) {
        const rect = spotlightRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const viewportCenter = viewportHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const maxDistance = rect.height / 2 + viewportHeight * 0.3;
        const centeredFocus = 1 - Math.min(1, Math.abs(sectionCenter - viewportCenter) / maxDistance);
        const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
        const visibilityRatio = Math.min(1, visibleHeight / Math.min(rect.height, viewportHeight));
        const nextValue = Math.max(0, Math.min(1, centeredFocus * 0.78 + visibilityRatio * 0.22));

        setSpotlight((current) =>
          Math.abs(current - nextValue) > 0.01 ? nextValue : current
        );
      }
    };

    const handleScroll = () => {
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updateEffects);
      }
    };

    updateEffects();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const stageBackground = `linear-gradient(180deg, rgba(4, 3, 2, ${(0.22 + spotlight * 0.7).toFixed(3)}), rgba(4, 3, 2, ${(0.32 + spotlight * 0.64).toFixed(3)}))`;
  const shellBackground = `linear-gradient(135deg, rgba(${mix(255, 18, spotlight)}, ${mix(250, 14, spotlight)}, ${mix(242, 12, spotlight)}, ${(0.96 - spotlight * 0.05).toFixed(3)}), rgba(${mix(250, 28, spotlight)}, ${mix(239, 20, spotlight)}, ${mix(220, 16, spotlight)}, ${(0.92 - spotlight * 0.05).toFixed(3)}))`;
  const titleColor = `rgb(${mix(36, 252, spotlight)}, ${mix(24, 245, spotlight)}, ${mix(15, 231, spotlight)})`;
  const bodyColor = `rgba(${mix(87, 244, spotlight)}, ${mix(83, 236, spotlight)}, ${mix(78, 225, spotlight)}, ${(0.94 + spotlight * 0.04).toFixed(3)})`;
  const captionColor = `rgba(${mix(107, 248, spotlight)}, ${mix(79, 204, spotlight)}, ${mix(59, 137, spotlight)}, ${(0.92 + spotlight * 0.06).toFixed(3)})`;

  return (
    <>
      <section id="about-spotlight" ref={spotlightRef} className="relative pt-0 md:min-h-[100vh] lg:min-h-[112vh]">
        <div className="absolute inset-0 -z-20 transition-all duration-500" style={{ background: stageBackground }} />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(243,180,81,0.14),transparent_62%)]" />

        <div className="section-shell relative md:min-h-[100vh] lg:min-h-[112vh]">
          <div className="pt-6 sm:pt-8 md:pt-10 lg:sticky lg:top-6 lg:py-4">
            <div
              className="relative overflow-hidden rounded-xl border px-4 py-8 transition-all duration-500 sm:rounded-[1.5rem] sm:px-6 sm:py-10 md:rounded-[2rem] md:px-10 md:py-14"
              style={{
                background: shellBackground,
                borderColor: `rgba(255,255,255,${(0.64 + spotlight * 0.2).toFixed(3)})`,
                boxShadow: `0 30px 100px -45px rgba(0,0,0,${(0.34 + spotlight * 0.44).toFixed(3)})`
              }}
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,180,81,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,90,60,0.16),transparent_30%)]" />
              <div
                className="absolute -left-10 top-10 -z-10 h-40 w-40 rounded-full blur-3xl transition-all duration-500"
                style={{ backgroundColor: `rgba(243, 180, 81, ${(0.16 + spotlight * 0.18).toFixed(3)})` }}
              />
              <div
                className="absolute -right-8 bottom-8 -z-10 h-44 w-44 rounded-full blur-3xl transition-all duration-500"
                style={{ backgroundColor: `rgba(15, 90, 60, ${(0.16 + spotlight * 0.22).toFixed(3)})` }}
              />

              <div className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div className="mx-auto w-full max-w-xs text-center sm:max-w-sm lg:max-w-lg">
                  <div
                    className="relative mx-auto w-full max-w-[16rem] transition-all duration-500 sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[26rem]"
                    style={{ transform: `translateY(${(1 - spotlight) * 10}px) scale(${1 + spotlight * 0.05})` }}
                  >
                    {/* Outer golden ring glow */}
                    <div
                      className="absolute inset-0 rounded-[999px] transition-all duration-500"
                      style={{
                        boxShadow: `0 0 0 6px rgba(243,180,81,${(0.18 + spotlight * 0.32).toFixed(3)}), 0 0 0 14px rgba(243,180,81,${(0.06 + spotlight * 0.12).toFixed(3)})`,
                      }}
                    />
                    {/* Warm glow beneath */}
                    <div
                      className="absolute inset-2 rounded-[999px] blur-3xl transition-all duration-500"
                      style={{ background: `radial-gradient(circle, rgba(243,180,81,${(0.32 + spotlight * 0.36).toFixed(3)}), rgba(69,112,84,${(0.10 + spotlight * 0.18).toFixed(3)}) 70%, transparent)` }}
                    />
                    {/* Portrait frame */}
                    <div
                      className="relative overflow-hidden rounded-[999px] border-[5px] bg-white/80 p-1.5 transition-all duration-500"
                      style={{
                        borderColor: `rgba(243,180,81,${(0.55 + spotlight * 0.40).toFixed(3)})`,
                        boxShadow: `0 40px 100px -40px rgba(0,0,0,${(0.50 + spotlight * 0.36).toFixed(3)}), inset 0 0 0 2px rgba(255,255,255,${(0.5 + spotlight * 0.4).toFixed(3)})`
                      }}
                    >
                      <img
                        src={prabhupadaPortrait}
                        alt="His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                        className="aspect-[4/5] w-full rounded-[999px] object-cover transition-all duration-500"
                        style={{
                          filter: `grayscale(${(0.6 - spotlight * 0.6).toFixed(2)}) brightness(${(0.94 + spotlight * 0.16).toFixed(3)}) contrast(${(1.04 + spotlight * 0.08).toFixed(3)}) saturate(${(0.8 + spotlight * 0.5).toFixed(3)})`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Name badge */}
                  <div
                    className="mx-auto mt-6 max-w-xs rounded-2xl border px-5 py-3 transition-all duration-500"
                    style={{
                      background: `rgba(255,255,255,${(0.08 + spotlight * 0.12).toFixed(3)})`,
                      borderColor: `rgba(243,180,81,${(0.28 + spotlight * 0.34).toFixed(3)})`,
                    }}
                  >
                    <p
                      className="font-display text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-500"
                      style={{ color: captionColor }}
                    >
                      His Divine Grace
                    </p>
                    <p
                      className="mt-1 font-display text-sm font-semibold transition-colors duration-500 sm:text-base"
                      style={{ color: captionColor }}
                    >
                      A.C. Bhaktivedanta Swami Prabhupada
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-xl border px-4 py-5 transition-all duration-500 sm:rounded-[1.5rem] sm:px-6 sm:py-6 md:rounded-[1.75rem] md:px-8 md:py-8"
                  style={{
                    backgroundColor: `rgba(255,255,255,${(0.08 + spotlight * 0.1).toFixed(3)})`,
                    borderColor: `rgba(255,255,255,${(0.22 + spotlight * 0.32).toFixed(3)})`,
                    boxShadow: `0 24px 70px -40px rgba(0,0,0,${(0.16 + spotlight * 0.34).toFixed(3)})`
                  }}
                >
                  <h2
                    className="max-w-3xl text-2xl font-semibold transition-colors duration-500 sm:text-3xl md:text-4xl lg:text-5xl"
                    style={{ color: titleColor }}
                  >
                    A spiritual vision rooted in Bhakti.
                  </h2>
                  <p
                    className="mt-3 max-w-3xl text-xs leading-6 transition-colors duration-500 sm:mt-5 sm:text-sm sm:leading-8 md:text-base"
                    style={{ color: bodyColor }}
                  >
                    His Divine Grace A.C. Bhaktivedanta Swami Prabhupada arrived in
                    America at the age of 70 with a vision to unite the world based
                    on spiritual principles. Despite so many attempts in the modern
                    era to create an equitable society, he challenged that this
                    could never be done with the conception of the self as the body
                    i.e. Black, White, American, Chinese, Man, Woman etc.
                  </p>
                  <p
                    className="mt-3 max-w-3xl text-xs leading-6 transition-colors duration-500 sm:mt-5 sm:text-sm sm:leading-8 md:text-base"
                    style={{ color: bodyColor }}
                  >
                    Alabama Bhakti Community is an attempt to serve his empowered
                    vision and a microcosm of what the world could be like, if that
                    vision came true.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VisionMissionSection
        cards={missionVisionCards}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />

      <section className="py-6 sm:py-8 md:py-10">
        <div className="section-shell">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="soft-card">
                <p className="eyebrow">Serve | Connect | Grow</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink sm:mt-4 sm:text-3xl">{pillar.title}</h3>
                <p className="mt-3 text-xs leading-6 text-stone-700 sm:mt-4 sm:text-sm sm:leading-7">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16">
        <div className="section-shell">
          {/* Header */}
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-saffron/60" />
              <p className="eyebrow">What Guides Us</p>
              <div className="h-px w-8 bg-saffron/60" />
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              Core Values
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-saffron to-marigold/40" />
          </div>

          {/* Value cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 xl:grid-cols-4">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16">
        <div className="section-shell">
          <div className="glass-panel flex flex-col gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 md:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Grace Ashram</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:mt-4 sm:text-3xl md:text-4xl">Shared spiritual life is part of the formation.</h2>
              <p className="mt-3 max-w-2xl text-xs leading-6 text-stone-700 sm:mt-4 sm:text-sm sm:leading-8">
                The ashram setting supports consistency, healthy rhythm, peer
                encouragement, and the daily practice of seva, study, and mutual care.
              </p>
            </div>
            <Link to="/grace-ashram" className="primary-button">
              Explore Grace Ashram
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;


