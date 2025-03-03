"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Correct handling of dynamic params
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone } from "lucide-react";

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
};

type Supplier = {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  rating: number;
  reviews: Review[];
};

export default function SupplierPage() {
  const params = useParams(); // ✅ Correct way to get dynamic route params
  const id = params?.id as string; // Ensure `id` is a string

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const mockSuppliers: Supplier[] = [
      {
        id: "1",
        name: "EcoTech Recyclers",
        address: "123 Green Street, New Delhi",
        phone: "+91 98765 43210",
        description: "Leading e-waste recycling company with state-of-the-art facilities.",
        rating: 4.5,
        reviews: [
          { id: 1, user: "Amit S.", rating: 5, comment: "Excellent service and very professional team." },
          { id: 2, user: "Priya R.", rating: 4, comment: "Good experience overall. Quick and efficient." },
        ],
      },
      {
        id: "2",
        name: "Mumbai E-Waste Solutions",
        address: "456 Recycle Road, Mumbai",
        phone: "+91 98765 43211",
        description: "Eco-friendly e-waste management service in Mumbai.",
        rating: 4.3,
        reviews: [
          { id: 3, user: "Ravi K.", rating: 4, comment: "Smooth process, but pickup was slightly delayed." },
          { id: 4, user: "Neha M.", rating: 5, comment: "Super fast and responsible recycling service!" },
        ],
      },
      {
        id: "3",
        name: "Bangalore Green Electronics",
        address: "789 E-Waste Avenue, Bangalore",
        phone: "+91 98765 43212",
        description: "Sustainable and certified e-waste disposal service in Bangalore.",
        rating: 4.7,
        reviews: [
          { id: 5, user: "Vikas T.", rating: 5, comment: "Highly professional and eco-friendly service!" },
          { id: 6, user: "Sanya D.", rating: 4, comment: "Good experience, but could improve customer support." },
        ],
      },
      {
        id: "4",
        name: "Chennai Recycle Hub",
        address: "101 Sustainable Lane, Chennai",
        phone: "+91 98765 43213",
        description: "Chennai's leading e-waste recycling and reuse center.",
        rating: 4.4,
        reviews: [
          { id: 7, user: "Arjun P.", rating: 5, comment: "Fantastic service, very responsible team!" },
          { id: 8, user: "Meera J.", rating: 4, comment: "Quick service, but slightly expensive." },
        ],
      },
    ];

    // Find supplier by ID
    const foundSupplier = mockSuppliers.find((s) => s.id === id);

    setTimeout(() => {
      setSupplier(foundSupplier || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center py-20 text-lg font-medium text-gray-700">
            Loading supplier details...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center py-20 text-lg font-medium text-red-500">
            Supplier not found
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Supplier Card */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{supplier.name}</h1>

            {/* Star Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill={i < Math.floor(supplier.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{supplier.rating.toFixed(1)}</span>
            </div>

            <p className="text-gray-600 mb-4">{supplier.description}</p>

            {/* Address & Contact */}
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              <span>{supplier.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-gray-500" />
              <span>{supplier.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-4">
          {supplier.reviews.map((review) => (
            <Card key={review.id} className="shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{review.user}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>

       
        <div className="mt-8 text-center">
          <Button className="bg-green-500 hover:bg-green-600 px-6 py-2 text-white font-semibold">
            Contact Supplier
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
