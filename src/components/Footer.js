import { Link } from "react-router-dom";
import graceLogo from "../assets/grace-logo.png";
import contactData from "../data/contact.json";

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/50 bg-[#f6ead7]/90">
      <div className="section-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={graceLogo}
                alt="GRACE Ashram logo"
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
              <div>
                <p className="eyebrow">GRACE</p>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
                  Serve | Connect | Grow
                </p>
              </div>
            </div>
            <h2 className="mt-5 text-4xl font-semibold text-ink">
              A welcoming home for culture, study, and devotional practice.
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
              <Link to="/about" className="hover:text-saffron">
                About GRACE
              </Link>
              <Link to="/curriculum" className="hover:text-saffron">
                Curriculum
              </Link>
              <Link to="/leadership" className="hover:text-saffron">
                Leadership
              </Link>
              <Link to="/gallery" className="hover:text-saffron">
                Gallery
              </Link>
              <Link to="/contact" className="hover:text-saffron">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-ink">Contact</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
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
