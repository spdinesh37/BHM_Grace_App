import { useState } from "react";
import { Link } from "react-router-dom";

function HeroVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoSrc = `${process.env.PUBLIC_URL}/videos/grace-hero.mp4`;
  const posterSrc = `${process.env.PUBLIC_URL}/hero-fallback.svg`;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#1e140d] text-white">
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

      <div className="section-shell relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[0.1em] text-white sm:text-6xl sm:tracking-[0.14em] lg:text-7xl">
            ABC
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-tight text-white/90 sm:mt-5 sm:text-2xl lg:text-3xl">
            Alabama Bhakti Community
          </p>
          <p className="mt-5 max-w-md text-[11px] font-semibold uppercase leading-6 tracking-[0.24em] text-white/80 sm:mt-6 sm:max-w-none sm:text-sm sm:tracking-[0.4em]">
            Serve <span className="mx-1.5 text-marigold sm:mx-2">&bull;</span> Connect
            <span className="mx-1.5 text-marigold sm:mx-2">&bull;</span> Grow
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
            A devotional learning community rooted in Bhakti Yoga, devotional
            culture, and shared spiritual practice.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link to="/about" className="primary-button w-full sm:w-auto">
              Discover Vision and Mission
            </Link>
            <Link to="/contact" className="secondary-button w-full sm:w-auto">
              Contact ABC
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroVideo;
