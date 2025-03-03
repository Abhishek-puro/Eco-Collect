"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Marketplace from "@/components/Marketplace";
import Rewards from "@/components/Rewards";
import Footer from "@/components/Footer";

// Dynamically import Map with SSR disabled
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <Map />
        <Marketplace />
        <Rewards />
      </main>
      <Footer />
    </div>
  );
}
