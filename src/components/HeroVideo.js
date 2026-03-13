import { useState } from "react";
import { Link } from "react-router-dom";

function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoSrc = `${process.env.PUBLIC_URL}/videos/grace-hero.mp4`;
  const posterSrc = `${process.env.PUBLIC_URL}/hero-fallback.svg`;

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#1e140d] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${posterSrc})` }}
      />
      <video
        className={`absolute inset-0 h-full w-full object-cover brightness-[0.55] saturate-[0.72] transition-opacity duration-700 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoReady(true)}
        onCanPlay={() => setIsVideoReady(true)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,11,7,0.52),rgba(17,11,7,0.8))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(17,11,7,0.82))]" />

      <div className="section-shell relative z-10 pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-marigold">Serve with heart. Learn with purpose.</p>
          <h1 className="mt-5 text-6xl font-semibold tracking-[0.14em] text-white sm:text-7xl">
            GRACE
          </h1>
          <p className="mt-5 max-w-2xl text-2xl leading-tight text-white/90 sm:text-3xl">
            Gauranga Residential Academy for Culture and Education
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.4em] text-white/80">
            Serve <span className="mx-2 text-marigold">&bull;</span> Connect
            <span className="mx-2 text-marigold">&bull;</span> Grow
          </p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            A residential learning community rooted in Bhakti Yoga, devotional
            culture, and compassionate leadership.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/about" className="primary-button">
              Discover the Vision
            </Link>
            <Link to="/contact" className="secondary-button">
              Inquire About GRACE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroVideo;
