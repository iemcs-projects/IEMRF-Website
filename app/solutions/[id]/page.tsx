"use client"

import { solutions } from "@/lib/solutions-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

type Props = {
  params: { id: string }
}

export default function SolutionDetailPage({ params }: Props) {
  const solution = solutions.find((s) => s.id === params.id)

  if (!solution) {
    notFound()
  }

  const handleDownload = () => {
    if (solution.detailsPath) {
      const link = document.createElement("a")
      link.href = solution.detailsPath
      link.download = solution.detailsPath.split("/").pop() || "solution-details"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <main className="relative min-h-screen">
      <SiteHeader />

      {/* Back Navigation */}
      <div className="border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Solutions</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white/10 md:h-80">
              {solution.image ? (
                <Image
                  src={solution.image}
                  alt={solution.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl">
                  {solution.icon}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30">{solution.category}</Badge>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{solution.name}</h1>
              <p className="text-lg leading-relaxed text-gray-100">{solution.overview}</p>

              {solution.guide && (
                <div className="space-y-1 pt-4">
                  <p className="text-sm font-semibold text-gray-200">Guide</p>
                  <p className="text-white">{solution.guide}</p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-6">
                {solution.detailsPath && (
                  <Button
                    onClick={handleDownload}
                    className="gap-2 bg-white text-blue-700 hover:bg-gray-100"
                  >
                    <Download className="h-4 w-4" />
                    Download Details
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {/* Full Description */}
        {solution.fullDescription && (
          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-bold">About This Solution</h2>
            <p className="leading-relaxed text-gray-700">{solution.fullDescription}</p>
          </div>
        )}

        {/* Key Features */}
        {solution.keyFeatures && solution.keyFeatures.length > 0 && (
          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {solution.keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex gap-3 rounded-lg border border-gray-200 p-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {solution.tags && solution.tags.length > 0 && (
          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-bold">Related Topics</h2>
            <div className="flex flex-wrap gap-2">
              {solution.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Ready to Get Started?</h3>
          <p className="text-gray-700">
            Connect with our team to learn how this solution can address your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {solution.detailsPath && (
              <Button
                onClick={handleDownload}
                className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Download Details
              </Button>
            )}
            <Button
              variant="outline"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
