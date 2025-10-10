"use client"

import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* ✅ Logo and description */}
          <div>
            <Link
              href="/"
              className="flex items-center"
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
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Fostering innovation, entrepreneurship, and societal benefit across
              Eastern India and beyond.
            </p>
          </div>

          {/* ✅ Explore section */}
          <div>
            <h4 className="text-white font-medium">Explore</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/programs" className="hover:text-gray-300">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-gray-300">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-gray-300">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-gray-300">
                  Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ Contact section */}
          <div>
            <h4 className="text-white font-medium">Contact</h4>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Have an idea or want to collaborate? We’d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* ✅ Bottom line */}
        <div className="mt-8 text-xs text-gray-400">
          © {new Date().getFullYear()} IEM Research Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
