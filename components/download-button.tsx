"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type Props = {
  href?: string
  label?: string
  onClick?: (e?: any) => void
}

export function DownloadButton({ href, label = "Download Details", onClick }: Props) {
  // If an onClick handler is provided, render a button that triggers it.
  if (onClick) {
    return (
      <Button onClick={onClick} variant="outline" className="w-full flex items-center gap-2 hover:shadow-sm">
        <Download className="h-4 w-4" />
        {label}
      </Button>
    )
  }

  // Fallback: render an anchor that downloads the href when clicked.
  return (
    <Button asChild variant="outline" className="w-full flex items-center gap-2 hover:shadow-sm">
      <a href={href} download>
        <Download className="h-4 w-4" />
        {label}
      </a>
    </Button>
  )
}

export default DownloadButton



