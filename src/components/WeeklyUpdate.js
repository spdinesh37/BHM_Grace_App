import { useReveal } from "./useReveal";
import SectionHeader from "./SectionHeader";

const menuGroups = [
  { key: "mainItems", label: "Main Items",  icon: "🍛" },
  { key: "soups",     label: "Soups",       icon: "🥣" },
  { key: "desserts",  label: "Desserts",    icon: "🍮" },
  { key: "drinks",    label: "Drinks",      icon: "🥤" },
];

function WeeklyUpdate({ update }) {
  const [ref, visible] = useReveal(0.1);

  if (!update) return null;

  return (
    <section id="weekly-update" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Weekly Update"
          title="This week's reminders and prasadam menu"
          description="Keep the community rhythm close at hand with the latest message, gathering details, and feast offerings."
        />

        <div
          ref={ref}
          className={`mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:mt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-6 transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Announcement card */}
          <article className="glass-panel relative overflow-hidden p-4 sm:p-6 md:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-marigold/15 blur-2xl" />

            <div className="flex flex-col gap-3 border-b border-amber-100/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-px w-5 bg-saffron/60" />
                  <p className="eyebrow">Current Week</p>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:mt-3 sm:text-2xl md:text-3xl">
                  {update.week}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-marigold/30 to-saffron/20 px-4 py-2 font-body text-sm font-semibold text-clay shadow-sm">
                🙏 {update.menuTitle}
              </span>
            </div>

            <p className="mt-6 font-body text-sm leading-8 text-stone-600 sm:text-base">
              {update.announcement}
            </p>
          </article>

          {/* Menu grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {menuGroups.map((group) => (
              <article key={group.key} className="soft-card overflow-hidden p-0">
                {/* Card header */}
                <div className="flex items-center gap-2 border-b border-amber-50 px-5 py-3 bg-sandal/50">
                  <span className="text-base">{group.icon}</span>
                  <p className="eyebrow text-[10px]">{group.label}</p>
                </div>
                <ul className="space-y-2 p-4">
                  {update[group.key]?.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3 py-2.5 font-body text-sm font-medium text-stone-700 shadow-sm"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeeklyUpdate;
