import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function UploadSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">E-Waste Successfully Uploaded</h1>
        <p className="text-xl mb-2">Thank you for contributing to a greener future!</p>
        
        <div className="flex justify-center space-x-4">
          <Link href="/">
            <Button className="bg-green-500 hover:bg-green-600">Back to Home</Button>
          </Link>
          <Link href="/my-ewaste">
            <Button variant="outline">View My E-Waste</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

