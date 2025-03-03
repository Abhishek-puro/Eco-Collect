import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-green-500 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Recycle E-Waste, Earn Rewards</h1>
        <p className="text-xl mb-8">
          Join India's largest e-waste recycling community and make a positive impact on the environment
        </p>
        <Link href="/signup">
          <Button className="bg-white text-green-600 hover:bg-green-100">Get Started</Button>
        </Link>
      </div>
    </section>
  )
}

