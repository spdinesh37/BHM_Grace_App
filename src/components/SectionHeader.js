import { useReveal } from "./useReveal";

function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const [ref, visible] = useReveal(0.1);
  const isCenter = align === "center";

  return (
    <div
      ref={ref}
      className={`max-w-3xl transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${isCenter ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
          <div className="h-px w-6 bg-saffron/70" />
          <p className="eyebrow">{eyebrow}</p>
          <div className="h-px w-6 bg-saffron/70" />
        </div>
      )}

      <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-4 font-body text-sm leading-8 text-stone-600 sm:text-base lg:text-lg">
          {description}
        </p>
      )}

      {/* Decorative accent line */}
      <div className={`mt-5 h-0.5 w-12 rounded-full bg-gradient-to-r from-saffron to-marigold/40
        ${isCenter ? "mx-auto" : ""}`}
      />
    </div>
  );
}

export default SectionHeader;
