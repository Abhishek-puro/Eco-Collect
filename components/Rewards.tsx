import { Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Rewards() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Earn Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RewardCard
            icon={<Star className="h-12 w-12 text-yellow-400" />}
            title="Recycle E-Waste"
            points="50 points"
          />
          <RewardCard
            icon={<Star className="h-12 w-12 text-yellow-400" />}
            title="Refer a Friend"
            points="100 points"
          />
          <RewardCard
            icon={<Star className="h-12 w-12 text-yellow-400" />}
            title="Complete Challenges"
            points="200 points"
          />
        </div>
        <div className="text-center mt-8">
          <Link href="/rewards">
            <Button className="bg-green-500 hover:bg-green-600">View All Rewards</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function RewardCard({ icon, title, points }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-green-600 font-bold">{points}</p>
    </div>
  )
}

