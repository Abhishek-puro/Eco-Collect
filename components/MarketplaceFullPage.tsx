"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, X, Plus, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import Receipt from "@/components/Receipt"

const products = [
  {
    id: "1",
    title: "Refurbished Laptop",
    price: "₹22,999",
    image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg",
    category: "electronics",
    description: "Fully refurbished laptop with 1-year warranty. Intel Core i5, 8GB RAM, 256GB SSD.",
    supplier: "TechRefurb India",
  },
  {
    id: "2",
    title: "Eco-Friendly Phone Case",
    price: "₹1,499",
    image: "https://m.media-amazon.com/images/I/61AGSu9b8jL.jpg",
    category: "accessories",
    description: "Made from 100% recycled materials. Compatible with latest iPhone and Android models.",
    supplier: "GreenCase Solutions",
  },
  {
    id: "4",
    title: "Upcycled Desk Lamp",
    price: "₹2,499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQljJedElkmXC5-fpgiBctwwkgaVJCFQpKu_w&s",
    category: "home",
    description: "Stylish desk lamp made from upcycled electronic components.",
    supplier: "LightCycle Creations",
  },
  {
    id: "5",
    title: "Refurbished Tablet",
    price: "₹12,999",
    image:
      "https://buy.budli.in/cdn/shop/files/CopyofCopyofUntitled36_2f04449a-d180-4e0b-80fa-791bc638ce54.jpg?v=1739621629&width=533",
    category: "electronics",
    description: "10-inch tablet with 64GB storage. Fully tested and refurbished.",
    supplier: "TabletRevive",
  },
  {
    id: "6",
    title: "Recycled Bluetooth Speaker",
    price: "₹2,999",
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230208/odz6/63e3b823aeb26924e360a481/-473Wx593H-4927969110-multi-MODEL.jpg",
    category: "electronics",
    description: "Portable speaker with 10-hour battery life. Made from recycled materials.",
    supplier: "EcoSound Systems",
  },
  {
    id: "7",
    title: "Eco-Friendly Power Bank",
    price: "₹1,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO_693kj5FvlpvY_xxD8I950CyqSGtooaQDbZdciOjIXSVUrSaJZrk-98&s=10",
    category: "accessories",
    description: "10,000mAh power bank made from recycled batteries. Fast charging support.",
    supplier: "GreenPower Solutions",
  },
  {
    id: "8",
    title: "Upcycled Wall Clock",
    price: "₹1,799",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLqR3Zkvin3-bjPqRDV9ZqAEI3-lWJKAfMnClMjy9hYTMCx8dhUy_J5lr&s=10",
    category: "home",
    description: "Unique wall clock made from upcycled circuit boards.",
    supplier: "TechTime Creations",
  },
  {
    id: "9",
    title: "Refurbished Smartphone",
    price: "₹15,999",
    image: "https://finebuy.co.in/wp-content/uploads/2023/05/iphone-12.webp",
    category: "electronics",
    description: "Fully refurbished smartphone with 6-month warranty. 128GB storage.",
    supplier: "MobileRevive India",
  },
  {
    id: "10",
    title: "Recycled Laptop Bag",
    price: "₹2,499",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGRyWZeLz48FLGSFGNhZgJLeYfq9ev-GIfrvXnS5wR5vceFtymvAUL25sL&s=10",
    category: "accessories",
    description: "Durable laptop bag made from recycled plastic bottles. Fits up to 15-inch laptops.",
    supplier: "EcoBags India",
  },
]

export default function MarketplaceFullPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-6 flex-1">
              <Input
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-green-500 hover:bg-green-600">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        {["electronics", "accessories"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts
                .filter((product) => product.category === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    brand: "",
    model: "",
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleOrderSubmit = () => {
    setOrderPlaced(true)

    // Add the order to the user's account
    const user = JSON.parse(localStorage.getItem("ecoUser") || "{}")
    const newOrder = {
      id: Date.now(),
      productName: product.title,
      quantity: quantity,
      unitPrice: Number.parseFloat(product.price.replace("₹", "").replace(",", "")),
      totalAmount: quantity * Number.parseFloat(product.price.replace("₹", "").replace(",", "")),
      orderDate: new Date().toISOString(),
      ...orderDetails,
    }
    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), newOrder],
    }
    localStorage.setItem("ecoUser", JSON.stringify(updatedUser))

    setTimeout(() => {
      setOrderPlaced(false)
      setShowReceipt(true)
    }, 2000)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.price}</p>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          <p className="text-sm text-gray-500 mb-3">Supplier: {product.supplier}</p>
          <Button onClick={() => setIsOpen(true)} className="w-full bg-green-500 hover:bg-green-600">
            Buy Now
          </Button>
        </CardContent>
      </Card>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="p-6">
            <DialogHeader>
              <DialogTitle>Enter Order Details</DialogTitle>
              <Button className="absolute top-2 right-2" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </DialogHeader>

            {orderPlaced ? (
              <p className="text-center text-green-600 font-semibold text-lg">🎉 Order Placed Successfully!</p>
            ) : showReceipt ? (
              <Receipt
                orderDetails={{
                  ...orderDetails,
                  productName: product.title,
                  quantity: quantity,
                  unitPrice: Number.parseFloat(product.price.replace("₹", "").replace(",", "")),
                  totalAmount: quantity * Number.parseFloat(product.price.replace("₹", "").replace(",", "")),
                  orderDate: new Date().toISOString(),
                }}
                onClose={() => {
                  setShowReceipt(false)
                  setIsOpen(false)
                }}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span>Quantity:</span>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  placeholder="Full Name"
                  value={orderDetails.name}
                  onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                  className="mb-3"
                />
                <Input
                  placeholder="Phone Number"
                  value={orderDetails.phone}
                  onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                  className="mb-3"
                />
                <Input
                  placeholder="Address"
                  value={orderDetails.address}
                  onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                  className="mb-3"
                />

                {product.title.toLowerCase().includes("phone case") && (
                  <>
                    <Input
                      placeholder="Phone Brand (e.g., Apple, Samsung)"
                      value={orderDetails.brand}
                      onChange={(e) => setOrderDetails({ ...orderDetails, brand: e.target.value })}
                      className="mb-3"
                    />
                    <Input
                      placeholder="Phone Model (e.g., iPhone 13, Galaxy S21)"
                      value={orderDetails.model}
                      onChange={(e) => setOrderDetails({ ...orderDetails, model: e.target.value })}
                      className="mb-3"
                    />
                  </>
                )}

                <div className="mb-3">
                  <label className="block text-sm font-semibold">Payment Method</label>
                  <select
                    value={orderDetails.paymentMethod}
                    onChange={(e) => setOrderDetails({ ...orderDetails, paymentMethod: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Card Payment</option>
                  </select>
                </div>

                <DialogFooter>
                  <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleOrderSubmit}>
                    Place Order
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

