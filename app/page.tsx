import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero/>
      <FeaturedProducts/>
    </div>
  );
}
