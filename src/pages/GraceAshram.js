import { NavLink, Outlet } from "react-router-dom";

const sections = [
  { label: "Curriculum", to: "/grace-ashram/curriculum" },
  { label: "Student Life", to: "/grace-ashram/student-life" },
  { label: "Residence Application", to: "/grace-ashram/residence-application" }
];

function GraceAshram() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 sm:pt-28 md:pt-32">
        <div className="section-shell">
          <div className="grace-ashram-shell">
            <div className="grace-ashram-shell__halo grace-ashram-shell__halo--left" aria-hidden="true" />
            <div className="grace-ashram-shell__halo grace-ashram-shell__halo--right" aria-hidden="true" />
            <p className="eyebrow">Grace Ashram</p>
            <h1 className="mt-3 max-w-4xl text-2xl font-semibold text-ink sm:mt-4 sm:text-4xl md:text-5xl lg:text-[3.8rem]">
              Study, shared life, and the residence journey in one place.
            </h1>
            <p className="mt-3 max-w-3xl text-xs leading-6 text-stone-700 sm:mt-5 sm:text-sm sm:leading-8 md:text-base">
              Grace Ashram gathers the academic path, daily community culture,
              and residential application flow of Alabama Bhakti Community into
              one guided space.
            </p>

            <nav className="ashram-subnav" aria-label="Grace Ashram sections">
              {sections.map((section) => (
                <NavLink
                  key={section.to}
                  to={section.to}
                  className={({ isActive }) =>
                    `ashram-subnav__link ${isActive ? "ashram-subnav__link--active" : ""}`
                  }
                >
                  {section.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
}

export default GraceAshram;
