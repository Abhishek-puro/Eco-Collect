import Header from "@/components/Header"
import Footer from "@/components/Footer"
import EWasteUploadForm from "@/components/EWasteUploadForm"

export default function UploadEWastePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload Your E-Waste</h1>
        <EWasteUploadForm />
      </main>
      <Footer />
    </div>
  )
}

