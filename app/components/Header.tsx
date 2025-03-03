import Link from "next/link"
import { Leaf } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-green-600 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">EcoCollect</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="#" className="hover:text-green-200">
            Home
          </Link>
          <Link href="#" className="hover:text-green-200">
            Map
          </Link>
          <Link href="#" className="hover:text-green-200">
            Marketplace
          </Link>
          <Link href="#" className="hover:text-green-200">
            Rewards
          </Link>
        </div>
      </nav>
    </header>
  )
}

