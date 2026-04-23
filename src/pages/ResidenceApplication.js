import PageHero from "../components/PageHero";
import contactData from "../data/contact.json";

function ResidenceApplication() {
  const formEmbedUrl = contactData.residenceFormUrl.trim();

  return (
    <>
      <PageHero
        eyebrow="Grace Ashram"
        title="Residence Application"
        description="Fill out the form below to begin your residence application. We look forward to hearing from you."
      />

      <section className="py-10 sm:py-14 md:py-16 lg:py-24">
        <div className="section-shell">
          <div className="overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-glow sm:rounded-[1.5rem] md:rounded-[2rem]">
            <iframe
              title="Residence application form"
              src={formEmbedUrl}
              className="min-h-[520px] w-full sm:min-h-[620px] md:min-h-[720px]"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ResidenceApplication;
