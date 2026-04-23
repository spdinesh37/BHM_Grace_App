import { useCallback, useEffect, useRef, useState } from "react";
import mayapurInstituteImage from "../assets/mayapur-institute.webp";
import { useReveal } from "../components/useReveal";
import ExpandCards from "../components/ExpandCards";
import curriculumData from "../data/curriculum.json";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const semesterGradients = [
  "linear-gradient(145deg, #1b7042, #0f5132, #092e1e)",
  "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
  "linear-gradient(145deg, #2d5a3a, #1b7042, #0f5132)",
  "linear-gradient(145deg, #0f5132, #0a3d26, #072a1a)",
];

function Curriculum() {
  const { titleScript, title, semesters, bookShowcase, handbook } = curriculumData;
  const handbookTitleLines = handbook.heading.split("\n");
  const showcaseRefs = useRef([]);
  const frameRef = useRef(0);
  const [showcaseDepths, setShowcaseDepths] = useState(() => bookShowcase.map(() => 0));
  const [headerRef, headerVisible] = useReveal(0.1);
  const [booksHeaderRef, booksHeaderVisible] = useReveal(0.1);

  const scrollToSemester = useCallback((semesterName) => {
    const id = semesterName.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  useEffect(() => {
    const updateShowcase = () => {
      frameRef.current = 0;
      const nextDepths = bookShowcase.map((_, index) => {
        const element = showcaseRefs.current[index];
        if (!element) return 0;
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
        nextDepths.some((value, index) => Math.abs(value - (current[index] ?? 0)) > 0.01) ? nextDepths : current
      );
    };

    const handleScroll = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updateShowcase);
    };

    updateShowcase();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [bookShowcase]);

  return (
    <>
      {/* ── Semester overview ─────────────────────────────────────── */}
      <section className="pt-8 pb-10 sm:pt-10 md:pt-12">
        <div className="section-shell">

          {/* Header */}
          <div
            ref={headerRef}
            className={`mb-8 transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-saffron/60" />
              <p className="eyebrow">Academic Path</p>
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              <em className="not-italic text-saffron">{titleScript}</em>{" "}{title}
            </h2>
            <p className="mt-3 max-w-2xl font-body text-sm leading-7 text-stone-600 sm:text-base">
              Four progressive semesters building from foundational Bhakti philosophy to deep scriptural study.
            </p>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-saffron to-marigold/40" />
          </div>

          {/* Semester cards */}
          <ExpandCards
            items={semesters.map((semester, i) => ({
              title: semester.name,
              eyebrow: semester.subtitle || undefined,
              listItems: semester.items.map((item) =>
                item.details ? `${item.title} — ${item.details}` : item.title
              ),
              gradient: semesterGradients[i % semesterGradients.length],
              onCtaClick: () => scrollToSemester(semester.name),
            }))}
          />
        </div>
      </section>

      {/* ── Book showcase ─────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="section-shell">
          <div className="curriculum-books-stage">
            <div
              ref={booksHeaderRef}
              className={`curriculum-books-heading transition-all duration-700 ease-out ${booksHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
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

                const isFirstOfSemester = index === 0 || bookShowcase[index - 1].semester !== book.semester;
                const semesterId = isFirstOfSemester
                  ? book.semester.toLowerCase().replace(/\s+/g, "-")
                  : undefined;

                return (
                  <article
                    key={`${book.semester}-${book.title}`}
                    id={semesterId}
                    ref={(element) => { showcaseRefs.current[index] = element; }}
                    className="curriculum-book-card"
                  >
                    <div className="curriculum-book-copy">
                      <p className="curriculum-book-semester">{book.semester}</p>
                      <p className="curriculum-book-heading">{book.heading}</p>
                      <h3 className="curriculum-book-title">{book.title}</h3>
                      {book.details && <p className="curriculum-book-details">{book.details}</p>}
                      {book.summary && <p className="curriculum-book-summary">{book.summary}</p>}
                    </div>

                    <div className="curriculum-book-visual">
                      <div className="curriculum-book-glow" aria-hidden="true" style={{ opacity: glowOpacity }} />
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

      {/* ── Handbook ──────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="section-shell">
          <div className="curriculum-stage curriculum-stage--secondary">
            <div className="curriculum-header curriculum-header--center">
              <div className="curriculum-title-lockup curriculum-title-lockup--secondary">
                <h2 className="curriculum-handbook-title">
                  {handbookTitleLines.map((line) => <span key={line}>{line}</span>)}
                </h2>
              </div>
            </div>

            <div className="handbook-grid">
              <article className="handbook-cover-card">
                <p className="handbook-kicker">{handbook.institute}</p>
                <a
                  href={`${process.env.PUBLIC_URL}/books/Bhakti-Shastri-Student-Handbook.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="handbook-seal block transition-transform duration-300 hover:scale-105"
                  title="Open Bhakti Shastri Student Handbook (PDF)"
                >
                  <img
                    src={mayapurInstituteImage}
                    alt="Open Bhakti Shastri Student Handbook (PDF)"
                    className="handbook-seal-image"
                  />
                </a>
                <h3 className="handbook-course-title">{handbook.course}</h3>
                <p className="handbook-edition">{handbook.edition}</p>
                <p className="handbook-note">{handbook.note}</p>
              </article>

              <article className="handbook-syllabus-card">
                <h3 className="handbook-syllabus-title">
                  <a
                    href={`${process.env.PUBLIC_URL}/books/Bhakti_Shastri_Syllabus.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Bhakti Shastri Syllabus (PDF)"
                    className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-saffron"
                  >
                    Bhakti Shastri Syllabus
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </h3>

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
                      {handbook.prerequisites.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="handbook-detail-card">
                    <p className="handbook-detail-label">Required Texts</p>
                    <ul className="handbook-list">
                      {handbook.requiredTexts.map((item) => <li key={item}>{item}</li>)}
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
                    {handbook.objectives.map((item) => <li key={item}>{item}</li>)}
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
