"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/research", label: "Research" },
  { href: "/startups", label: "Startups" },
  { href: "/blog", label: "Blog" },
  { href: "/partners", label: "Partners" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/internship", label: "Internship" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b bg-gray-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* ✅ Logo only */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="IEM Research Foundation - Home"
        >
          <Image
            src="/logo.png"   // place logo.png inside your /public folder
            alt="IEM Research Foundation Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-3" aria-label="Primary">
          <Link href="/" className="rounded px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800">Home</Link>
          {/* About dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`rounded px-3 py-2 text-sm ${['/about','/partners','/gallery','/news'].includes(pathname) ? 'bg-gray-800 text-white' : 'text-gray-200 hover:text-white hover:bg-gray-800'}`}>About</DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-56 rounded-md border bg-white p-2 text-gray-900">
              <Link href="/about" className={`block rounded px-3 py-2 text-sm ${pathname==='/about' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>About IEMRF</Link>
              <Link href="/partners" className={`block rounded px-3 py-2 text-sm ${pathname==='/partners' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Partners</Link>
              <Link href="/gallery" className={`block rounded px-3 py-2 text-sm ${pathname==='/gallery' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Gallery</Link>
              <Link href="/news" className={`block rounded px-3 py-2 text-sm ${pathname==='/news' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>News</Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Programs dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`rounded px-3 py-2 text-sm ${['/programs','/mentorship','/internship','/research'].includes(pathname) ? 'bg-gray-800 text-white' : 'text-gray-200 hover:text-white hover:bg-gray-800'}`}>Programs</DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-56 rounded-md border bg-white p-2 text-gray-900">
              <Link href="/programs" className={`block rounded px-3 py-2 text-sm ${pathname==='/programs' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Programs</Link>
              <Link href="/mentorship" className={`block rounded px-3 py-2 text-sm ${pathname==='/mentorship' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Mentorship</Link>
              <Link href="/internship" className={`block rounded px-3 py-2 text-sm ${pathname==='/internship' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Internships</Link>
              <Link href="/research" className={`block rounded px-3 py-2 text-sm ${pathname==='/research' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Products & Innovations</Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Community dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`rounded px-3 py-2 text-sm ${['/events','/startups','/blog'].includes(pathname) ? 'bg-gray-800 text-white' : 'text-gray-200 hover:text-white hover:bg-gray-800'}`}>Community</DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-56 rounded-md border bg-white p-2 text-gray-900">
              <Link href="/events" className={`block rounded px-3 py-2 text-sm ${pathname==='/events' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Events</Link>
              <Link href="/startups" className={`block rounded px-3 py-2 text-sm ${pathname==='/startups' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Startups</Link>
              <Link href="/blog" className={`block rounded px-3 py-2 text-sm ${pathname==='/blog' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>Blog</Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact" className="rounded px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800">Contact</Link>
        </div>

        <button
          className="md:hidden rounded p-2 hover:bg-gray-800"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-700">
          <nav
            className="mx-auto flex max-w-6xl flex-col px-4 py-2"
            aria-label="Mobile"
          >
            {navLinks.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-gray-800 hover:text-white",
                  )}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
