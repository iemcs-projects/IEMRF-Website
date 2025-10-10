"use client"

import { ExternalLink } from "lucide-react"
import type { Publication } from "@/lib/research-data"

export function PublicationItem({ pub }: { pub: Publication }) {
  const primaryLink = pub.url || (pub.doi ? `https://doi.org/${pub.doi}` : undefined)
  const doiLink = pub.doi ? `https://doi.org/${pub.doi}` : undefined
  return (
    <li className="py-3 border-b last:border-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <div className="font-medium text-pretty">{pub.title}</div>
          <div className="text-sm text-muted-foreground">
            {pub.authors} · {pub.venue} · {pub.year}
          </div>
          {pub.doi ? <div className="text-xs text-muted-foreground">DOI: {pub.doi}</div> : null}
        </div>
        {primaryLink || doiLink ? (
          <div className="inline-flex items-center gap-3">
            {primaryLink ? (
              <a
                className="inline-flex items-center gap-1 text-blue-700 hover:underline text-sm"
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open publication ${pub.title} in a new tab`}
              >
                <span>View</span>
                <ExternalLink size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
            {pub.url && doiLink ? (
              <a
                className="inline-flex items-center gap-1 text-blue-700 hover:underline text-sm"
                href={doiLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open DOI link for ${pub.title} in a new tab`}
              >
                <span>DOI</span>
                <ExternalLink size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  )
}
