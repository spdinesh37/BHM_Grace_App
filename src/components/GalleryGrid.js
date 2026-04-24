import { useEffect, useRef, useState } from "react";

const INSTAGRAM_URL_PATTERN = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/([^/?#]+)/i;

function getInstagramEmbedUrl(permalink) {
  if (!permalink) return null;
  const match = permalink.match(INSTAGRAM_URL_PATTERN);
  if (!match) return null;
  const [, , type, postId] = match;
  return `https://www.instagram.com/${type}/${postId}/embed/`;
}

function StaticTile({ post, index, visible }) {
  const src = post.image?.startsWith("http")
    ? post.image
    : `${process.env.PUBLIC_URL}${post.image}`;
  const isVideo = post.mediaType === "VIDEO" && post.videoUrl;
  const date = post.timestamp
    ? new Date(post.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <a
      href={post.permalink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
      className={`group relative block aspect-square overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_18px_45px_-24px_rgba(15,81,50,0.32)] transition-all duration-700 ease-out
        hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(15,81,50,0.4)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {isVideo ? (
        <video
          src={post.videoUrl}
          poster={src}
          autoPlay={visible}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      ) : (
        <img
          src={src}
          alt={post.caption?.slice(0, 80) || "Gallery image"}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
    </a>
  );
}

function InstagramEmbedTile({ embedUrl, index, visible }) {
  return (
    <div
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
      className={`overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_18px_45px_-24px_rgba(15,81,50,0.32)] transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {visible && (
        <iframe
          title="Instagram post"
          src={embedUrl}
          loading="lazy"
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          allowtransparency="true"
          className="h-[520px] w-full sm:h-[560px]"
        />
      )}
    </div>
  );
}

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

  // Render our own styled tile when we have the media URL.
  // Fall back to an Instagram iframe only for permalink-only posts (manual curation mode).
  const embedUrl = !post.image ? getInstagramEmbedUrl(post.permalink) : null;

  return (
    <div ref={ref}>
      {embedUrl ? (
        <InstagramEmbedTile embedUrl={embedUrl} index={index} visible={visible} />
      ) : (
        <StaticTile post={post} index={index} visible={visible} />
      )}
    </div>
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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {posts.map((post, i) => (
        <PostTile key={post.id || post.permalink || i} post={post} index={i} />
      ))}
    </div>
  );
}

export default GalleryGrid;
