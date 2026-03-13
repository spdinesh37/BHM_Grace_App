import SectionHeader from "./SectionHeader";

const menuGroups = [
  { key: "mainItems", label: "Main Items" },
  { key: "soups", label: "Soups" },
  { key: "desserts", label: "Desserts" },
  { key: "drinks", label: "Drinks" }
];

function WeeklyUpdate({ update }) {
  if (!update) {
    return null;
  }

  return (
    <section id="weekly-update" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Weekly Update"
          title="This week's reminders and prasadam menu"
          description="Keep the community rhythm close at hand with the latest message, gathering details, and feast offerings."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <article className="glass-panel p-6 sm:p-8">
            <div className="flex flex-col gap-3 border-b border-amber-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-[10px] tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">
                  Current Week
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                  {update.week}
                </h3>
              </div>
              <span className="inline-flex rounded-full bg-marigold/20 px-4 py-2 text-sm font-semibold text-clay">
                {update.menuTitle}
              </span>
            </div>

            <p className="mt-6 text-sm leading-8 text-stone-700 sm:text-base">
              {update.announcement}
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {menuGroups.map((group) => (
              <article key={group.key} className="soft-card p-5 sm:p-6">
                <p className="eyebrow text-[10px] tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                  {update[group.key].map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl bg-sandal/70 px-4 py-3 font-medium"
                    >
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
