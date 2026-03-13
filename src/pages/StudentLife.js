import PageHero from "../components/PageHero";

const rhythm = [
  {
    title: "Morning",
    text: "The day begins with prayer, japa, kirtan, and sacred study that helps students start with steadiness and intention."
  },
  {
    title: "Daytime",
    text: "Classes, seva teams, mentoring conversations, and practical responsibilities shape the working flow of the community."
  },
  {
    title: "Evening",
    text: "Evenings make room for reflection, group discussion, reading, temple programs, and a peaceful close to the day."
  }
];

const highlights = [
  "Residential life grounded in respect, simplicity, and shared responsibility.",
  "Healthy rhythms that balance study, service, rest, and personal reflection.",
  "A supportive environment where mentorship and friendship reinforce growth.",
  "Regular opportunities for kirtan, festivals, cooking, hospitality, and outreach."
];

function StudentLife() {
  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="Daily life designed around practice, peace, and purposeful community"
        description="Inside the GRACE community, students learn not only through classes, but also through the habits, relationships, and responsibilities of shared life."
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {rhythm.map((item) => (
            <article key={item.title} className="soft-card">
              <p className="eyebrow">Daily Rhythm</p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <article className="glass-panel p-8">
            <p className="eyebrow">Life Together</p>
            <h2 className="mt-4 text-4xl font-semibold text-ink">Community living becomes a teacher.</h2>
            <p className="mt-5 text-sm leading-8 text-stone-700">
              Students learn patience, communication, humility, and discipline
              through everyday interactions. Meals, service, worship, and study
              create a culture of shared purpose and warm accountability.
            </p>
          </article>

          <article className="soft-card">
            <p className="eyebrow">What Students Experience</p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-stone-700">
              {highlights.map((item) => (
                <li key={item} className="rounded-2xl bg-sandal/70 px-4 py-4">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

export default StudentLife;

