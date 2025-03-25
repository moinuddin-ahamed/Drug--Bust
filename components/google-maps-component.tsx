"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Layers, ZoomIn, ZoomOut, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Location {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  type?: string
  status?: string
  suspectCount?: number
}

interface GoogleMapsComponentProps {
  locations: Location[]
  mapType?: "surveillance" | "suspects" | "hotspots"
  height?: string
  onMarkerClick?: (location: Location) => void
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

export function GoogleMapsComponent({
  locations,
  mapType = "surveillance",
  height = "100%",
  onMarkerClick,
}: GoogleMapsComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Load Google Maps script
  useEffect(() => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true)
      return
    }

    const googleMapsScript = document.createElement("script")
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDWCrKMexU9rM6-BTEp6avYHCvteHvaBN8&libraries=places`
    googleMapsScript.async = true
    googleMapsScript.defer = true
    googleMapsScript.onload = () => {
      setMapLoaded(true)
    }
    document.head.appendChild(googleMapsScript)

    return () => {
      // Clean up script if component unmounts before script loads
      document.head.removeChild(googleMapsScript)
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    // Calculate center of all locations or default to India
    let center = { lat: 20.5937, lng: 78.9629 } // Center of India

    if (locations.length > 0) {
      const totalLat = locations.reduce((sum, loc) => sum + loc.coordinates.lat, 0)
      const totalLng = locations.reduce((sum, loc) => sum + loc.coordinates.lng, 0)
      center = {
        lat: totalLat / locations.length,
        lng: totalLng / locations.length,
      }
    }

    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }

    const newMap = new google.maps.Map(mapRef.current, mapOptions)
    setMap(newMap)

    // Clean up
    return () => {
      setMap(null)
    }
  }, [mapLoaded, locations])

  // Add markers
  useEffect(() => {
    if (!map || !locations.length) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create new markers
    const newMarkers = locations.map((location) => {
      // Determine marker icon based on location type
      const icon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: "#FF0000",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#FFFFFF",
        scale: 10,
      }

      if (mapType === "surveillance") {
        if (location.type === "hotspot") {
          icon.fillColor = "#FF0000" // Red
        } else if (location.type === "distribution") {
          icon.fillColor = "#0000FF" // Blue
        } else if (location.type === "entry") {
          icon.fillColor = "#00FF00" // Green
        }
      } else if (mapType === "suspects") {
        icon.fillColor = "#FF0000" // Red for suspects
        icon.scale = location.suspectCount ? Math.min(location.suspectCount * 2, 15) : 10
      } else if (mapType === "hotspots") {
        icon.fillColor = "#FF0000" // Red for hotspots
        icon.fillOpacity = 0.7
        icon.scale = 15
      }

      const marker = new window.google.maps.Marker({
        position: location.coordinates,
        map,
        title: location.name,
        icon,
      })

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px; font-size: 16px;">${location.name}</h3>
            <p style="margin: 0; font-size: 14px;">ID: ${location.id}</p>
            ${location.type ? `<p style="margin: 4px 0 0; font-size: 14px;">Type: ${location.type}</p>` : ""}
            ${location.status ? `<p style="margin: 4px 0 0; font-size: 14px;">Status: ${location.status}</p>` : ""}
            ${location.suspectCount ? `<p style="margin: 4px 0 0; font-size: 14px;">Suspects: ${location.suspectCount}</p>` : ""}
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
        if (onMarkerClick) {
          onMarkerClick(location)
        }
      })

      return marker
    })

    setMarkers(newMarkers)

    // Clean up
    return () => {
      newMarkers.forEach((marker) => marker.setMap(null))
    }
  }, [map, locations, mapType, onMarkerClick])

  // Zoom in function
  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom() || 5
      map.setZoom(currentZoom + 1)
    }
  }

  // Zoom out function
  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom() || 5
      map.setZoom(currentZoom - 1)
    }
  }

  // Change map type
  const handleMapTypeChange = (mapTypeId: google.maps.MapTypeId) => {
    if (map) {
      map.setMapTypeId(mapTypeId)
    }
  }

  // Add new location marker
  const handleAddLocation = (e: google.maps.MapMouseEvent) => {
    if (!map || !e.latLng) return

    const newLocation = {
      id: `NEW-${Date.now()}`,
      name: "New Location",
      coordinates: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
      type: "hotspot",
      status: "active",
    }

    // Here you would typically save this to your database
    console.log("New location added:", newLocation)

    // Add marker for the new location
    if (window.google && window.google.maps) {
      const marker = new window.google.maps.Marker({
        position: newLocation.coordinates,
        map,
        title: newLocation.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "#FF0000",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#FFFFFF",
          scale: 10,
        },
        animation: window.google.maps.Animation.DROP,
      })

      setMarkers([...markers, marker])
    }
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" style={{ height: height }} />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <Layers className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleMapTypeChange(window.google.maps.MapTypeId.ROADMAP)}>
              Road Map
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMapTypeChange(window.google.maps.MapTypeId.SATELLITE)}>
              Satellite
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMapTypeChange(window.google.maps.MapTypeId.HYBRID)}>
              Hybrid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMapTypeChange(window.google.maps.MapTypeId.TERRAIN)}>
              Terrain
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {mapType === "surveillance" && (
          <Button variant="secondary" size="icon" onClick={() => map?.addListener("click", handleAddLocation)}>
            <MapPin className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

