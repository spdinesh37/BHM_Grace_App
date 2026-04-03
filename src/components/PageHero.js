import { useEffect, useRef } from "react";

function PageHero({ eyebrow, title, description }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("visible"));
  }, []);

  return (
    <section className="relative isolate overflow-hidden pt-20 sm:pt-28 md:pt-32">
      <div className="section-shell">
        <div
          ref={ref}
          className="reveal glass-panel relative overflow-hidden px-4 py-10 sm:px-8 sm:py-14 md:px-12 md:py-20"
        >
          {/* Decorative blobs */}
          <div className="absolute -right-16 -top-10 -z-10 h-56 w-56 rounded-full bg-marigold/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 -z-10 h-44 w-44 rounded-full bg-clay/15 blur-3xl" />
          <div className="absolute inset-0 -z-10 bg-halo opacity-70" />

          {/* Shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/60 to-transparent" />

          {eyebrow && (
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-saffron/60" />
              <p className="eyebrow">{eyebrow}</p>
            </div>
          )}

          <h1 className="mt-3 max-w-4xl font-display text-2xl font-semibold text-ink leading-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-3xl font-body text-xs leading-6 text-stone-600 sm:mt-5 sm:text-sm sm:leading-8 lg:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
