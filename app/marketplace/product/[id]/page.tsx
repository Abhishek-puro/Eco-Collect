"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShoppingCart, Heart, Star, ArrowLeft, Check, Truck, CreditCard, Smartphone } from "lucide-react"

export default function ProductPage({ params }) {
  const router = useRouter()
  const { id } = params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  useEffect(() => {
    // In a real app, fetch product data from an API
    // For demo purposes, we'll use a static product based on ID
    const products = {
      "1": {
        id: "1",
        title: "Refurbished Laptop",
        price: "₹22,999",
        originalPrice: "₹32,999",
        discount: "30% off",
        rating: 4.2,
        reviews: 128,
        description:
          "Fully refurbished laptop with 1-year warranty. Intel Core i5, 8GB RAM, 256GB SSD. Perfect for students and professionals.",
        features: [
          "Intel Core i5 Processor",
          "8GB DDR4 RAM",
          "256GB SSD Storage",
          "15.6-inch Full HD Display",
          "Windows 11 Pre-installed",
          "1-Year Warranty",
        ],
        images: [
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
        ],
        specifications: {
          Processor: "Intel Core i5-10210U",
          RAM: "8GB DDR4",
          Storage: "256GB SSD",
          Display: "15.6-inch Full HD (1920 x 1080)",
          Graphics: "Intel UHD Graphics",
          "Operating System": "Windows 11 Home",
          Battery: "Up to 6 hours",
          Weight: "1.8 kg",
        },
        supplier: {
          name: "TechRefurb India",
          address: "123 Electronics Street, Mumbai, Maharashtra 400001",
          phone: "+91 98765 43210",
        },
      },
    }

    setTimeout(() => {
      setProduct(products[id] || null)
      setLoading(false)
    }, 500)
  }, [id])

  const handleBuyNow = () => {
    setShowPaymentForm(true)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // Process payment (in a real app, this would be handled securely)
    alert("Payment processed successfully!")
    router.push("/order-confirmation")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center py-20">Loading product details...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => router.push("/marketplace")} className="bg-green-500 hover:bg-green-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <Button variant="ghost" className="mb-6" onClick={() => router.push("/marketplace")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === index ? "border-green-500" : "border-transparent"}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">{product.price}</span>
                {product.originalPrice && <span className="text-gray-500 line-through">{product.originalPrice}</span>}
                {product.discount && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.discount}
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600 mt-1">Free shipping across India</p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center gap-2 mt-1">
                <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                />
                <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={handleBuyNow}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {showPaymentForm && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <RadioGroup
                          id="paymentMethod"
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="flex flex-col space-y-1 mt-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex items-center">
                              <Truck className="h-4 w-4 mr-2" />
                              Cash on Delivery
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Credit/Debit Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex items-center">
                              <Smartphone className="h-4 w-4 mr-2" />
                              UPI
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "card" && (
                        <>
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input id="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </>
                      )}

                      {paymentMethod === "upi" && (
                        <div>
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input id="upiId" placeholder="yourname@upi" />
                        </div>
                      )}

                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                        Place Order
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Tabs defaultValue="specifications" className="mt-12">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Info</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-2 border-b">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">{key}</span>
                        <span>{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600">Write a Review</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplier" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Supplier Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {product.supplier.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {product.supplier.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {product.supplier.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

