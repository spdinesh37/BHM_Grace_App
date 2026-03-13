import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";

function EventsList({
  events,
  eyebrow = "Upcoming Events",
  title = "Temple gatherings and academy moments to look forward to",
  description = "Join study circles, kirtan evenings, service opportunities, and celebrations that strengthen community life.",
  limit,
  showCta = false
}) {
  const items = limit ? events.slice(0, limit) : events;

  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((event) => (
            <EventCard key={`${event.date}-${event.title}`} event={event} />
          ))}
        </div>

        {showCta ? (
          <div className="mt-10">
            <Link to="/events" className="primary-button">
              View All Events
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default EventsList;

