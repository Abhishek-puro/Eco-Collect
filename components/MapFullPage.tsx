"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

// Sample supplier data
const suppliers = [
  {
    id: 1,
    name: "EcoTech Recyclers",
    position: [28.6139, 77.209],
    address: "123 Green Street, New Delhi",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Mumbai E-Waste Solutions",
    position: [19.076, 72.8777],
    address: "456 Recycle Road, Mumbai",
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Bangalore Green Electronics",
    position: [12.9716, 77.5946],
    address: "789 E-Waste Avenue, Bangalore",
    phone: "+91 98765 43212",
  },
  {
    id: 4,
    name: "Chennai Recycle Hub",
    position: [13.0827, 80.2707],
    address: "101 Sustainable Lane, Chennai",
    phone: "+91 98765 43213",
  },
]

export default function MapFullPage() {
  const [center] = useState({ lat: 20.5937, lng: 78.9629 })
  const [zoom] = useState(5)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const clickedLat = e.latlng.lat
        const clickedLng = e.latlng.lng
        const nearestSupplier = suppliers.reduce(
          (nearest, supplier) => {
            const [lat, lng] = supplier.position
            const distance = Math.sqrt(Math.pow(lat - clickedLat, 2) + Math.pow(lng - clickedLng, 2))
            return distance < nearest.distance ? { ...supplier, distance } : nearest
          },
          { distance: Number.POSITIVE_INFINITY },
        )
        setSelectedSupplier(nearestSupplier)
      },
    })
    return null
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search suppliers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-green-500 hover:bg-green-600">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="h-[600px] rounded-lg overflow-hidden shadow-md">
        <MapContainer center={center} zoom={zoom} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredSuppliers.map((supplier) => (
            <Marker key={supplier.id} position={supplier.position}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold">{supplier.name}</h3>
                  <p>{supplier.address}</p>
                  <p>Phone: {supplier.phone}</p>
                  <Link href={`/supplier/${supplier.id}`}>
                    <Button className="mt-2 bg-green-500 hover:bg-green-600">View Details</Button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapClickHandler />
        </MapContainer>
      </div>

      {selectedSupplier && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">{selectedSupplier.name}</h3>
            <p className="mb-1">{selectedSupplier.address}</p>
            <p className="mb-2">Phone: {selectedSupplier.phone}</p>
            <Link href={`/supplier/${selectedSupplier.id}`}>
              <Button className="bg-green-500 hover:bg-green-600">View Supplier Details</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{supplier.name}</h3>
              <p className="text-gray-600">{supplier.address}</p>
              <p className="text-sm">Phone: {supplier.phone}</p>
              <Link href={`/supplier/${supplier.id}`}>
                <Button className="mt-2 bg-green-500 hover:bg-green-600">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

