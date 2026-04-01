import { useReveal } from "../components/useReveal";
import PageHero from "../components/PageHero";
import contactData from "../data/contact.json";

const placeholderEmbed = `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff8ef;color:#6b4f3b;font-family:Arial,sans-serif;padding:24px;text-align:center;">
    <div>
      <h2 style="margin:0 0 12px;font-size:24px;">Google Form Placeholder</h2>
      <p style="margin:0;font-size:16px;line-height:1.6;max-width:520px;">
        Add your Google Form embed URL to src/data/contact.json under formEmbedUrl and this iframe will automatically load the real form.
      </p>
    </div>
  </body>
</html>`;

const contactRows = (data) => [
  { icon: "📞", label: "Phone",    value: data.phone,        href: `tel:${data.phone}` },
  { icon: "✉️", label: "Email",    value: data.email,        href: `mailto:${data.email}` },
  { icon: "🌐", label: "Website",  value: data.websiteLabel, href: data.website, external: true },
  { icon: "📍", label: "Location", value: data.location,     href: null },
];

function Contact() {
  const formEmbedUrl = contactData.formEmbedUrl.trim();
  const [ref, visible] = useReveal(0.08);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out to learn more or begin your inquiry"
        description="Visitors can use the embedded form below for questions, applications, or interest in upcoming Alabama Bhakti Community programs."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div
          ref={ref}
          className={`section-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Contact details */}
          <article className="glass-panel relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-marigold/15 blur-2xl" />

            <div className="flex items-center gap-3">
              <div className="h-px w-5 bg-saffron/60" />
              <p className="eyebrow">Contact Details</p>
            </div>

            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              We'd love to hear from you
            </h2>

            <div className="mt-6 space-y-4">
              {contactRows(contactData).map((row) => (
                <div key={row.label} className="flex items-start gap-3 rounded-xl bg-white/60 px-4 py-3 border border-white/80 shadow-sm">
                  <span className="mt-0.5 text-lg">{row.icon}</span>
                  <div className="min-w-0">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-clay">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="font-body text-sm font-medium text-stone-700 transition-colors hover:text-saffron break-all"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm font-medium text-stone-700">{row.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Form */}
          <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-glow sm:rounded-[2rem]">
            <iframe
              title="ABC inquiry form"
              src={formEmbedUrl || undefined}
              srcDoc={formEmbedUrl ? undefined : placeholderEmbed}
              className="min-h-[680px] w-full sm:min-h-[720px]"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
