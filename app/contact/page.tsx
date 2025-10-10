import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { ContactForm } from "@/components/contact-form"
import { ContactMap } from "@/components/contact-map"

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            Tell us about your idea, startup, or partnership. We'll be in touch shortly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Get in touch</h2>
                <p className="mt-2 text-sm text-gray-600">
                  We welcome innovators, mentors, and collaborators. Share a brief overview, and we'll follow up.
                </p>
                <div className="mt-4 rounded border bg-white p-4 text-sm text-gray-600">
                  <div className="font-medium text-gray-900">IEM Research Foundation</div>
                  <div>Kolkata, India</div>
                  <div className="mt-2">Hours: Mon–Fri, 10:00–18:00 IST</div>
                </div>
              </div>

              <ContactMap />
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
