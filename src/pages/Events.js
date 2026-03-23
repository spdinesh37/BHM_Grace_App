import EventsList from "../components/EventsList";
import PageHero from "../components/PageHero";
import eventsData from "../data/events.json";

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Upcoming gatherings for study, seva, kirtan, and community"
        description="This page highlights the community and temple moments that invite families, students, and well-wishers into the life of Alabama Bhakti Community."
      />

      <EventsList
        events={eventsData}
        eyebrow="Calendar"
        title="Plan your next visit to ABC"
        description="Each event below is driven by learning, community connection, and devotional culture."
      />
    </>
  );
}

export default Events;
