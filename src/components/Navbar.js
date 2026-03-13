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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="section-shell px-0">
        <div
          className={`mx-auto max-w-7xl rounded-[1.75rem] border backdrop-blur-xl transition sm:rounded-full ${shellClassName}`}
        >
          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-6">
            <Link to="/" className="min-w-0 flex-1 sm:flex-none flex items-center gap-3">
              <img
                src={graceLogo}
                alt="GRACE Ashram logo"
                className="h-11 w-11 flex-none object-contain sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-ink sm:text-xl">GRACE</p>
                <p className="truncate text-[10px] uppercase tracking-[0.18em] text-stone-600 sm:hidden">
                  Ashram
                </p>
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
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 sm:h-11 sm:w-11 lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <span className="text-xl leading-none">{isOpen ? "x" : "="}</span>
            </button>
          </div>

          {isOpen ? (
            <div className="border-t border-stone-200/70 px-3 pb-4 pt-2 sm:px-4 lg:hidden">
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
