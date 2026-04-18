import { useState } from "react";
import { useReveal } from "./useReveal";

function ExpandCards({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, visible] = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={`expand-cards transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={item.title}
            type="button"
            className={`expand-card ${isActive ? "expand-card--active" : ""}`}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            aria-expanded={isActive}
          >
            {/* Gradient background */}
            <div
              className="expand-card__bg"
              style={{ background: item.gradient }}
            />

            {/* Decorative pattern overlay */}
            <div className="expand-card__pattern" />

            {/* Bottom gradient for text readability */}
            <div className="expand-card__shade" />

            {/* Collapsed state: vertical title */}
            <div className={`expand-card__collapsed ${isActive ? "expand-card__collapsed--hide" : ""}`}>
              <span className="expand-card__collapsed-title">{item.title}</span>
            </div>

            {/* Expanded state: full content */}
            <div className={`expand-card__expanded ${isActive ? "expand-card__expanded--show" : ""}`}>
              {item.eyebrow && (
                <span className="expand-card__eyebrow">{item.eyebrow}</span>
              )}
              <h3 className="expand-card__title">{item.title}</h3>
              <div className="expand-card__divider" />
              {item.listItems ? (
                <ul className="expand-card__list">
                  {item.listItems.map((li) => (
                    <li key={li} className="expand-card__list-item">{li}</li>
                  ))}
                </ul>
              ) : (
                <p className="expand-card__text">{item.text}</p>
              )}
              {item.onCtaClick && (
                <span
                  className="expand-card__cta"
                  role="link"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onCtaClick();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      item.onCtaClick();
                    }
                  }}
                >
                  Know More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ExpandCards;
