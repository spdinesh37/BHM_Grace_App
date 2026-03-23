import SectionHeader from "../components/SectionHeader";
import EventsList from "../components/EventsList";
import HeroVideo from "../components/HeroVideo";
import WeeklyUpdate from "../components/WeeklyUpdate";
import eventsData from "../data/events.json";
import weeklyUpdateData from "../data/weeklyUpdate.json";

const pillars = [
  {
    title: "Serve",
    text: "Community members grow through meaningful seva, practical responsibility, and hospitality that nourishes the whole community."
  },
  {
    title: "Connect",
    text: "Shared worship, learning, meals, and dialogue create bonds rooted in trust, respect, and spiritual friendship."
  },
  {
    title: "Grow",
    text: "ABC encourages steady progress in Bhakti Yoga, devotional character, and a life of compassion."
  }
];

function Home() {
  return (
    <>
      <HeroVideo />

      <section className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="ABC at a Glance"
            title="A calm community pathway for devotion, education, and shared life"
            description="Alabama Bhakti Community is designed as a living environment where sacred study, daily practice, service, and cultural learning support one another."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="soft-card text-center">
                <p className="eyebrow">{pillar.title}</p>
                <h3 className="mt-4 text-3xl font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WeeklyUpdate update={weeklyUpdateData} />

      <EventsList events={eventsData} limit={3} showCta />
    </>
  );
}

export default Home;
