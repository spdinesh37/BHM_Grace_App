import EventCard from "../components/EventCard";
import SectionHeader from "../components/SectionHeader";
import Typewriter from "../components/Typewriter";
import { useReveal } from "../components/useReveal";
import eventsData from "../data/events.json";

const heroImage = `${process.env.PUBLIC_URL}/gallery/event-moment-1.jpg`;
const featureImage = `${process.env.PUBLIC_URL}/gallery/event-moment-2.jpg`;

function EventsHero() {
  return (
    <section className="relative overflow-hidden bg-[#1e140d] text-white">
      {/* Ambient glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(230,164,64,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(15,81,50,0.35),transparent_55%)]" />

      <div className="section-shell relative z-10 grid gap-8 px-4 py-16 sm:px-6 sm:py-20 md:py-24 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-marigold/70" />
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-marigold sm:text-xs">
              <Typewriter text="Events" speed={120} />
            </p>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Upcoming gatherings for study, seva, kirtan, and community
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm leading-7 text-white/85 sm:mt-5 sm:text-base sm:leading-8">
            This page highlights the community and temple moments that invite
            families, students, and well-wishers into the life of Alabama
            Bhakti Community.
          </p>
        </div>

        {/* Image — square, full, never cropped */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:rounded-3xl md:max-w-none">
            <img
              src={heroImage}
              alt="A moment from a recent ABC gathering"
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBanner() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="py-10 sm:py-14 md:py-16">
      <div className="section-shell">
        <div
          ref={ref}
          className={`grid gap-6 transition-all duration-700 ease-out md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-10
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <figure className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_24px_60px_-28px_rgba(15,81,50,0.35)] sm:rounded-3xl md:max-w-none">
            <img
              src={featureImage}
              alt="Kirtan and community moments at ABC"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </figure>

          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-saffron/60" />
              <p className="eyebrow">Moments</p>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
              A glimpse into our gatherings
            </h2>
            <p className="mt-3 font-body text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
              Kirtan, study, feast, and friendship — captured from recent
              community events. Each photograph is a reminder of how the
              practice comes alive when we gather together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventTile({ event, index }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <EventCard event={event} />
    </div>
  );
}

function Events() {
  return (
    <>
      <EventsHero />
      <FeatureBanner />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Calendar"
            title="Plan your next visit to ABC"
            description="Each event below is driven by learning, community connection, and devotional culture."
          />

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-3 lg:gap-6">
            {eventsData.map((event, i) => (
              <EventTile
                key={`${event.date}-${event.title}`}
                event={event}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Events;
