import { NavLink, Outlet } from "react-router-dom";

const sections = [
  { label: "Curriculum", to: "/grace-ashram/curriculum" },
  { label: "Student Life", to: "/grace-ashram/student-life" },
  { label: "Residence Application", to: "/grace-ashram/residence-application" }
];

function GraceAshram() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="section-shell">
          <div className="grace-ashram-shell">
            <div className="grace-ashram-shell__halo grace-ashram-shell__halo--left" aria-hidden="true" />
            <div className="grace-ashram-shell__halo grace-ashram-shell__halo--right" aria-hidden="true" />
            <p className="eyebrow">Grace Ashram</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-ink sm:text-5xl lg:text-[3.8rem]">
              Study, shared life, and the residence journey in one place.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-stone-700 sm:text-base">
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
