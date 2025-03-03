"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function MyEWastePage() {
  const [eWasteItems, setEWasteItems] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ecoUser") || "{}")
    setEWasteItems(user.eWaste || [])
  }, [])

  const handleDelete = (id) => {
    const user = JSON.parse(localStorage.getItem("ecoUser") || "{}")
    const updatedEWaste = user.eWaste.filter((item) => item.id !== id)
    const updatedUser = { ...user, eWaste: updatedEWaste }
    localStorage.setItem("ecoUser", JSON.stringify(updatedUser))
    setEWasteItems(updatedEWaste)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">My Uploaded E-Waste</h1>
        {eWasteItems.length > 0 ? (
          <div className="grid gap-6">
            {eWasteItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{item.itemName}</h2>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="text-sm mt-2">
                      Status: <span className="font-medium">{item.status}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded on: {new Date(item.uploadDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl mb-4">You haven't uploaded any e-waste yet.</p>
            <Link href="/upload-ewaste">
              <Button className="bg-green-500 hover:bg-green-600">Upload E-Waste</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

