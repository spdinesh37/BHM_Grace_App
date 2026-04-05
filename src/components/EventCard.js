function EventCard({ event, style }) {
  const [month, ...rest] = event.date ? event.date.split(" ") : ["", event.date];
  const day = rest.join(" ");

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/70 bg-white/90 shadow-[0_8px_32px_-16px_rgba(90,66,41,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(90,66,41,0.28)] hover:border-marigold/40 sm:rounded-2xl"
      style={style}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-green-light to-brand-yellow" />

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* Date badge + eyebrow */}
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow">Upcoming Event</p>

          {/* Calendar badge */}
          <div className="shrink-0 overflow-hidden rounded-xl border border-yellow-100 bg-sandal text-center shadow-sm">
            <div className="bg-saffron px-3 py-0.5">
              <p className="font-body text-[9px] font-bold uppercase tracking-widest text-white">
                {month}
              </p>
            </div>
            <div className="px-3 py-1.5">
              <p className="font-display text-2xl font-bold leading-none text-ink">{day || "—"}</p>
              {event.time && (
                <p className="mt-0.5 font-body text-[10px] text-stone-500">{event.time}</p>
              )}
            </div>
          </div>
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold text-ink leading-snug group-hover:text-saffron transition-colors duration-200 sm:text-2xl">
          {event.title}
        </h3>

        <p className="mt-3 flex-1 font-body text-sm leading-7 text-stone-600">
          {event.description}
        </p>

        {/* Bottom indicator */}
        <div className="mt-5 flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-yellow-100 to-transparent" />
          <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-clay">
            ABC Event
          </span>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
