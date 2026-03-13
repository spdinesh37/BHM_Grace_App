import GalleryGrid from "../components/GalleryGrid";
import PageHero from "../components/PageHero";
import galleryData from "../data/gallery.json";

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Scenes of devotion, study, service, and community life"
        description="The gallery is set up to use optimized local images from the public/gallery folder and lazy-load them for a faster mobile experience."
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="mb-10 soft-card">
            <p className="eyebrow">Image Notes</p>
            <p className="mt-4 text-sm leading-8 text-stone-700">
              Replace the sample artwork in public/gallery with your real photos,
              keeping filenames or updating src/data/gallery.json as needed.
            </p>
          </div>

          <GalleryGrid images={galleryData} />
        </div>
      </section>
    </>
  );
}

export default Gallery;

