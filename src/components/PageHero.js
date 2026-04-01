import { useEffect, useRef } from "react";

function PageHero({ eyebrow, title, description }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("visible"));
  }, []);

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="section-shell">
        <div
          ref={ref}
          className="reveal glass-panel relative overflow-hidden px-5 py-14 sm:px-12 sm:py-20"
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

          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl leading-tight">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-3xl font-body text-sm leading-8 text-stone-600 sm:text-base lg:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
