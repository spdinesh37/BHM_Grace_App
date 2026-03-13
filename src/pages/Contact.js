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

function Contact() {
  const formEmbedUrl = contactData.formEmbedUrl.trim();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out to learn more or begin your inquiry"
        description="Visitors can use the embedded form below for questions, applications, or interest in upcoming programs."
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-panel p-8">
            <p className="eyebrow">Contact Details</p>
            <div className="mt-5 space-y-4 text-sm leading-8 text-stone-700">
              <p>Phone: {contactData.phone}</p>
              <p>
                Email:{" "}
                <a className="hover:text-saffron" href={`mailto:${contactData.email}`}>
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
          </article>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-glow">
            <iframe
              title="GRACE inquiry form"
              src={formEmbedUrl || undefined}
              srcDoc={formEmbedUrl ? undefined : placeholderEmbed}
              className="min-h-[720px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

