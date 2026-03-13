function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;

