function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? <p className="eyebrow text-[10px] tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold text-ink sm:mt-4 sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-stone-700 sm:mt-4 sm:text-base lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
