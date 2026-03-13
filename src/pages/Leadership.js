import PageHero from "../components/PageHero";
import leadershipData from "../data/leadership.json";

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Mentors and support teams who care for the GRACE community"
        description="Leadership at GRACE is centered on service, guidance, steadiness, and meaningful relationships that help students flourish."
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-6 md:grid-cols-2">
          {leadershipData.map((leader) => (
            <article key={leader.name} className="soft-card">
              <p className="eyebrow">{leader.role}</p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">{leader.name}</h2>
              <p className="mt-4 rounded-full bg-marigold/20 px-4 py-2 text-sm font-semibold text-clay inline-flex">
                {leader.focus}
              </p>
              <p className="mt-5 text-sm leading-8 text-stone-700">{leader.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Leadership;

