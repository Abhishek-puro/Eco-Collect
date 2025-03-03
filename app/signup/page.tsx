import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SignupForm from "@/components/SignupForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <SignupForm />
      </main>
      <Footer />
    </div>
  )
}

