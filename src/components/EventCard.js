function EventCard({ event }) {
  return (
    <article className="soft-card h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Upcoming Event</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">{event.title}</h3>
        </div>
        <div className="rounded-2xl bg-marigold/20 px-4 py-3 text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            {event.date}
          </p>
          <p className="mt-1 text-sm text-stone-700">{event.time}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-stone-700">{event.description}</p>
    </article>
  );
}

export default EventCard;
