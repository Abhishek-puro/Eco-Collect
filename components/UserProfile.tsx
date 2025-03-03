"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Recycle, ShoppingBag, LogOut } from "lucide-react";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("ecoUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ecoUser");
    router.push("/login");
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        User not found. Please {" "}
        <a href="/login" className="text-green-600 hover:underline">
          login
        </a>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {user.profileImage ? (
                <Image
                  src={user.profileImage || "/placeholder.svg"}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600">
                  <User className="h-16 w-16" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500 mb-2">{user.email}</p>
              {user.mobile && <p className="text-gray-500 mb-4">+91 {user.mobile}</p>}
            </div>

            <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ewaste">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="ewaste">
            <Recycle className="h-4 w-4 mr-2" /> My E-Waste
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="h-4 w-4 mr-2" /> My Orders
          </TabsTrigger>
        </TabsList>

        {/* My E-Waste Section */}
        <TabsContent value="ewaste" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Uploaded E-Waste</CardTitle>
              <CardDescription>Your recently uploaded e-waste items</CardDescription>
            </CardHeader>
            <CardContent>
              {user.eWaste && user.eWaste.length > 0 ? (
                <div className="space-y-4">
                  {user.eWaste.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{item.itemName}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-500">Status: {item.status}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(item.uploadDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4">You haven't uploaded any e-waste yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Orders Section */}
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>Your recent purchases</CardDescription>
            </CardHeader>
            <CardContent>
              {user.orders && user.orders.length > 0 ? (
                <div className="space-y-4">
                  {user.orders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{order.productName}</p>
                        <p className="text-sm text-gray-500">
                          Order Date: {new Date(order.orderDate).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                      </div>
                      <p className="font-bold">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4">You haven't made any purchases yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

