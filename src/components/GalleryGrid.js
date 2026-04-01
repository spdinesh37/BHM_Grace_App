function GalleryGrid({ images }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image, i) => {
        const src = image.src.startsWith("http")
          ? image.src
          : `${process.env.PUBLIC_URL}${image.src}`;

        return (
          <figure
            key={image.src}
            className="reveal group overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 shadow-glow"
            ref={(el) => {
              if (!el) return;
              const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
                { threshold: 0.08 }
              );
              obs.observe(el);
            }}
            style={{ transitionDelay: `${(i % 3) * 100}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(24,16,10,0.82))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-display text-xl font-semibold text-white">{image.title}</h3>
              </div>
            </div>
            <figcaption className="space-y-1.5 px-5 py-4">
              <h3 className="font-display text-xl font-semibold text-ink">{image.title}</h3>
              <p className="font-body text-sm leading-6 text-stone-600">{image.description}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default GalleryGrid;
