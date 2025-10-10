"use client"

import { useState } from "react"
import { MapPin, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const LOCATION_DATA = {
  name: "IEM Research Foundation",
  address: "Salt Lake City, Sector V, Kolkata, West Bengal 700091, India",
  coordinates: "22.5726, 88.3639",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1234567890123!2d88.3639!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIxLjQiTiA4OMKwMjEnNTAuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
}

export function ContactMap() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(LOCATION_DATA.address)
      setCopied(true)
      toast({
        title: "Address copied!",
        description: "The address has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy address to clipboard.",
      })
    }
  }

  const handleDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION_DATA.address)}`
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-blue-700" />
        <h3 className="text-lg font-semibold text-gray-900">Our Location</h3>
      </div>

      {/* Interactive Map */}
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        <iframe
          src={LOCATION_DATA.mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="IEM Research Foundation Location"
          className="w-full"
        />
      </div>

      {/* Address Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900">{LOCATION_DATA.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{LOCATION_DATA.address}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAddress}
              className="flex items-center gap-2 bg-transparent"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Address"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDirections}
              className="flex items-center gap-2 bg-transparent"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            <p>Coordinates: {LOCATION_DATA.coordinates}</p>
            <p className="mt-1">Click "Get Directions" to open in Google Maps</p>
          </div>
        </div>
      </div>

      {/* Additional Location Info */}
      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="font-medium text-blue-900 mb-2">Visiting Information</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Located in the heart of Salt Lake City, Sector V</li>
          <li>• Easily accessible by metro and public transport</li>
          <li>• Visitor parking available on campus</li>
          <li>• Please schedule appointments in advance</li>
        </ul>
      </div>
    </div>
  )
}
