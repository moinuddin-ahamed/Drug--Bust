"use client"

import { useEffect, useRef } from "react"

interface Location {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  suspectCount?: number
}

interface GoogleMapsComponentProps {
  locations: Location[]
  mapType?: "surveillance" | "suspects" | "hotspots"
  height?: string
}

declare global {
  interface Window {
    google: any
  }
}

const GoogleMapsComponent = ({ locations, mapType, height }: GoogleMapsComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadMap = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 }, // Default to India
          zoom: 5,
        })

        locations.forEach((location) => {
          const marker = new window.google.maps.Marker({
            position: location.coordinates,
            map: map,
            title: location.name,
          })

          const infowindow = new window.google.maps.InfoWindow({
            content: `<div>${location.name}</div>`,
          })

          marker.addListener("click", () => {
            infowindow.open(map, marker)
          })
        })
      }
    }

    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDWCrKMexU9rM6-BTEp6avYHCvteHvaBN8`
      script.async = true
      script.defer = true
      script.onload = loadMap
      document.head.appendChild(script)
    } else {
      loadMap()
    }

    return () => {
      const scripts = document.getElementsByTagName("script")
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes("maps.googleapis.com")) {
          scripts[i].remove()
        }
      }
    }
  }, [locations])

  return <div ref={mapRef} style={{ height: height || "400px", width: "100%" }} />
}

export default GoogleMapsComponent

