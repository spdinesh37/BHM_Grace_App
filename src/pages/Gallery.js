import { useEffect, useState } from "react";
import GalleryGrid from "../components/GalleryGrid";
import PageHero from "../components/PageHero";
import galleryData from "../data/gallery.json";

const INSTAGRAM_HANDLE = "alabamabhakti";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

function Gallery() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        // TODO: Replace with live Instagram feed once API is set up.
        // Endpoint will return the same shape: [{ id, image, caption, permalink, timestamp }]
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (!cancelled) {
          setPosts(galleryData);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Moments from our community"
        description="Glimpses of devotion, study, service, and celebration — straight from the Alabama Bhakti Community."
      />

      <section className="py-10 sm:py-14 md:py-16">
        <div className="section-shell">
          {/* Instagram link bar */}
          <div className="mb-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-yellow-100 bg-white/80 px-5 py-4 shadow-[0_14px_40px_-22px_rgba(15,81,50,0.28)] sm:flex-row sm:gap-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-saffron">
                  Follow us on Instagram
                </p>
                <p className="font-display text-lg font-semibold text-ink">
                  @{INSTAGRAM_HANDLE}
                </p>
              </div>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button !min-w-0 px-5"
            >
              View Profile
            </a>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-2xl bg-stone-200/70"
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50/80 p-8 text-center">
              <p className="font-body text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Posts */}
          {!loading && !error && <GalleryGrid posts={posts} />}
        </div>
      </section>
    </>
  );
}

export default Gallery;
