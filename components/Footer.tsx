"use client";
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
        </div>
        <div className="mt-8 text-center text-sm">&copy; 2025 EcoCollect India. All rights reserved.</div>
        <div className="mt-8 text-center font-bold text-red-900 cursor-pointer hover:underline text-sm" onClick={() => window.open("", "_blank")}>@ Dev & Ashish.</div>
      </div>
    </footer>
  )
}

