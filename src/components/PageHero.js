function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="section-shell">
        <div className="glass-panel relative overflow-hidden px-5 py-12 sm:px-10 sm:py-16">
          <div className="absolute inset-0 -z-10 bg-halo opacity-80" />
          <div className="absolute -right-16 top-0 -z-10 h-40 w-40 rounded-full bg-marigold/25 blur-3xl" />
          <div className="absolute -left-10 bottom-0 -z-10 h-32 w-32 rounded-full bg-clay/20 blur-3xl" />
          {eyebrow ? <p className="eyebrow text-[10px] tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-ink sm:mt-4 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-3xl text-sm leading-7 text-stone-700 sm:mt-6 sm:text-base lg:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
