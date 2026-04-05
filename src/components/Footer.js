import { Link } from "react-router-dom";
import abcLogo from "../assets/abc-logo.png";
import contactData from "../data/contact.json";

const links = [
  { label: "Home",          to: "/" },
  { label: "About",         to: "/about" },
  { label: "Grace Ashram",  to: "/grace-ashram" },
  { label: "Events",        to: "/events" },
  { label: "Contact",       to: "/contact" },
];

function Footer() {
  return (
    <footer className="mt-14 sm:mt-20 md:mt-24">
      {/* Top divider shimmer */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-marigold/50 to-transparent" />

      <div className="bg-[#f6ead7]/80 backdrop-blur-sm">
        <div className="section-shell py-10 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-12">

            {/* Brand col */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 sm:gap-4 group">
                <img
                  src={abcLogo}
                  alt="Alabama Bhakti Community logo"
                  className="h-14 w-14 flex-none object-contain transition duration-300 group-hover:scale-105 sm:h-18 sm:w-18"
                />
                <div>
                  <p className="eyebrow text-[10px] tracking-[0.28em] sm:text-xs">ABC</p>
                  <p className="font-body text-sm font-semibold text-ink sm:text-base">
                    Alabama Bhakti Community
                  </p>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 sm:text-sm">
                    Serve · Connect · Grow
                  </p>
                </div>
              </Link>

              <p className="mt-4 max-w-sm font-display text-xl font-semibold leading-snug text-ink sm:mt-6 sm:text-2xl md:text-3xl">
                A welcoming home for devotional practice, culture, and community.
              </p>
              <p className="mt-3 max-w-sm font-body text-xs leading-6 text-stone-600 sm:mt-4 sm:text-sm sm:leading-7">
                Inspired by the teachings of His Divine Grace A.C. Bhaktivedanta
                Swami Prabhupada and the community spirit of ISKCON Birmingham, Alabama.
              </p>
            </div>

            {/* Quick links col */}
            <div>
              <p className="font-display text-xl font-semibold text-ink">Quick Links</p>
              <div className="mt-px h-0.5 w-8 rounded-full bg-gradient-to-r from-saffron to-transparent" />
              <nav className="mt-5 grid gap-2.5">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group inline-flex items-center gap-2 font-body text-sm text-stone-600 transition-colors hover:text-brand-green"
                  >
                    <span className="h-px w-3 bg-stone-300 transition-all duration-200 group-hover:w-5 group-hover:bg-brand-green" />
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact col */}
            <div>
              <p className="font-display text-xl font-semibold text-ink">Contact</p>
              <div className="mt-px h-0.5 w-8 rounded-full bg-gradient-to-r from-saffron to-transparent" />
              <div className="mt-5 space-y-3 font-body text-sm text-stone-600">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-base">📞</span>
                  <span>{contactData.phone}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-base">✉️</span>
                  <a href={`mailto:${contactData.email}`} className="transition-colors hover:text-brand-green break-all">
                    {contactData.email}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-base">🌐</span>
                  <a href={contactData.website} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-green">
                    {contactData.websiteLabel}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-base">📍</span>
                  <span>{contactData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-yellow-200/60">
          <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
            <p className="font-body text-xs text-stone-500">
              © {new Date().getFullYear()} Alabama Bhakti Community. All rights reserved.
            </p>
            <p className="font-body text-xs text-stone-400 uppercase tracking-widest">
              Serve · Connect · Grow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
