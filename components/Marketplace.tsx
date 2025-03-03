"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Marketplace() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Recycled Products Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard
            image="https://m.media-amazon.com/images/I/510uTHyDqGL.jpg"
            title="Refurbished Laptop"
            price="₹22,999"
            id="1"
          />
          <ProductCard
            image="https://m.media-amazon.com/images/I/61AGSu9b8jL.jpg"
            title="Eco-Friendly Phone Case"
            price="₹1,499"
            id="2"
            requirePhoneDetails={true}
          />
          <ProductCard
            image="https://m.media-amazon.com/images/I/71aNg89O3RL._AC_UF1000,1000_QL80_.jpg"
            title="Recycled Headphones"
            price="₹3,999"
            id="3"
          />
        </div>
        <div className="text-center mt-8">
          <Link href="/marketplace">
            <Button className="bg-green-500 hover:bg-green-600">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ image = "", title = "", price = "", id = "", requirePhoneDetails = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ Fix order state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
    cardNumber: "",
    cvv: "",
    expiry: "",
    phoneBrand: "",
    phoneModel: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill all required fields.");
      return;
    }

    if (requirePhoneDetails && (!formData.phoneBrand || !formData.phoneModel)) {
      alert("Please fill in phone brand and model.");
      return;
    }

    if (formData.paymentMethod === "card" && (!formData.cardNumber || !formData.cvv || !formData.expiry)) {
      alert("Please fill in all card details.");
      return;
    }

    setOrderPlaced(true);
    setTimeout(() => {
      setIsOpen(false); // ✅ Close modal on order success
      setOrderPlaced(false);
      alert("🎉 Order placed successfully!");
    }, 1500);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title || "Product Image"} // ✅ Added default alt text
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{price}</p>
          <Link href="/marketplace">
          <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => setIsOpen(false)}>
            Buy Now
          </Button>
          </Link>
        </div>
      </div>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-lg">
            <DialogTitle>Order Details</DialogTitle>
            {orderPlaced ? (
              <p className="text-green-600 font-bold text-center">🎉 Order placed successfully!</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input name="address" value={formData.address} onChange={handleChange} required />
                </div>

                {requirePhoneDetails && (
                  <>
                    <div>
                      <Label>Phone Brand</Label>
                      <Input name="phoneBrand" value={formData.phoneBrand} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label>Phone Model</Label>
                      <Input name="phoneModel" value={formData.phoneModel} onChange={handleChange} required />
                    </div>
                  </>
                )}

                <div>
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })} // ✅ Fix onValueChange
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Card Payment</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-3">
                    <div>
                      <Label>Card Number</Label>
                      <Input name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>CVV</Label>
                        <Input name="cvv" value={formData.cvv} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label>Expiry Date</Label>
                        <Input name="expiry" value={formData.expiry} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleOrder}>
                  Place Order
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
