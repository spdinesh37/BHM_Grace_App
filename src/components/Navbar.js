import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import abcLogo from "../assets/abc-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Grace Ashram", to: "/grace-ashram" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isAboutCompact, setIsAboutCompact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateNavbarState = () => {
      setScrollY(window.scrollY);

      if (location.pathname !== "/about") {
        setIsAboutCompact(false);
        return;
      }

      const spotlight = document.getElementById("about-spotlight");
      if (!spotlight) {
        setIsAboutCompact(window.scrollY < 320);
        return;
      }

      const rect = spotlight.getBoundingClientRect();
      setIsAboutCompact(rect.bottom > 140);
    };

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isAboutCompact && location.pathname === "/about") {
      setIsOpen(false);
    }
  }, [isAboutCompact, location.pathname]);

  const isScrolled = scrollY > 24;

  const shellClassName = isAboutCompact
    ? "border-white/14 bg-black/34 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.75)]"
    : isScrolled
      ? "border-white/80 bg-white/90 shadow-glow"
      : "border-white/50 bg-white/70";

  const buttonClass = isAboutCompact
    ? "border-white/18 bg-white/8 text-white"
    : "border-stone-200 bg-white text-stone-700";
  const panelClass = isAboutCompact
    ? "border-white/15 bg-black/74 backdrop-blur-2xl"
    : "border-stone-200/70 bg-white/95";

  const getNavClasses = (isActive) => {
    if (isAboutCompact) {
      return `rounded-2xl px-4 py-3 text-sm font-medium transition ${
        isActive
          ? "bg-white/12 text-white"
          : "text-white/82 hover:bg-white/10 hover:text-white"
      }`;
    }

    return `nav-link ${isActive ? "nav-link-active" : ""}`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-6 sm:pt-3">
      <div className="section-shell px-0">
        <div
          className={`relative rounded-[1.75rem] border backdrop-blur-xl transition ${
            isAboutCompact ? "mr-auto max-w-max sm:rounded-[1.5rem]" : "mx-auto max-w-7xl sm:rounded-full"
          } ${shellClassName}`}
        >
          <div
            className={`flex items-center ${
              isAboutCompact
                ? "gap-2 px-2.5 py-2.5"
                : "justify-between gap-3 px-3 py-3 sm:px-6"
            }`}
          >
            {isAboutCompact ? (
              <div className="flex items-center">
                <img
                  src={abcLogo}
                  alt="Alabama Bhakti Community logo"
                  className="h-10 w-10 flex-none object-contain"
                />
              </div>
            ) : (
              <Link to="/" className="flex min-w-0 items-center gap-3">
                <img
                  src={abcLogo}
                  alt="Alabama Bhakti Community logo"
                  className="h-11 w-11 flex-none object-contain sm:h-14 sm:w-14"
                />
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-ink sm:text-xl">ABC</p>
                  <p className="truncate text-[10px] uppercase tracking-[0.12em] text-stone-600 sm:text-xs sm:tracking-[0.22em]">
                    Alabama Bhakti Community
                  </p>
                </div>
              </Link>
            )}

            {!isAboutCompact ? (
              <nav className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => getNavClasses(isActive)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            ) : null}

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border sm:h-11 sm:w-11 ${buttonClass} ${isAboutCompact ? "" : "lg:hidden"}`}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <span className="text-xl leading-none">{isOpen ? "x" : "="}</span>
            </button>
          </div>

          {isOpen ? (
            <div
              className={`${isAboutCompact ? "absolute left-0 top-full mt-2 w-[18rem]" : "lg:hidden"}`}
            >
              <div className={`rounded-[1.5rem] border p-3 ${panelClass}`}>
                <nav className="grid gap-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => `${getNavClasses(isActive)} text-left`}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
