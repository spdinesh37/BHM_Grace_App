import { Link } from "react-router-dom";
import abcLogo from "../assets/abc-logo.png";
import contactData from "../data/contact.json";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/50 bg-[#f6ead7]/90 sm:mt-24">
      <div className="section-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={abcLogo}
                alt="Alabama Bhakti Community logo"
                className="h-14 w-14 flex-none object-contain sm:h-20 sm:w-20"
              />
              <div className="min-w-0">
                <p className="eyebrow text-[10px] tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">ABC</p>
                <p className="text-sm font-semibold text-ink sm:text-base">
                  Alabama Bhakti Community
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 sm:text-sm sm:tracking-[0.24em]">
                  Serve | Connect | Grow
                </p>
              </div>
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">
              A welcoming home for devotional practice, culture, and community.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-700">
              Inspired by the teachings of His Divine Grace A.C. Bhaktivedanta
              Swami Prabhupada and the community spirit of ISKCON Birmingham,
              Alabama.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-ink">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-stone-700">
              <Link to="/" className="hover:text-saffron">
                Home
              </Link>
              <Link to="/about" className="hover:text-saffron">
                About
              </Link>
              <Link to="/grace-ashram" className="hover:text-saffron">
                Grace Ashram
              </Link>
              <Link to="/events" className="hover:text-saffron">
                Events
              </Link>
              <Link to="/contact" className="hover:text-saffron">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-ink">Contact</h3>
            <div className="mt-4 space-y-3 break-words text-sm leading-7 text-stone-700">
              <p>Phone: {contactData.phone}</p>
              <p>
                Email:{" "}
                <a
                  className="hover:text-saffron"
                  href={`mailto:${contactData.email}`}
                >
                  {contactData.email}
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  className="hover:text-saffron"
                  href={contactData.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactData.websiteLabel}
                </a>
              </p>
              <p>Location: {contactData.location}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
