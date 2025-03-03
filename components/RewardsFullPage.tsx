"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Award, Gift } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function RewardsFullPage() {
  const [user, setUser] = useState(null)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("ecoUser") || "{}")
    setUser(userData)
  }, [])

  const coupons = [
    {
      id: "1",
      title: "Flipkart",
      discount: "₹500 off on ₹2500",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e5/07/07/e5070754-4b52-6d56-2f05-8774af0cfd50/AppIcon-fk-0-0-1x_U007epad-0-0-85-220.png/1200x630wa.png",
      points: 200,
    },
    {
      id: "2",
      title: "Amazon India",
      discount: "₹300 off on ₹1500",
      image: "https://pimwp.s3-accelerate.amazonaws.com/2021/12/amazon1-1.jpg",
      points: 150,
    },
    {
      id: "3",
      title: "Myntra",
      discount: "₹400 off on ₹2000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSp8pAJlVf0PF-vukWk0gEv_657YrTm7yDiQ&s",
      points: 180,
    },
    {
      id: "4",
      title: "Swiggy",
      discount: "₹150 off on ₹500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUkhQ1hjGS5AWjD1OMOB4MWUWnsyeO25dcg&s",
      points: 100,
    },
    {
      id: "5",
      title: "Zomato",
      discount: "₹200 off on ₹600",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoPUoQFryjdxoo64fW4VhO5zMkuCFdpKDQQ&s",
      points: 120,
    },
    {
      id: "6",
      title: "BigBasket",
      discount: "₹250 off on ₹1000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKseRLVg8De5C_e6o2SK_6q7W3RFmZdmGzQg&s",
      points: 130,
    },
  ]

  const handleRedeem = (coupon) => {
    if (user.points >= coupon.points) {
      const newToken = generateToken()
      const updatedUser = {
        ...user,
        points: user.points - coupon.points,
        redeemedTokens: [
          ...(user.redeemedTokens || []),
          { couponTitle: coupon.title, token: newToken, points: coupon.points },
        ],
      }
      localStorage.setItem("ecoUser", JSON.stringify(updatedUser))
      setUser(updatedUser)
      alert(`🎉 Coupon Redeemed! Use this Token: ${newToken}`)
    } else {
      setSelectedCoupon(coupon)
      setShowDialog(true)
    }
  }

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 10).toUpperCase()
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">Your Points: {user.points}</h2>
          <p className="text-gray-500">Keep recycling to earn more rewards!</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="coupons">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-6">
          <TabsTrigger value="coupons">
            <ShoppingBag className="h-4 w-4 mr-2" /> Shopping Coupons
          </TabsTrigger>
          <TabsTrigger value="tokens">
            <Gift className="h-4 w-4 mr-2" /> My Tokens
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Award className="h-4 w-4 mr-2" /> Challenges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coupons">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} onRedeem={handleRedeem} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <div className="grid grid-cols-1 gap-4">
            {user.redeemedTokens && user.redeemedTokens.length > 0 ? (
              user.redeemedTokens.map((tokenData, index) => <TokenCard key={index} tokenData={tokenData} />)
            ) : (
              <p className="text-gray-500">No tokens redeemed yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <p>Challenges will be listed here.</p>
        </TabsContent>
      </Tabs>

      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-md">
            <DialogTitle>Insufficient Points</DialogTitle>
            <DialogDescription>
              You need {selectedCoupon?.points - user.points} more points to redeem <b>{selectedCoupon?.title}</b>.
            </DialogDescription>
            <Button onClick={() => setShowDialog(false)}>OK</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function CouponCard({ coupon, onRedeem }) {
  return (
    <Card>
      <CardContent className="p-4 pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={coupon.image || "/placeholder.svg"}
            alt={coupon.title}
            width={60}
            height={60}
            className="rounded-md"
          />
          <div>
            <h3 className="font-bold text-lg">{coupon.title}</h3>
            <p className="text-green-600">{coupon.discount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4">
        <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => onRedeem(coupon)}>
          Redeem for {coupon.points} points
        </Button>
      </CardFooter>
    </Card>
  )
}

function TokenCard({ tokenData }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(tokenData.token)
    alert("Token copied to clipboard!")
  }

  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold">{tokenData.couponTitle}</h3>
          <p className="text-gray-500">Token: {tokenData.token}</p>
          <p className="text-green-600">-{tokenData.points} points</p>
        </div>
        <Button onClick={handleCopy} className="bg-blue-500 hover:bg-blue-600">
          Copy
        </Button>
      </CardContent>
    </Card>
  )
}

