import PageHero from "../components/PageHero";
import curriculumData from "../data/curriculum.json";

function Curriculum() {
  return (
    <>
      <PageHero
        eyebrow="Curriculum"
        title="A semester-based study path rooted in scripture and practice"
        description="The GRACE curriculum combines foundational texts with reflective discussion, lived application, and mentorship across the academic year."
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-8 xl:grid-cols-2">
          {curriculumData.map((semester) => (
            <article key={semester.semester} className="glass-panel p-8">
              <p className="eyebrow">{semester.semester}</p>
              <h2 className="mt-4 text-4xl font-semibold text-ink">{semester.theme}</h2>
              <p className="mt-4 text-sm leading-8 text-stone-700">{semester.summary}</p>

              <div className="mt-8 grid gap-4">
                {semester.courses.map((course) => (
                  <div key={course.title} className="rounded-[1.5rem] border border-amber-100 bg-white/80 p-5">
                    <h3 className="text-2xl font-semibold text-ink">{course.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-700">{course.focus}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <div className="section-shell">
          <div className="soft-card">
            <p className="eyebrow">How Learning Happens</p>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-stone-700">
              Study at GRACE is meant to be personal, dialog-driven, and lived.
              Students engage through guided reading, discussion circles,
              journaling, presentations, memorization, and service-based
              application that links scripture to real habits and relationships.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Curriculum;

