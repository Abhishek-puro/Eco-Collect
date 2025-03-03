import Header from "@/components/Header"
import Footer from "@/components/Footer"
import RewardsFullPage from "@/components/RewardsFullPage"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Rewards & Coupons</h1>
        <RewardsFullPage />
      </main>
      <Footer />
    </div>
  )
}

