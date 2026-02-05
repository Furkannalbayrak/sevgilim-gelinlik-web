"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Dress } from "@/lib/data";

// --- TİP TANIMLAMALARI ---

type CategoryKey = "tumu" | "prenses" | "balik" | "a-kesim" | "helen";

const categories: { key: CategoryKey; label: string }[] = [
    { key: "tumu", label: "Tümü" },
    { key: "prenses", label: "Prenses Kesim" },
    { key: "balik", label: "Balık Model" },
    { key: "a-kesim", label: "A-Kesim" },
    { key: "helen", label: "Helenistik" },
];

interface FeaturedProductsProps {
    dresses: Dress[];
}

export default function FeaturedProducts({ dresses }: FeaturedProductsProps) {
    const [activeTab, setActiveTab] = useState<CategoryKey>("tumu");

    // Seçili sekmeye göre ürünleri filtrele
    const filteredDresses =
        activeTab === "tumu"
            ? dresses
            : dresses.filter((dress) => dress.categoryKey === activeTab);

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-8">
                {/* Başlık */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl font-[family-name:var(--font-dancing)]">
                        Öne Çıkan Tasarımlar
                    </h2>

                    {/* Dekoratif Çizgi */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-28 bg-gradient-to-r from-transparent to-rose-400"></div>
                        <div className="text-rose-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <div className="h-[1px] w-28 bg-gradient-to-l from-transparent to-rose-400"></div>
                    </div>

                    <p className="mx-auto max-w-2xl text-gray-500">
                        En özel gününüz için özenle tasarlanmış, her tarza hitap eden eşsiz gelinlik modellerimizi keşfedin.
                    </p>
                </div>

                {/* Tab (Sekme) Menüsü */}
                <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveTab(cat.key)}
                            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 md:text-base ${activeTab === cat.key
                                ? "bg-rose-400 text-white shadow-md shadow-rose-200"
                                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Ürün Listesi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 lg:gap-y-12">
                    {filteredDresses.map((dress) => (
                        <article
                            key={dress.id}
                            className="group relative"
                        >
                            <Link
                                href={`/gelinlik/${dress.slug}-${dress.id}`}
                                className="group block h-full cursor-pointer"
                            >

                                {/* --- RESİM ALANI --- */}
                                <div className="relative aspect-[3/5] sm:aspect-[3/4] overflow-hidden rounded-md bg-gray-100">

                                    {/* 1. ANA RESİM (Zemin) */}
                                    <Image
                                        src={dress.images[0]}
                                        alt={dress.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        // priority ekleyerek yükleme gecikmesini önleriz (İlk 4-5 ürün için true olabilir)
                                        className="object-cover z-10"
                                    />

                                    {/* 2. İKİNCİ RESİM (Perde) */}
                                    {dress.images[1] && (
                                        <Image
                                            src={dress.images[1]}
                                            alt={`${dress.name} arkası`}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                            className="absolute inset-0 object-cover z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-0 ease-linear"
                                        />
                                    )}
                                </div>

                                {/* --- BİLGİ ALANI --- */}
                                <div className="mt-4 text-center group-hover:-translate-y-1 transition-transform duration-300">
                                    <h3 className="text-gray-900 font-playfair font-medium text-lg truncate px-2">
                                        {dress.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 mb-2">
                                        {dress.category}
                                    </p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Alt Buton */}
                <div className="mt-12 md:mt-16 text-center">
                    <Link
                        href="/gelinlik-modelleri"
                        className="group inline-flex items-center gap-2 rounded-full border border-rose-400 px-6 py-2.5 text-sm font-medium text-rose-500 transition-all duration-300 hover:bg-rose-400 hover:text-white hover:shadow-lg md:border-2 md:px-8 md:py-3 md:text-lg"
                    >
                        Tüm Koleksiyonu Görüntüle
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}