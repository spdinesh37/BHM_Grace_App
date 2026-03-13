import EventsList from "../components/EventsList";
import PageHero from "../components/PageHero";
import eventsData from "../data/events.json";

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Upcoming gatherings for study, seva, kirtan, and community"
        description="This page highlights the academy and temple moments that invite students, families, and well-wishers into the life of GRACE."
      />

      <EventsList
        events={eventsData}
        eyebrow="Calendar"
        title="Plan your next visit to GRACE"
        description="Each event below is driven by learning, community connection, and devotional culture."
      />
    </>
  );
}

export default Events;

