"use client"

import { GoogleMapsComponent } from "@/components/google-maps-component"

export function MapComponent() {
  const locations = [
    {
      id: "LOC-1001",
      name: "Mumbai Central",
      coordinates: { lat: 19.076, lng: 72.8777 },
      type: "hotspot",
      status: "active",
      suspectCount: 5,
    },
    {
      id: "LOC-1002",
      name: "Delhi NCR Hub",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      type: "distribution",
      status: "active",
      suspectCount: 3,
    },
    {
      id: "LOC-1003",
      name: "Kolkata East",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      type: "hotspot",
      status: "monitoring",
      suspectCount: 2,
    },
  ]

  return (
    <div className="w-full h-full">
      <GoogleMapsComponent locations={locations} />
    </div>
  )
}

