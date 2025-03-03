"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MapFullPage = dynamic(() => import("@/components/MapFullPage"), {
  ssr: false, // Prevents SSR issues
});

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">E-Waste Collection Points in India</h1>
        <MapFullPage />
      </main>
      <Footer />
    </div>
  );
}
