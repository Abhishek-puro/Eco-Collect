import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Recycled Products Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard 
            image="https://m.media-amazon.com/images/I/510uTHyDqGL.jpg" 
            title="Refurbished Laptop" 
            price="$299" 
          />
          <ProductCard 
            image="/placeholder.svg?height=200&width=200" 
            title="Eco-Friendly Phone Case" 
            price="$19" 
          />
          <ProductCard 
            image="/placeholder.svg?height=200&width=200" 
            title="Recycled Headphones" 
            price="$49" 
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ image, title, price }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{price}</p>
        <Button className="w-full bg-green-500 hover:bg-green-600">Buy Now</Button>
      </div>
    </div>
  );
}

