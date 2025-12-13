"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// --- TİP TANIMLAMALARI ---

// Sadece basit kategorilerimiz var
type CategoryKey = "tumu" | "prenses" | "balik" | "a-kesim" | "helen";

type Dress = {
    id: number;
    name: string;
    price: string;
    category: string; // Ekranda görünen kategori ismi
    categoryKey: CategoryKey; // Filtreleme için kullanılan anahtar
    image: string;
    hoverImage: string;
};

// --- VERİLER ---

const categories: { key: CategoryKey; label: string }[] = [
    { key: "tumu", label: "Tümü" },
    { key: "prenses", label: "Prenses Kesim" },
    { key: "balik", label: "Balık Model" },
    { key: "a-kesim", label: "A-Kesim" },
    { key: "helen", label: "Helenistik" },
];

const dresses: Dress[] = [
    {
        id: 1,
        name: "Prenses Kesim Gelinlik",
        price: "12.999 TL",
        category: "Prenses Kesim",
        categoryKey: "prenses",
        image:
            "https://www.yesimgelinlik.com/wp-content/uploads/2022/08/prenses-gelinlik-modeli-33-4056835395.jpg",
        hoverImage: "https://cdn-europe.dugunbuketi.com/media/3260/conversions/header-1-md.jpg"
    },
    {
        id: 2,
        name: "Balık Sırtı Gelinlik",
        price: "14.999 TL",
        category: "Balık Sırtı",
        categoryKey: "balik",
        image:
            "https://alissenuera.com/cdn/shop/files/Alisse-nuerA-Dusuk-Omuzlu-Drapeli-Sade-Helen-Gelinlik-Modeli-Front-Image_2048x.jpg?v=1683900280",
        hoverImage: "https://janroz.com.tr/wp-content/uploads/2025/09/DzSC00580-550x978.jpg"
    },
    {
        id: 3,
        name: "A-Line Gelinlik",
        price: "11.999 TL",
        category: "A-Line",
        categoryKey: "a-kesim",
        image:
            "https://cdn.dsmcdn.com/ty784/product/media/images/20230317/16/306358829/889458153/1/1_org_zoom.jpg",
        hoverImage: "https://janroz.com.tr/wp-content/uploads/2025/04/2J1A3619-2-scaled.jpg"
    },
    {
        id: 4,
        name: "Uzun Kollu Gelinlik",
        price: "16.999 TL",
        category: "Prenses Kesim",
        categoryKey: "prenses",
        image: "https://www.yesimgelinlik.com/wp-content/uploads/2025/01/Urun1-700x1050.jpg",
        hoverImage: "https://www.narinmoda.com/Panel/dashboard/Uploads/Product/Detail/Gallery/Prenses_Gelinlik_1052_1_.jpg"
    },
    {
        id: 5,
        name: "Etek-Ceket Gelinlik",
        price: "15.999 TL",
        category: "Helenistik",
        categoryKey: "helen",
        image:
            "https://medihacambaz.com/cdn/shop/files/luxe-22-el-yapimi-isiltili-prenses-model-gelinlik-mediha-cambaz-bridal-3_800x.jpg?v=1749036785",
        hoverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuCgpsiGOBz7gAzP8cKKpl7K-dsL3RboX0w&s"
    },
    {
        id: 6,
        name: "İnci İşlemeli",
        price: "17.999 TL",
        category: "Prenses Kesim",
        categoryKey: "prenses",
        image:
            "https://www.davetcokelbisemyok.com/media/catalog/product/cache/401798936e1f39ab34bbb19329bd4ca1/g/e/gemma_gelinlik_dhbd.jpg",
        hoverImage: "https://duguntrendy.com/images/gallery_post/big/sirti-acik-gelinlik-modelleri_3.jpg"
    },
];

export default function FeaturedProducts() {
    const router = useRouter();

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
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                    {filteredDresses.map((dress) => (
                        <article
                            key={dress.id}
                            className="group relative cursor-pointer"
                            // Tüm karta tıklayınca detay sayfasına git
                            onClick={() => router.push(`/gelinlik-modeli/${dress.id}`)}
                        >
                            {/* --- RESİM ALANI --- */}
                            <div className="relative aspect-[3/5] sm:aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">

                                {/* 1. ANA RESİM (Zemin) */}
                                <Image
                                    src={dress.image}
                                    alt={dress.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    // priority ekleyerek yükleme gecikmesini önleriz (İlk 4-5 ürün için true olabilir)
                                    className="object-cover z-10"
                                />

                                {/* 2. İKİNCİ RESİM (Perde) */}
                                {dress.hoverImage && (
                                    <Image
                                        src={dress.hoverImage}
                                        alt={`${dress.name} arkası`}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        className="absolute inset-0 object-cover z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-0 ease-linear"
                                    />
                                )}

                                {/* --- AKSİYON BUTONLARI (Sağ Üst) --- */}
                                {/* --- AKSİYON BUTONLARI (Sağ Üst - Sabit ve Minimal) --- */}
                                <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">

                                    {/* Favoriye Ekle */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Favoriye eklendi'); // Buraya toggleFavorite gelecek
                                        }}
                                        // Minimal Tasarım: Sadece beyaz zemin, gri ikon. Hover olunca pembeleşir.
                                        className="bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-rose-500 transition-colors"
                                        title="Favorilere Ekle"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* --- BİLGİ ALANI --- */}
                            <div className="mt-4 text-center group-hover:-translate-y-1 transition-transform duration-300">
                                <h3 className="text-gray-900 font-playfair font-medium text-lg truncate px-2">
                                    {dress.name}
                                </h3>
                                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 mb-2">
                                    {dress.category}
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-rose-600 font-semibold text-lg">{dress.price}</span>
                                </div>
                            </div>
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