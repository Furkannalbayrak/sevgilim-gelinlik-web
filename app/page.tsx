import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { getDresses } from "@/lib/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sevgilim Gelinlik | Hayalinizdeki Gelinliği Keşfedin",
  description: "İstanbul Fatih'in en seçkin gelinlik koleksiyonu. Prenses, Balık, A-Kesim ve Helen model gelinlikler, kiralık ve satılık seçenekleriyle mağazamızda.",
  keywords: ["gelinlik modelleri", "fatih gelinlik", "istanbul gelinlik dikimi", "tesettür gelinlik", "prenses model gelinlik 2024"],
  openGraph: {
    title: "Sevgilim Gelinlik - En Şık Gelinlik Modelleri",
    description: "Özel dikim ve hazır model seçenekleriyle en mutlu gününüzde yanınızdayız.",
  }
};

export const dynamic = 'force-dynamic';

export default async function Home() {

  const dresses = await getDresses();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProducts dresses={dresses} />
    </div>
  );
}
