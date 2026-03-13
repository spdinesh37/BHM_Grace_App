import { Link } from "react-router-dom";
import EventsList from "../components/EventsList";
import HeroVideo from "../components/HeroVideo";
import SectionHeader from "../components/SectionHeader";
import WeeklyUpdate from "../components/WeeklyUpdate";
import eventsData from "../data/events.json";
import weeklyUpdateData from "../data/weeklyUpdate.json";

const pillars = [
  {
    title: "Serve",
    text: "Students grow through meaningful seva, practical responsibility, and hospitality that nourishes the whole community."
  },
  {
    title: "Connect",
    text: "Shared worship, learning, meals, and dialogue create bonds rooted in trust, respect, and spiritual friendship."
  },
  {
    title: "Grow",
    text: "The academy encourages steady progress in Bhakti Yoga, thoughtful leadership, and a life of compassion."
  }
];

function Home() {
  return (
    <>
      <HeroVideo />

      <section className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Grace at a Glance"
            title="A calm residential pathway for devotion, education, and community life"
            description="GRACE is designed as a living environment where sacred study, daily practice, servant leadership, and cultural learning support one another."
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

      <WeeklyUpdate update={weeklyUpdateData[0]} />

      <EventsList events={eventsData} limit={3} showCta />

      <section className="pb-10">
        <div className="section-shell">
          <div className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="eyebrow">Leadership and Care</p>
                <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
                  Mentorship is woven into everyday life at GRACE.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700">
                  Students are supported through pastoral care, scripture study,
                  community guidance, and a warm culture of accountability.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <Link to="/leadership" className="primary-button">
                  Meet the Team
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-amber-300 px-5 py-3 text-sm font-semibold text-clay transition hover:bg-amber-50">
                  Request More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

