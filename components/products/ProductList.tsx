'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useSearchParams } from 'next/navigation'; <-- BUNU SİLİYORUZ
import {
  DRESSES_DATA,
  FILTER_OPTIONS,
  FilterCategory
} from '@/lib/data';
// FilterDrawer'ı import ettiğinden emin ol
import FilterDrawer from '../FilterDrawer';

interface ProductListProps {
  activeSlug?: string;
}

const ProductList = ({ activeSlug }: ProductListProps) => {
  const currentSlug = activeSlug;

  // --- FİLTRELEME MANTIĞI ---
  const displayedDresses = currentSlug
    ? DRESSES_DATA.filter((dress) =>
      Object.values(dress.filters).includes(currentSlug)
    )
    : DRESSES_DATA;

  // --- BAŞLIK BULMA ---
  const getActiveLabel = () => {
    if (!currentSlug) return 'Tüm Gelinlik Modellerimiz';

    for (const key in FILTER_OPTIONS) {
      const option = FILTER_OPTIONS[key as FilterCategory].find(opt => opt.id === currentSlug);
      if (option) return `${option.label} Gelinlikler`;
    }
    return 'Gelinlik Modelleri';
  };

  return (
    <section className="py-12 px-4 md:px-6 bg-white min-h-screen">
      <div className="max-w-7xl w-full mx-auto">

        {/* Üst Başlık ve Filtre Butonu */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl font-[family-name:var(--font-dancing)]">
            {getActiveLabel()}
          </h1>

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

          <p className="mx-auto max-w-2xl text-gray-500 mb-6">
            En özel gününüz için özenle tasarlanmış, her tarza hitap eden eşsiz gelinlik modellerimizi keşfedin.
          </p>

          <div className="flex justify-center sm:justify-start">
            <FilterDrawer />
          </div>
        </div>

        {/* --- ÜRÜN LİSTESİ --- */}
        <div className="w-full">
          {displayedDresses.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-y-12">
              {displayedDresses.map((dress) => (
                <Link
                  key={dress.id}
                  href={`/gelinlik-modeli/${dress.id}`}
                  className="group block"
                >
                  <article className="relative">
                    <div className="relative aspect-[3/5] sm:aspect-[3/4] overflow-hidden rounded-md bg-gray-100 shadow-sm">
                      <Image
                        src={dress.image}
                        alt={dress.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover z-10"
                      />
                      {dress.hoverImage && (
                        <Image
                          src={dress.hoverImage}
                          alt={`${dress.name} detay`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="absolute inset-0 object-cover z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      )}

                      {/* Favori Butonu (Minimal) */}
                      <div className="absolute top-3 right-3 z-30">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Ürün Bilgileri */}
                    <div className="mt-4 text-center">
                      <h3 className="text-gray-900 font-playfair font-medium text-lg truncate px-1">
                        {dress.name}
                      </h3>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                        {dress.category}
                      </p>
                      <p className="text-rose-600 font-semibold text-lg mt-1">
                        {dress.price}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg mb-4">Bu kategoride henüz ürünümüz bulunmuyor.</p>
              <Link href="/gelinlik-modelleri" className="text-rose-600 font-medium hover:underline">
                Tüm modellere göz atın
              </Link>
            </div>
          )}
        </div>
      </div>
    </section >
  );
};

export default ProductList;