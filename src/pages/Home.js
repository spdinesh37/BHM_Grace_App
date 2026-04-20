import SectionHeader from "../components/SectionHeader";
import EventsList from "../components/EventsList";
import HeroVideo from "../components/HeroVideo";
import WeeklyUpdate from "../components/WeeklyUpdate";
import ExpandCards from "../components/ExpandCards";
import eventsData from "../data/events.json";
import weeklyUpdateData from "../data/weeklyUpdate.json";

const pillars = [
  {
    title: "Serve",
    text: "Community members grow through meaningful seva, practical responsibility, and hospitality that nourishes the whole community.",
    gradient: "linear-gradient(145deg, #1b7042, #0f5132, #092e1e)",
  },
  {
    title: "Connect",
    text: "Shared worship, learning, meals, and dialogue create bonds rooted in trust, respect, and spiritual friendship.",
    gradient: "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
  },
  {
    title: "Grow",
    text: "ABC encourages steady progress in Bhakti Yoga, devotional character, and a life of compassion.",
    gradient: "linear-gradient(145deg, #2d5a3a, #1b7042, #0f5132)",
  },
];

function Home() {
  return (
    <>
      <HeroVideo />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="ABC at a Glance"
            title="Your Spiritual Hub"
            description="Alabama Bhakti Community is designed as a living environment where sacred study, daily practice, service, like-minded connections, and personal growth support one another."
            align="center"
          />

          <div className="mt-8 sm:mt-10 md:mt-12">
            <ExpandCards items={pillars} />
          </div>
        </div>
      </section>

      <WeeklyUpdate update={weeklyUpdateData} />

      <EventsList events={eventsData} limit={3} showCta />
    </>
  );
}

export default Home;
