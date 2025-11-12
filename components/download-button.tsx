"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function DownloadButton({ href, label = "Download Details" }: { href: string; label?: string }) {
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



