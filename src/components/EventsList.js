import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";

function EventsList({
  events,
  eyebrow = "Upcoming Events",
  title = "Temple gatherings and community moments to look forward to",
  description = "Join study circles, kirtan evenings, service opportunities, and celebrations that strengthen community life.",
  limit,
  showCta = false
}) {
  const items = limit ? events.slice(0, limit) : events;
  const [ctaRef, ctaVisible] = useReveal(0.1);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-3 lg:gap-6">
          {items.map((event, i) => (
            <div
              key={`${event.date}-${event.title}`}
              className="reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
              ref={(el) => {
                if (!el) return;
                const obs = new IntersectionObserver(
                  ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
                  { threshold: 0.1 }
                );
                obs.observe(el);
              }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {showCta && (
          <div
            ref={ctaRef}
            className={`mt-12 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Link to="/events" className="primary-button">
              View All Events
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsList;
