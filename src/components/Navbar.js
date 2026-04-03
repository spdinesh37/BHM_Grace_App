import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import abcLogo from "../assets/abc-logo.png";

const navItems = [
  {
    label: "Home",
    to: "/",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )
  },
  {
    label: "About",
    to: "/about",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "Grace Ashram",
    to: "/grace-ashram",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    label: "Events",
    to: "/events",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "Contact",
    to: "/contact",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    )
  }
];

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isAboutCompact, setIsAboutCompact] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateNavbarState = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (currentY > 80) {
        if (currentY > lastScrollY.current + 6) {
          setIsHidden(true);
          setIsOpen(false);
        } else if (currentY < lastScrollY.current - 4) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;

      if (location.pathname !== "/about") {
        setIsAboutCompact(false);
        return;
      }

      const spotlight = document.getElementById("about-spotlight");
      if (!spotlight) {
        setIsAboutCompact(currentY < 320);
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

  const getMobileNavClasses = (isActive) => {
    if (isAboutCompact) {
      return `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
        isActive ? "bg-white/14 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
      }`;
    }
    return `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-saffron/10 text-saffron font-semibold"
        : "text-stone-700 hover:bg-stone-50 hover:text-saffron"
    }`;
  };

  const panelBg = isAboutCompact
    ? "border-white/15 bg-black/80 backdrop-blur-2xl"
    : "border-stone-200/70 bg-white/98 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(90,66,41,0.18)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-6 sm:pt-3 transition-transform duration-300 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
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
                <img src={abcLogo} alt="Alabama Bhakti Community logo" className="h-10 w-10 flex-none object-contain" />
              </div>
            ) : (
              <Link to="/" className="flex min-w-0 items-center gap-3">
                <img src={abcLogo} alt="Alabama Bhakti Community logo" className="h-11 w-11 flex-none object-contain sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="flex justify-between text-lg font-semibold text-ink sm:text-xl">
                    <span>A</span><span>B</span><span>C</span>
                  </p>
                  <p className="flex justify-between text-[10px] uppercase tracking-[0.12em] text-stone-600 sm:text-xs sm:tracking-[0.22em]">
                    <span>Alabama</span><span>Bhakti</span><span>Community</span>
                  </p>
                </div>
              </Link>
            )}

            {!isAboutCompact && (
              <nav className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => getNavClasses(isActive)}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            )}

            <button
              type="button"
              onClick={() => setIsOpen((c) => !c)}
              className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border sm:h-11 sm:w-11 transition-colors duration-200 ${buttonClass} ${isAboutCompact ? "" : "lg:hidden"}`}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>

          {isOpen && (
            <div className={`${isAboutCompact ? "absolute left-0 top-full mt-2 w-[18rem]" : "lg:hidden"}`}>
              <div className={`rounded-[1.5rem] border p-2 ${panelBg}`}>
                <nav className="grid gap-0.5">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => getMobileNavClasses(isActive)}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
