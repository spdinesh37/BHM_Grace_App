import { useEffect, useRef, useState } from "react";

function PostTile({ post, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const src = post.image.startsWith("http")
    ? post.image
    : `${process.env.PUBLIC_URL}${post.image}`;

  const date = post.timestamp
    ? new Date(post.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <a
      ref={ref}
      href={post.permalink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
      className={`group relative block aspect-square overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_18px_45px_-24px_rgba(15,81,50,0.32)] transition-all duration-700 ease-out
        hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(15,81,50,0.4)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <img
        src={src}
        alt={post.caption?.slice(0, 80) || "Gallery image"}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hover content */}
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
        <p className="line-clamp-3 font-body text-xs leading-5 text-white/95 sm:text-sm sm:leading-6">
          {post.caption}
        </p>
        {date && (
          <p className="mt-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-marigold">
            {date}
          </p>
        )}
      </div>

      {/* Instagram corner badge */}
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </div>
    </a>
  );
}

function GalleryGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-100 bg-white/70 p-10 text-center">
        <p className="font-body text-sm text-stone-600">
          No posts yet. Check back soon for updates from our community.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {posts.map((post, i) => (
        <PostTile key={post.id || i} post={post} index={i} />
      ))}
    </div>
  );
}

export default GalleryGrid;
