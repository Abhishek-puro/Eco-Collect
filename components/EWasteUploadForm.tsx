"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const pointsTable = {
  laptop: { working: 100, "not-working": 75, damaged: 50 },
  mobile: { working: 50, "not-working": 35, damaged: 25 },
  electronics: { working: 75, "not-working": 50, damaged: 35 },
  appliances: { working: 80, "not-working": 60, damaged: 40 },
  computers: { working: 90, "not-working": 70, damaged: 50 },
  other: { working: 60, "not-working": 40, damaged: 30 },
}

export default function EWasteUploadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    condition: "",
    description: "",
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (images.length === 0) {
      setError("Please upload at least one image of your e-waste item.")
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Calculate points based on category and condition
      const category = formData.category.toLowerCase()
      const condition = formData.condition.toLowerCase()
      const pointsAwarded = pointsTable[category]?.[condition] || pointsTable.other[condition]

      // Add the new e-waste item to the user's account
      const user = JSON.parse(localStorage.getItem("ecoUser") || "{}")
      const newEWasteItem = {
        id: Date.now(),
        ...formData,
        images,
        status: "Pending Collection",
        uploadDate: new Date().toISOString(),
        pointsAwarded,
      }
      const updatedEWaste = [...(user.eWaste || []), newEWasteItem]

      const updatedUser = {
        ...user,
        eWaste: updatedEWaste,
        points: (user.points || 0) + pointsAwarded,
      }
      localStorage.setItem("ecoUser", JSON.stringify(updatedUser))

      setLoading(false)
      router.push("/upload-success")
    }, 1500)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input id="itemName" name="itemName" value={formData.itemName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="computers">Computers & Accessories</SelectItem>
                <SelectItem value="mobile">Mobile Devices</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select name="condition" onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="working">Working</SelectItem>
                <SelectItem value="not-working">Not Working</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Images (required)</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB each)</p>
                </div>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
              </label>
            </div>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Uploaded image ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover w-full h-32"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
            {loading ? "Uploading..." : "Upload E-Waste"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

