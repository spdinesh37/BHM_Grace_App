import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import graceLogo from "../assets/grace-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Curriculum", to: "/curriculum" },
  { label: "Student Life", to: "/student-life" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shellClassName = isScrolled
    ? "border-white/80 bg-white/90 shadow-glow"
    : "border-white/50 bg-white/70";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="section-shell px-0">
        <div
          className={`mx-auto max-w-7xl rounded-full border backdrop-blur-xl transition ${shellClassName}`}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={graceLogo}
                alt="GRACE Ashram logo"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <div>
                <p className="text-xl font-semibold text-ink">GRACE</p>
                <p className="hidden text-xs uppercase tracking-[0.28em] text-stone-600 sm:block">
                  Gauranga Residential Academy
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/leadership" className="ml-2 primary-button px-4 py-2">
                Leadership
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <span className="text-xl">{isOpen ? "x" : "="}</span>
            </button>
          </div>

          {isOpen ? (
            <div className="border-t border-stone-200/70 px-4 pb-4 pt-2 lg:hidden">
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link text-left ${isActive ? "nav-link-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/leadership"
                  className={({ isActive }) =>
                    `nav-link text-left ${isActive ? "nav-link-active" : ""}`
                  }
                >
                  Leadership
                </NavLink>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
