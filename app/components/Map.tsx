"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function Map() {
  const [center] = useState({ lat: 51.505, lng: -0.09 })
  const [zoom] = useState(13)

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Find Collection Points</h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer center={center} zoom={zoom} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
              <Popup>
                E-waste collection point <br /> Open 9 AM - 5 PM
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  )
}

