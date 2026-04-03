import PageHero from "../components/PageHero";
import contactData from "../data/contact.json";

function ResidenceApplication() {
  const formEmbedUrl = contactData.formEmbedUrl.trim();

  return (
    <>
      <PageHero
        eyebrow="Grace Ashram"
        title="Residence Application"
        description="Fill out the form below to begin your residence application. We look forward to hearing from you."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-glow sm:rounded-[2rem]">
            <iframe
              title="Residence application form"
              src={formEmbedUrl}
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

export default ResidenceApplication;
