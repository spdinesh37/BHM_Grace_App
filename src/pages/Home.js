import { useReveal } from "../components/useReveal";
import SectionHeader from "../components/SectionHeader";
import EventsList from "../components/EventsList";
import HeroVideo from "../components/HeroVideo";
import WeeklyUpdate from "../components/WeeklyUpdate";
import eventsData from "../data/events.json";
import weeklyUpdateData from "../data/weeklyUpdate.json";

const pillars = [
  {
    title: "Serve",
    icon: "🤲",
    accent: "from-amber-50 to-orange-50",
    dot: "bg-saffron",
    text: "Community members grow through meaningful seva, practical responsibility, and hospitality that nourishes the whole community."
  },
  {
    title: "Connect",
    icon: "🕊️",
    accent: "from-sky-50 to-blue-50",
    dot: "bg-sky-400",
    text: "Shared worship, learning, meals, and dialogue create bonds rooted in trust, respect, and spiritual friendship."
  },
  {
    title: "Grow",
    icon: "🌿",
    accent: "from-emerald-50 to-teal-50",
    dot: "bg-leaf",
    text: "ABC encourages steady progress in Bhakti Yoga, devotional character, and a life of compassion."
  }
];

function PillarCard({ pillar, index }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <article
      ref={ref}
      className={`soft-card group relative overflow-hidden transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(90,66,41,0.22)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Gradient bg tint */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-0`} />

      <div className="relative z-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl border border-amber-100/80">
          {pillar.icon}
        </div>
        <p className="eyebrow mt-4">{pillar.title}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-ink">{pillar.title}</h3>
        <div className={`mx-auto mt-3 h-0.5 w-8 rounded-full ${pillar.dot}`} />
        <p className="mt-4 font-body text-sm leading-7 text-stone-600">{pillar.text}</p>
      </div>
    </article>
  );
}

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

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.title} pillar={pillar} index={i} />
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
