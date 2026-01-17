"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { DRESSES_DATA } from "@/lib/data";
import { use, useState } from "react";
import { ChevronRight, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils"; 

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    const { slug } = use(params);
    const router = useRouter();

    // ID bulma
    const parts = slug.split('-');
    const id = Number(parts[parts.length - 1]);
    const product = DRESSES_DATA.find((p) => p.id === id);

    // Hangi resmin seçili olduğunu tutan state
    const [activeIdx, setActiveIdx] = useState(0);

    if (!product) return notFound();

    const galleryImages = product.images;

    return (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-10 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center text-xs text-gray-500 mb-8 uppercase tracking-wider">
                <Link href="/">Anasayfa</Link> <ChevronRight className="w-3 h-3 mx-2" />

                {/* Geri butonu: Filtreleri korumak için router.back() kullanıyoruz */}
                <button
                    onClick={() => router.back()}
                    className="hover:text-rose-500 transition-colors"
                >
                    GELİNLİKLER
                </button>

                <ChevronRight className="w-3 h-3 mx-2" />
                <span className="text-rose-500 font-bold">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* SOL: GALERİ ALANI (7 COL) */}
                <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">

                    {/* DESKTOP: Sol Dikey Küçük Resimler */}
                    <div className="hidden lg:flex flex-col gap-4 w-24 shrink-0 h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                        {galleryImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIdx(idx)}
                                className={cn(
                                    "relative w-full aspect-[3/4] rounded-md overflow-hidden border-2 transition-all",
                                    activeIdx === idx ? "border-gray-900 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                                )}
                            >
                                <Image src={img} alt="" fill className="object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* ANA RESİM ALANI */}
                    <div className="relative w-full aspect-[3/4] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">

                        {/* MOBILE: Swipe (Kaydırmalı) */}
                        <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory h-full w-full no-scrollbar">
                            {galleryImages.map((img, i) => (
                                <div key={i} className="snap-center shrink-0 w-full h-full relative">
                                    <Image src={img} alt="" fill className="object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* DESKTOP: Tek Büyük Resim (State'e göre değişir) */}
                        <div className="hidden lg:block w-full h-full relative">
                            <Image
                                src={galleryImages[activeIdx]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <button className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-lg hover:text-rose-500 transition-colors z-10">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* SAĞ: DETAYLAR (5 COL) */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="border-b border-gray-100 pb-6 mb-6">
                        <h1 className="text-3xl font-serif text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-500">Ürün Kodu: {product.id}</p>
                    </div>

                    {/* Fiyat Alanı Kaldırıldı */}

                    <div className="bg-rose-50/50 p-6 rounded-xl mb-8 border border-rose-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Tasarım Detayları</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    {/* Filtre Etiketleri */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {product.filters && Object.entries(product.filters).map(([key, val]) => (
                            <span key={key} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md capitalize">
                                {val}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto space-y-3">
                        <Link
                            href="https://wa.me/905555555555"
                            className="block w-full py-4 bg-rose-500 hover:bg-rose-600 text-white text-center rounded-lg font-bold shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1"
                        >
                            WHATSAPP İLE BİLGİ AL
                        </Link>
                        <Link
                            href={'#'}
                            className="block w-full py-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-center text-sm font-bold shadow-md transition-all transform hover:-translate-y-1"
                        >
                            RANDEVU AL
                        </Link>

                    </div>
                </div>
            </div>
        </div >
    );
}