"use client"

import { useState } from "react"
import Link from "next/link"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Button } from "@/components/ui/button"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

export default function Map() {
  // Center coordinates for India
  const [center] = useState({ lat: 20.5937, lng: 78.9629 })
  const [zoom] = useState(5)

  // Sample e-waste collection points in major Indian cities
  const collectionPoints = [
    {
      id: 1,
      name: "Delhi E-Waste Center",
      position: [28.6139, 77.209],
      address: "Nehru Place, New Delhi",
      hours: "9 AM - 6 PM",
    },
    {
      id: 2,
      name: "Mumbai Recycling Hub",
      position: [19.076, 72.8777],
      address: "Andheri East, Mumbai",
      hours: "8 AM - 5 PM",
    },
    {
      id: 3,
      name: "Bangalore Green Point",
      position: [12.9716, 77.5946],
      address: "Electronic City, Bangalore",
      hours: "9 AM - 7 PM",
    },
    {
      id: 4,
      name: "Chennai E-Collection",
      position: [13.0827, 80.2707],
      address: "Anna Nagar, Chennai",
      hours: "10 AM - 6 PM",
    },
    {
      id: 5,
      name: "Hyderabad Recycle Hub",
      position: [17.385, 78.4867],
      address: "Hitech City, Hyderabad",
      hours: "9 AM - 5 PM",
    },
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Find Collection Points in India</h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer center={center} zoom={zoom} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {collectionPoints.map((point) => (
              <Marker key={point.id} position={point.position}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold">{point.name}</h3>
                    <p>{point.address}</p>
                    <p>Hours: {point.hours}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="text-center mt-6">
          <Link href="/map">
            <Button className="bg-green-500 hover:bg-green-600">View Full Map</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

