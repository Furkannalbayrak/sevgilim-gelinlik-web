"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dress } from "@/lib/data";

interface ProductDetailViewProps {
    product: Dress;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
    const router = useRouter();
    const [activeIdx, setActiveIdx] = useState(0);
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollPosition = e.currentTarget.scrollLeft;
        const width = e.currentTarget.offsetWidth;
        const index = Math.round(scrollPosition / width);
        setActiveIdx(index);
    };

    const galleryImages = product.images || [];
    const phoneNumber = "905452984202";
    const message = `Merhaba, ${product.name} (Kod: ${product.id}) modeli hakkında bilgi almak istiyorum.\n\nÜrün linki: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-10 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center text-xs text-gray-500 mb-8 uppercase tracking-wider">
                <Link href="/">Anasayfa</Link> <ChevronRight className="w-3 h-3 mx-2" />

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
                                <Image src={img} alt={`${product.name} Gelinlik Resmi - ${idx + 1}`} fill className="object-cover" sizes="96px" />
                            </button>
                        ))}
                    </div>

                    {/* ANA RESİM ALANI */}
                    <div className="relative w-full aspect-[3/4] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">

                        {/* MOBILE: Swipe (Kaydırmalı) */}
                        <div
                            className="flex lg:hidden overflow-x-auto snap-x snap-mandatory h-full w-full no-scrollbar"
                            onScroll={handleScroll}
                        >
                            {galleryImages.map((img, i) => (
                                <div key={i} className="snap-center shrink-0 w-full h-full relative">
                                    <Image
                                        src={img}
                                        alt={`${product.name} Gelinlik - Mobil Görünüm ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                        priority={i === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {galleryImages.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 lg:hidden pointer-events-none">
                                {galleryImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-300 shadow-sm",
                                            activeIdx === idx ? "w-6 bg-rose-500" : "w-1.5 bg-white/80"
                                        )}
                                    />
                                ))}
                            </div>
                        )}

                        {/* DESKTOP: Tek Büyük Resim (State'e göre değişir) */}
                        <div className="hidden lg:block w-full h-full relative">
                            {galleryImages.length > 0 && (
                                <Image
                                    src={galleryImages[activeIdx]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* SAĞ: DETAYLAR (5 COL) */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="border-b border-gray-100 pb-6 mb-6">
                        <h1 className="text-3xl font-serif text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-500">Ürün Kodu: {product.id}</p>
                    </div>

                    <div className="bg-rose-50/50 p-6 rounded-xl mb-8 border border-rose-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Tasarım Detayları</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    {/* Filtre Etiketleri */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {product.filters && Object.entries(product.filters).map(([key, val]) => (
                            val ? (
                                <span key={key} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md capitalize">
                                    {val}
                                </span>
                            ) : null
                        ))}
                    </div>

                    <div className="mt-auto space-y-3">
                        <Link
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-rose-500 hover:bg-rose-600 text-white text-center rounded-lg font-bold shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1"
                        >
                            WHATSAPP İLE BİLGİ AL
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}