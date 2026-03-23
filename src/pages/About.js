import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import prabhupadaPortrait from "../assets/prabhupada-portrait.jpg";

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

function About() {
  const spotlightRef = useRef(null);
  const valuesRef = useRef(null);
  const frameRef = useRef(0);
  const [spotlight, setSpotlight] = useState(0);
  const [valuesDepth, setValuesDepth] = useState(0);
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

      if (valuesRef.current) {
        const rect = valuesRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
        const visibilityRatio = Math.min(1, visibleHeight / Math.min(rect.height, viewportHeight));
        const sectionCenter = rect.top + rect.height / 2;
        const focusPoint = viewportHeight * 0.58;
        const maxDistance = rect.height / 2 + viewportHeight * 0.32;
        const centeredFocus = 1 - Math.min(1, Math.abs(sectionCenter - focusPoint) / maxDistance);
        const nextValue = clamp(centeredFocus * 0.6 + visibilityRatio * 0.4, 0, 1);

        setValuesDepth((current) =>
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
      <section id="about-spotlight" ref={spotlightRef} className="relative pt-0 lg:min-h-[112vh]">
        <div className="absolute inset-0 -z-20 transition-all duration-500" style={{ background: stageBackground }} />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(243,180,81,0.14),transparent_62%)]" />

        <div className="section-shell relative lg:min-h-[112vh]">
          <div className="pt-8 sm:pt-10 lg:sticky lg:top-6 lg:py-4">
            <div
              className="relative overflow-hidden rounded-[2rem] border px-6 py-10 transition-all duration-500 sm:px-10 sm:py-14"
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

              <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div className="mx-auto w-full max-w-sm text-center lg:max-w-md">
                  <div
                    className="relative mx-auto w-full max-w-[19rem] transition-all duration-500 sm:max-w-[22rem]"
                    style={{ transform: `translateY(${(1 - spotlight) * 10}px) scale(${1 + spotlight * 0.05})` }}
                  >
                    <div
                      className="absolute inset-3 rounded-[999px] blur-2xl transition-all duration-500"
                      style={{ background: `linear-gradient(180deg, rgba(243,180,81,${(0.24 + spotlight * 0.24).toFixed(3)}), rgba(255,255,255,0), rgba(69,112,84,${(0.12 + spotlight * 0.16).toFixed(3)}))` }}
                    />
                    <div
                      className="relative overflow-hidden rounded-[999px] border-4 bg-white/70 p-2 transition-all duration-500"
                      style={{
                        borderColor: `rgba(255,255,255,${(0.78 + spotlight * 0.18).toFixed(3)})`,
                        boxShadow: `0 36px 90px -36px rgba(0,0,0,${(0.42 + spotlight * 0.34).toFixed(3)})`
                      }}
                    >
                      <img
                        src={prabhupadaPortrait}
                        alt="His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                        className="aspect-[4/5] w-full rounded-[999px] object-cover transition-all duration-500"
                        style={{ filter: `grayscale(1) brightness(${(0.92 + spotlight * 0.28).toFixed(3)}) contrast(${(1.02 + spotlight * 0.12).toFixed(3)})` }}
                      />
                    </div>
                  </div>
                  <p
                    className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] transition-colors duration-500"
                    style={{ color: captionColor }}
                  >
                    His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
                  </p>
                </div>

                <div
                  className="rounded-[1.75rem] border px-5 py-6 transition-all duration-500 sm:px-8 sm:py-8"
                  style={{
                    backgroundColor: `rgba(255,255,255,${(0.08 + spotlight * 0.1).toFixed(3)})`,
                    borderColor: `rgba(255,255,255,${(0.22 + spotlight * 0.32).toFixed(3)})`,
                    boxShadow: `0 24px 70px -40px rgba(0,0,0,${(0.16 + spotlight * 0.34).toFixed(3)})`
                  }}
                >
                  <h2
                    className="max-w-3xl text-4xl font-semibold transition-colors duration-500 sm:text-5xl"
                    style={{ color: titleColor }}
                  >
                    A spiritual vision rooted in Bhakti.
                  </h2>
                  <p
                    className="mt-5 max-w-3xl text-sm leading-8 transition-colors duration-500 sm:text-base"
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
                    className="mt-5 max-w-3xl text-sm leading-8 transition-colors duration-500 sm:text-base"
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

      <section className="pb-5">
        <div className="section-shell">
          <div className="ornate-stage">
            <div className="ornate-orbit ornate-orbit-one" aria-hidden="true" />
            <div className="ornate-orbit ornate-orbit-two" aria-hidden="true" />
            <div className="ornate-orbit ornate-orbit-three" aria-hidden="true" />

            <div className="relative z-10 grid gap-6 lg:gap-0">
              {missionVisionCards.map((item) => {
                const isActive = activeFeature === item.key;
                const alignmentClass = item.alignment === "end" ? "lg:ml-auto lg:-mt-8" : "lg:mr-auto";

                return (
                  <button
                    key={item.key}
                    type="button"
                    className={`ornate-card-shell ${alignmentClass}`}
                    onClick={() => setActiveFeature((current) => (current === item.key ? null : item.key))}
                    onMouseEnter={() => setActiveFeature(item.key)}
                    onMouseLeave={() => setActiveFeature((current) => (current === item.key ? null : current))}
                    onFocus={() => setActiveFeature(item.key)}
                    onBlur={() => setActiveFeature((current) => (current === item.key ? null : current))}
                    aria-pressed={isActive}
                    aria-label={`${item.title} card. Flip to see the statement.`}
                  >
                    <div className={`ornate-card-inner ${isActive ? "is-flipped" : ""}`}>
                      <div className="ornate-card-face ornate-card-front">
                        <div className="ornate-card-frame">
                          <p className="ornate-card-title">{item.title}</p>
                          <div className="ornate-card-divider" />
                        </div>
                      </div>
                      <div className="ornate-card-face ornate-card-back">
                        <div className="ornate-card-frame ornate-card-frame-back">
                          <p className="ornate-card-text ornate-card-text-back">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="soft-card">
                <p className="eyebrow">Serve | Connect | Grow</p>
                <h3 className="mt-4 text-3xl font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="pb-10">
        <div className="section-shell">
          <div className="values-stage">
            <div className="values-heading" style={{ opacity: 0.58 + valuesDepth * 0.42, transform: `translateY(${(1 - valuesDepth) * 18}px)` }}>
              <div className="values-heading-line" aria-hidden="true" />
              <h2 className="values-title">
                <span className="values-title-word">Core</span>
                <span className="values-title-word">Values</span>
              </h2>
              <div className="values-heading-ornament" aria-hidden="true">
                <span className="values-heading-stroke" />
                <span className="values-heading-dot" />
                <span className="values-heading-stroke" />
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value, index) => {
                const settle = clamp((valuesDepth - index * 0.09) / 0.82, 0, 1);
                const travel = (1 - settle) * (78 + index * 12);
                const rotateX = (1 - settle) * 18;
                const rotateY = (index % 2 === 0 ? -1 : 1) * (1 - settle) * 12;
                const rotateZ = value.tilt + (1 - settle) * (index % 2 === 0 ? -7 : 7);
                const scale = 0.88 + settle * 0.12;
                const opacity = 0.62 + settle * 0.38;

                return (
                  <article
                    key={value.title}
                    className="value-card-stack"
                    style={{
                      "--value-accent": value.accent,
                      "--value-glow": value.glow,
                      "--value-shadow": `0 ${34 + settle * 10}px ${70 - settle * 10}px -${34 - settle * 8}px rgba(90, 66, 41, ${0.18 + settle * 0.16})`,
                      transform: `perspective(2200px) translate3d(0, calc(${value.offset} + ${travel}px), 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                      opacity,
                      filter: `saturate(${0.9 + settle * 0.22}) brightness(${0.94 + settle * 0.1})`
                    }}
                  >
                    <div className="value-card-body">
                      <div className="value-card-aura" aria-hidden="true" />
                      <div className="value-card-rim" aria-hidden="true" />
                      <div className="value-card-head">
                        <span className="value-card-number">{String(index + 1).padStart(2, "0")}</span>
                        <div className="value-pill">{value.title}</div>
                      </div>
                      <div className="value-card-emblem" aria-hidden="true">
                        <span className="value-card-emblem-line" />
                        <span className="value-card-emblem-diamond" />
                        <span className="value-card-emblem-line" />
                      </div>
                      <p className="value-card-text">{value.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <div className="glass-panel flex flex-col gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Grace Ashram</p>
              <h2 className="mt-4 text-4xl font-semibold text-ink">Shared spiritual life is part of the formation.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-stone-700">
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


