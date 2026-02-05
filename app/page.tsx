import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { getDresses } from "@/lib/supabase";

export default async function Home() {

  const dresses = await getDresses();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero/>
      <FeaturedProducts dresses={dresses}/>
    </div>
  );
}
