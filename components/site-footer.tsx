"use client"

import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Centered Logo and Description */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center"
            aria-label="IEM Research Foundation - Home"
          >
            <Image
              src="/logo.png"
              alt="IEM Research Foundation Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
          <p className="mt-3 text-sm leading-6 text-gray-300 max-w-2xl mx-auto">
            Fostering innovation, and entrepreneurship
          </p>
        </div>

        {/* Footer Content Grid */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-8">
          {/* Explore section */}
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-white transition-colors duration-200 block">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/startups" className="text-gray-300 hover:text-white transition-colors duration-200 block">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-white transition-colors duration-200 block">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-gray-300 hover:text-white transition-colors duration-200 block">
                  Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-6">Contact</h4>
            <p className="text-sm leading-6 text-gray-300 mb-6">
              Have an idea or want to collaborate? We'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-600 transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} IEM Research Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
