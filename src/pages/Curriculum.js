import { useEffect, useRef, useState } from "react";
import mayapurInstituteImage from "../assets/mayapur-institute.webp";
import curriculumData from "../data/curriculum.json";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function Curriculum() {
  const { titleScript, title, semesters, bookShowcase, handbook } = curriculumData;
  const handbookTitleLines = handbook.heading.split("\n");
  const showcaseRefs = useRef([]);
  const frameRef = useRef(0);
  const [showcaseDepths, setShowcaseDepths] = useState(() => bookShowcase.map(() => 0));

  useEffect(() => {
    const updateShowcase = () => {
      frameRef.current = 0;

      const nextDepths = bookShowcase.map((_, index) => {
        const element = showcaseRefs.current[index];
        if (!element) {
          return 0;
        }

        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
        const visibilityRatio = Math.min(1, visibleHeight / Math.min(rect.height, viewportHeight));
        const sectionCenter = rect.top + rect.height / 2;
        const focusPoint = viewportHeight * 0.58;
        const maxDistance = rect.height / 2 + viewportHeight * 0.34;
        const centeredFocus = 1 - Math.min(1, Math.abs(sectionCenter - focusPoint) / maxDistance);

        return clamp(centeredFocus * 0.7 + visibilityRatio * 0.3, 0, 1);
      });

      setShowcaseDepths((current) =>
        nextDepths.some((value, index) => Math.abs(value - (current[index] ?? 0)) > 0.01)
          ? nextDepths
          : current
      );
    };

    const handleScroll = () => {
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updateShowcase);
      }
    };

    updateShowcase();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [bookShowcase]);

  return (
    <>
      <section className="pb-8">
        <div className="section-shell">
          <div className="curriculum-stage">
            <div className="curriculum-header">
              <div className="curriculum-title-lockup">
                <p className="curriculum-script-title">{titleScript}</p>
                <h2 className="curriculum-block-title">{title}</h2>
                <div className="curriculum-underline" aria-hidden="true" />
              </div>
            </div>

            <div className="curriculum-track-card">
              <div className="curriculum-track-line" aria-hidden="true">
                {semesters.map((semester) => (
                  <span key={semester.name} className="curriculum-track-stop" />
                ))}
              </div>

              <div className="curriculum-semester-grid">
                {semesters.map((semester) => (
                  <article key={semester.name} className="curriculum-semester-card">
                    <p className="curriculum-semester-label">{semester.name}</p>
                    {semester.subtitle ? (
                      <p className="curriculum-semester-subtitle">{semester.subtitle}</p>
                    ) : null}

                    <div className="curriculum-semester-content">
                      {semester.items.map((item) => (
                        <div key={`${semester.name}-${item.title}`} className="curriculum-entry">
                          {item.label ? (
                            <p className="curriculum-entry-label">{item.label}</p>
                          ) : null}
                          <p className="curriculum-entry-title">{item.title}</p>
                          {item.details ? (
                            <p className="curriculum-entry-details">{item.details}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="section-shell">
          <div className="curriculum-books-stage">
            <div className="curriculum-books-heading">
              <p className="eyebrow">Curriculum</p>
              <h2 className="curriculum-books-title">Sacred texts guiding the academic journey.</h2>
            </div>

            <div className="curriculum-books-list">
              {bookShowcase.map((book, index) => {
                const depth = showcaseDepths[index] ?? 0;
                const imageRotationY = 34 - depth * 34;
                const imageRotationX = 14 - depth * 14;
                const imageRotationZ = (index % 2 === 0 ? -1 : 1) * (1 - depth) * 7;
                const translateY = (1 - depth) * 36;
                const scale = 0.88 + depth * 0.12;
                const glowOpacity = 0.2 + depth * 0.28;

                return (
                  <article
                    key={`${book.semester}-${book.title}`}
                    ref={(element) => {
                      showcaseRefs.current[index] = element;
                    }}
                    className="curriculum-book-card"
                  >
                    <div className="curriculum-book-copy">
                      <p className="curriculum-book-semester">{book.semester}</p>
                      <p className="curriculum-book-heading">{book.heading}</p>
                      <h3 className="curriculum-book-title">{book.title}</h3>
                      {book.details ? (
                        <p className="curriculum-book-details">{book.details}</p>
                      ) : null}
                      {book.summary ? (
                        <p className="curriculum-book-summary">{book.summary}</p>
                      ) : null}
                    </div>

                    <div className="curriculum-book-visual">
                      <div
                        className="curriculum-book-glow"
                        aria-hidden="true"
                        style={{ opacity: glowOpacity }}
                      />
                      <img
                        src={`${process.env.PUBLIC_URL}/${book.image}`}
                        alt={book.title}
                        className="curriculum-book-cover"
                        loading="lazy"
                        style={{
                          transform: `perspective(1600px) rotateY(${imageRotationY}deg) rotateX(${imageRotationX}deg) rotateZ(${imageRotationZ}deg) translateY(${translateY}px) scale(${scale})`,
                          filter: `drop-shadow(0 28px 36px rgba(43, 30, 16, ${0.14 + depth * 0.18}))`
                        }}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="section-shell">
          <div className="curriculum-stage curriculum-stage--secondary">
            <div className="curriculum-header curriculum-header--center">
              <div className="curriculum-title-lockup curriculum-title-lockup--secondary">
                <h2 className="curriculum-handbook-title">
                  {handbookTitleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
              </div>
            </div>

            <div className="handbook-grid">
              <article className="handbook-cover-card">
                <p className="handbook-kicker">{handbook.institute}</p>
                <div className="handbook-seal" aria-hidden="true">
                  <img src={mayapurInstituteImage} alt="" className="handbook-seal-image" />
                </div>
                <h3 className="handbook-course-title">{handbook.course}</h3>
                <p className="handbook-edition">{handbook.edition}</p>
                <p className="handbook-note">{handbook.note}</p>
              </article>

              <article className="handbook-syllabus-card">
                <h3 className="handbook-syllabus-title">Bhakti Shastri Syllabus</h3>

                <div className="handbook-meta-grid">
                  {handbook.courseInfo.map((item) => (
                    <div key={item.label} className="handbook-meta-item">
                      <p className="handbook-meta-label">{item.label}</p>
                      <p className="handbook-meta-value">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="handbook-detail-grid">
                  <div className="handbook-detail-card">
                    <p className="handbook-detail-label">Prerequisite</p>
                    <ul className="handbook-list">
                      {handbook.prerequisites.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="handbook-detail-card">
                    <p className="handbook-detail-label">Required Texts</p>
                    <ul className="handbook-list">
                      {handbook.requiredTexts.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="handbook-copy-grid">
                  <div className="handbook-copy-card">
                    <p className="handbook-detail-label">Instructional Method</p>
                    <p className="handbook-copy-text">{handbook.method}</p>
                  </div>

                  <div className="handbook-copy-card">
                    <p className="handbook-detail-label">Course Description</p>
                    <p className="handbook-copy-text">{handbook.description}</p>
                  </div>
                </div>

                <div className="handbook-copy-card handbook-copy-card--objectives">
                  <p className="handbook-detail-label">Overarching Course Objectives</p>
                  <ul className="handbook-objectives-list">
                    {handbook.objectives.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Curriculum;
