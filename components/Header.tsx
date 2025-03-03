"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Leaf, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("ecoUser")
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-green-600 text-white sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Leaf className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">EcoCollect</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-green-200">
            Home
          </Link>
          <Link href="/map" className="hover:text-green-200">
            Map
          </Link>
          <Link href="/marketplace" className="hover:text-green-200">
            Marketplace
          </Link>
          <Link href="/rewards" className="hover:text-green-200">
            Rewards
          </Link>
          <Link href="/upload-ewaste" className="hover:text-green-200">
            Upload E-Waste
          </Link>

          {isLoggedIn ? (
            <Link href="/account">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-green-700">
                <User className="h-4 w-4 mr-2" />
                My Account
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-green-700">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" className="text-white p-1" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-700 py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-3">
            <Link href="/" className="hover:text-green-200" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link href="/map" className="hover:text-green-200" onClick={toggleMobileMenu}>
              Map
            </Link>
            <Link href="/marketplace" className="hover:text-green-200" onClick={toggleMobileMenu}>
              Marketplace
            </Link>
            <Link href="/rewards" className="hover:text-green-200" onClick={toggleMobileMenu}>
              Rewards
            </Link>
            <Link href="/upload-ewaste" className="hover:text-green-200" onClick={toggleMobileMenu}>
              Upload E-Waste
            </Link>

            {isLoggedIn ? (
              <Link href="/account" onClick={toggleMobileMenu}>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-green-700 w-full">
                  <User className="h-4 w-4 mr-2" />
                  My Account
                </Button>
              </Link>
            ) : (
              <Link href="/login" onClick={toggleMobileMenu}>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-green-700 w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

