import { MapPin, Recycle, Gift } from "lucide-react"

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MapPin className="h-12 w-12 text-green-500" />}
            title="Locate Collection Points"
            description="Find nearby e-waste collection points across India using our GPS service"
          />
          <FeatureCard
            icon={<Recycle className="h-12 w-12 text-green-500" />}
            title="Track Your Waste"
            description="Monitor the journey of your e-waste and its environmental impact"
          />
          <FeatureCard
            icon={<Gift className="h-12 w-12 text-green-500" />}
            title="Earn Rewards"
            description="Get points for recycling and redeem them for coupons on popular Indian shopping apps"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

