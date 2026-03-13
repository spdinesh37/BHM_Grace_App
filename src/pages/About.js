import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const values = [
  {
    title: "Bhakti Yoga",
    text: "Daily spiritual practice offers a living foundation for clarity, gratitude, and personal transformation."
  },
  {
    title: "Cultural Education",
    text: "Students explore sacred texts, devotional arts, etiquette, and traditions that nourish a meaningful life."
  },
  {
    title: "Servant Leadership",
    text: "Leadership is understood as service, humility, steadiness, and the desire to support others sincerely."
  },
  {
    title: "Compassion and Respect",
    text: "GRACE aims to be a home marked by empathy, dignity, good communication, and thoughtful relationships."
  }
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About GRACE"
        title="A residential academy shaped by devotion, culture, and character"
        description="GRACE exists to cultivate spiritual depth, cultural grounding, and mature service-minded leadership in a peaceful community setting."
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel p-8">
            <p className="eyebrow">Vision</p>
            <h2 className="mt-4 text-4xl font-semibold text-ink">Learning that transforms the whole person</h2>
            <p className="mt-5 text-base leading-8 text-stone-700">
              The GRACE vision is to help students align education with inner
              growth. Through Bhakti Yoga, sacred study, community living, and
              service, the academy encourages lives of integrity, devotion, and
              practical wisdom.
            </p>
          </article>

          <article className="soft-card">
            <p className="eyebrow">Mission</p>
            <p className="mt-4 text-sm leading-8 text-stone-700">
              GRACE seeks to create a welcoming residential environment where
              students can learn scripture, develop character, practice servant
              leadership, and contribute meaningfully to the broader mission of
              spiritual education and compassionate community life.
            </p>
          </article>
        </div>
      </section>

      <section className="pb-10">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="soft-card">
                <p className="eyebrow">Core Value</p>
                <h3 className="mt-4 text-3xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <div className="glass-panel flex flex-col gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Community Living</p>
              <h2 className="mt-4 text-4xl font-semibold text-ink">Shared life is part of the education.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-stone-700">
                The residential setting supports consistency, healthy rhythm,
                peer encouragement, and the daily practice of mutual care.
              </p>
            </div>
            <Link to="/leadership" className="primary-button">
              View Leadership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

