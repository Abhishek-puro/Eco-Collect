import { Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">EcoCollect</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-200">
              About
            </a>
            <a href="#" className="hover:text-green-200">
              Privacy
            </a>
            <a href="#" className="hover:text-green-200">
              Terms
            </a>
            <a href="#" className="hover:text-green-200">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">&copy; 2025 EcoCollect. All rights reserved.</div>
      </div>
    </footer>
  )
}

