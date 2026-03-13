function GalleryGrid({ images }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => {
        const src = image.src.startsWith("http")
          ? image.src
          : `${process.env.PUBLIC_URL}${image.src}`;

        return (
          <figure
            key={image.src}
            className="group overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 shadow-glow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(24,16,10,0.72))]" />
            </div>
            <figcaption className="space-y-2 px-5 py-5">
              <h3 className="text-2xl font-semibold text-ink">{image.title}</h3>
              <p className="text-sm leading-7 text-stone-700">{image.description}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default GalleryGrid;

