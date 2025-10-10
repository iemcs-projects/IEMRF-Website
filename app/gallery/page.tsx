import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"

const images = [
  "/student-ai-project.png",
  "/student-web-project.png",
  "/student-iot-health.png",
  "/student-iot-energy.png",
  "/student-logistics-ai.png",
  "/research-lab-team.png",
  "/workshop-prototyping-team.png",
  "/startup-bootcamp-session.png",
  "/innovation-workshop.png",
  "/team-incubation-workspace.png",
]

export default function GalleryPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div className="text-center">
            <h1 className="text-pretty text-3xl font-bold text-gray-900">Gallery</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600 max-w-2xl mx-auto">
              Moments from our research labs, workshops, mentorship sessions, and student showcases.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map((src) => (
              <figure key={src} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <img src={src} alt="IEMRF gallery item" className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105" />
              </figure>
            ))}
          </div>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}


