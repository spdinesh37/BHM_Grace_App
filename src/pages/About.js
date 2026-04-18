import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import prabhupadaPortrait from "../assets/prabhupada-portrait.jpg";
import { useReveal } from "../components/useReveal";
import ExpandCards from "../components/ExpandCards";

const values = [
  {
    title: "Equal Vision",
    text: "We honor the inherent dignity and potential of every individual, embracing diversity as an opportunity.",
    gradient: "linear-gradient(145deg, #1b7042, #0f5132, #092e1e)",
  },
  {
    title: "Respect",
    text: "We foster a culture of care and understanding, valuing all beings and their individual choices.",
    gradient: "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
  },
  {
    title: "Compassion",
    text: "We practice and promote compassion in thought, word, and action towards all living beings.",
    gradient: "linear-gradient(145deg, #2d5a3a, #1b7042, #0f5132)",
  },
  {
    title: "Servant-Leadership",
    text: "We lead through service that reflects integrity, humility, and dedication, inspiring others to embrace self-transformation.",
    gradient: "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
  },
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
        aria-label={`${item.title} — hover `}
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
                ? "linear-gradient(135deg, rgba(15,81,50,0.97), rgba(8,50,30,0.97))"
                : "linear-gradient(135deg, rgba(27,112,66,0.97), rgba(15,70,42,0.97))",
              boxShadow: "0 32px 72px -32px rgba(0,0,0,0.42)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background: isVision
                  ? "radial-gradient(circle at top left, rgba(244,208,63,0.45), transparent 55%)"
                  : "radial-gradient(circle at bottom right, rgba(244,208,63,0.35), transparent 55%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <p className="relative z-10 font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">Our</p>
            <h3 className="relative z-10 mt-2 font-display text-3xl font-semibold text-white sm:text-5xl md:text-6xl">
              {item.title}
            </h3>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border p-5 text-center sm:rounded-3xl sm:p-8"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, rgba(255,252,240,0.98), rgba(246,242,222,0.96))",
              borderColor: "rgba(244,208,63,0.45)",
              boxShadow: "0 32px 72px -32px rgba(15,60,40,0.35)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-brand-green via-brand-green-light to-brand-yellow" />
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-green">{item.title}</p>
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
          <p className="mt-2 font-body text-sm text-stone-500"></p>
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

  const stageBackground = `linear-gradient(180deg, rgba(8, 40, 24, ${(0.22 + spotlight * 0.7).toFixed(3)}), rgba(6, 30, 18, ${(0.32 + spotlight * 0.64).toFixed(3)}))`;
  const shellBackground = `linear-gradient(135deg, rgba(${mix(255, 12, spotlight)}, ${mix(250, 45, spotlight)}, ${mix(242, 28, spotlight)}, ${(0.96 - spotlight * 0.05).toFixed(3)}), rgba(${mix(250, 8, spotlight)}, ${mix(239, 35, spotlight)}, ${mix(220, 22, spotlight)}, ${(0.92 - spotlight * 0.05).toFixed(3)}))`;
  const titleColor = `rgb(${mix(36, 252, spotlight)}, ${mix(24, 245, spotlight)}, ${mix(15, 231, spotlight)})`;
  const bodyColor = `rgba(${mix(87, 244, spotlight)}, ${mix(83, 236, spotlight)}, ${mix(78, 225, spotlight)}, ${(0.94 + spotlight * 0.04).toFixed(3)})`;

  return (
    <>
      <section id="about-spotlight" ref={spotlightRef} className="relative pt-0 md:min-h-[100vh] lg:min-h-[112vh]">
        <div className="absolute inset-0 -z-20 transition-all duration-500" style={{ background: stageBackground }} />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(244,208,63,0.18),transparent_62%)]" />

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
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,208,63,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(27,112,66,0.22),transparent_30%)]" />
              <div
                className="absolute -left-10 top-10 -z-10 h-40 w-40 rounded-full blur-3xl transition-all duration-500"
                style={{ backgroundColor: `rgba(244, 208, 63, ${(0.2 + spotlight * 0.2).toFixed(3)})` }}
              />
              <div
                className="absolute -right-8 bottom-8 -z-10 h-44 w-44 rounded-full blur-3xl transition-all duration-500"
                style={{ backgroundColor: `rgba(27, 112, 66, ${(0.2 + spotlight * 0.25).toFixed(3)})` }}
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
                        boxShadow: `0 0 0 6px rgba(244,208,63,${(0.22 + spotlight * 0.35).toFixed(3)}), 0 0 0 14px rgba(244,208,63,${(0.08 + spotlight * 0.14).toFixed(3)})`,
                      }}
                    />
                    {/* Warm glow beneath */}
                    <div
                      className="absolute inset-2 rounded-[999px] blur-3xl transition-all duration-500"
                      style={{ background: `radial-gradient(circle, rgba(244,208,63,${(0.36 + spotlight * 0.36).toFixed(3)}), rgba(27,112,66,${(0.14 + spotlight * 0.2).toFixed(3)}) 70%, transparent)` }}
                    />
                    {/* Portrait frame */}
                    <div
                      className="relative overflow-hidden rounded-[999px] border-[5px] bg-white/80 p-1.5 transition-all duration-500"
                      style={{
                        borderColor: `rgba(244,208,63,${(0.6 + spotlight * 0.4).toFixed(3)})`,
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
                    className="mx-auto mt-16 max-w-xs rounded-2xl border px-5 py-3 transition-all duration-500"
                    style={{
                      background: `rgba(15,81,50,${(0.85 + spotlight * 0.1).toFixed(3)})`,
                      borderColor: `rgba(244,208,63,${(0.5 + spotlight * 0.4).toFixed(3)})`,
                    }}
                  >
                    <p
                      className="font-display text-xs font-semibold uppercase tracking-[0.28em]"
                      style={{ color: "#f4d03f" }}
                    >
                      His Divine Grace
                    </p>
                    <p
                      className="mt-1 font-display text-sm font-semibold sm:text-base"
                      style={{ color: "#fff" }}
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

          <ExpandCards items={values} />
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


