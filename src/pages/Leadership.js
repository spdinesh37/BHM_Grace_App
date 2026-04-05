import { useReveal } from "../components/useReveal";
import PageHero from "../components/PageHero";
import leadershipData from "../data/leadership.json";

const avatarColors = [
  { bg: "bg-yellow-100",   text: "text-amber-700",  border: "border-yellow-200"  },
  { bg: "bg-sky-100",     text: "text-sky-700",     border: "border-sky-200"    },
  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200"},
  { bg: "bg-purple-100",  text: "text-purple-700",  border: "border-purple-200" },
];

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function LeaderCard({ leader, index }) {
  const [ref, visible] = useReveal(0.1);
  const color = avatarColors[index % avatarColors.length];

  return (
    <article
      ref={ref}
      className={`soft-card group relative overflow-hidden transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_52px_-20px_rgba(90,66,41,0.24)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green via-brand-green-light to-brand-yellow" />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 font-display text-lg font-bold shadow-sm ${color.bg} ${color.text} ${color.border}`}>
          {getInitials(leader.name)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="eyebrow text-[10px] leading-none">{leader.role}</p>
          <h2 className="mt-1.5 font-display text-xl font-semibold text-ink leading-snug sm:text-2xl">
            {leader.name}
          </h2>
        </div>
      </div>

      {/* Focus badge */}
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-marigold/15 px-3.5 py-1.5 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
        <span className="font-body text-xs font-semibold text-clay">{leader.focus}</span>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-yellow-100 via-yellow-200/60 to-transparent" />

      <p className="font-body text-sm leading-7 text-stone-600">{leader.bio}</p>
    </article>
  );
}

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Mentors and support teams who care for the ABC community"
        description="Leadership at Alabama Bhakti Community is centered on service, guidance, steadiness, and meaningful relationships that help students flourish."
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="section-shell grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {leadershipData.map((leader, i) => (
            <LeaderCard key={leader.name} leader={leader} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Leadership;
