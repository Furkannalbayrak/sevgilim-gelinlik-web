'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Next.js router hook'ları
import Link from 'next/link';

type FilterCategory = 'etekTipi' | 'yakaTipi' | 'kolTipi' | 'kumas' | 'konsept';

interface Dress {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  filters: Record<FilterCategory, string>;
}

interface FilterOption {
  id: string;
  label: string;
}

// Filtre state'inin tipi: Her kategori string dizisi tutar
type SelectedFilters = Record<FilterCategory, string[]>;

// --- STATİK VERİLER ---
const FILTER_LABELS: Record<FilterCategory, string> = {
  etekTipi: 'Etek Tipi',
  yakaTipi: 'Yaka Tipi',
  kolTipi: 'Kol Tipi',
  kumas: 'Kumaş',
  konsept: 'Tasarım',
};

const URL_MAP: Record<string, FilterCategory> = {
  'etek-tipi': 'etekTipi',
  'yaka-tipi': 'yakaTipi',
  'kol-tipi': 'kolTipi',
  'kumas': 'kumas',
  'tarzlar': 'konsept',
};

const FILTER_OPTIONS: Record<FilterCategory, FilterOption[]> = {
  etekTipi: [
    { id: 'prenses', label: 'Prenses' }, { id: 'a-kesim', label: 'A Kesim' },
    { id: 'helen', label: 'Helen' }, { id: 'balik', label: 'Balık' },
    { id: 'kisa', label: 'Kısa' }, { id: 'kabarik', label: 'Kabarık' }
  ],
  yakaTipi: [
    { id: 'kayik-yaka', label: 'Kayık Yaka' }, { id: 'v-yaka', label: 'V Yaka' },
    { id: 'kalp-yaka', label: 'Kalp Yaka' }, { id: 'askili', label: 'Askılı' }
  ],
  kolTipi: [
    { id: 'uzun-kollu', label: 'Uzun Kollu' }, { id: 'yarim-kollu', label: 'Yarım Kollu' },
    { id: 'kolsuz', label: 'Kolsuz' }, { id: 'dusuk-omuz', label: 'Düşük Omuz' }
  ],
  kumas: [
    { id: 'dantelli', label: 'Dantelli' }, { id: 'tul', label: 'Tül' },
    { id: 'saten', label: 'Saten' }, { id: 'sifon', label: 'Sifon' }
  ],
  konsept: [
    { id: 'bohem', label: 'Bohem' }, { id: 'vintage', label: 'Vintage' },
    { id: 'modern', label: 'Modern' }, { id: 'zarif', label: 'Zarif' }
  ]
};

const DRESSES_DATA: Dress[] = [
  { 
    id: 1, 
    name: 'Prenses Kesim Gelinlik', 
    price: '12.999 TL', 
    category: 'Prenses Kesim', 
    image: 'https://www.yesimgelinlik.com/wp-content/uploads/2022/08/prenses-gelinlik-modeli-33-4056835395.jpg', 
    filters: { etekTipi: 'prenses', yakaTipi: 'v-yaka', kolTipi: 'kolsuz', kumas: 'dantelli', konsept: 'bohem' } 
  },
  { 
    id: 2, 
    name: 'Balık Sırtı Gelinlik', 
    price: '14.999 TL', 
    category: 'Balık Sırtı', 
    image: 'https://alissenuera.com/cdn/shop/files/Alisse-nuerA-Dusuk-Omuzlu-Drapeli-Sade-Helen-Gelinlik-Modeli-Front-Image_2048x.jpg', 
    filters: { etekTipi: 'balik-sirti', yakaTipi: 'halka-yaka', kolTipi: 'uzun-kollu', kumas: 'sifon', konsept: 'modern' } 
  },
  // ... diğer verilerin buraya gelecek
];

// --- ALT BİLEŞEN (Props tip tanımlaması ile) ---
interface ProductCardProps {
  dress: Dress;
}

const ProductCard: React.FC<ProductCardProps> = ({ dress }) => (
  <Link href={`/gelinlik-modeli/${dress.id}`} className="group cursor-pointer rounded-lg overflow-hidden transition-shadow duration-300 block">
    <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
      {/* İleride buraya Next.js <Image /> componenti eklenebilir, şimdilik img kullanıyoruz */}
      <img 
        src={dress.image} 
        alt={dress.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
    </div>
    <div className="pt-3 pb-5">
      <h3 className="text-sm sm:text-lg font-semibold text-gray-800">{dress.name}</h3>
      <p className="text-xs sm:text-sm text-gray-500">{dress.category}</p>
      <p className="text-sm font-bold text-rose-800 mt-1">{dress.price}</p>
    </div>
  </Link>
);

// --- ANA BİLEŞEN ---
const ProductList = () => {
  const params = useParams(); // URL parametrelerini alır (örn: /kategori/model)
  
  const initialFilters: SelectedFilters = { 
    etekTipi: [], yakaTipi: [], kolTipi: [], kumas: [], konsept: [] 
  };
  
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialFilters);
  const [openFilter, setOpenFilter] = useState<FilterCategory | null>(null);

  // URL Parametrelerini Dinle
  useEffect(() => {
    // Next.js'de params değerleri string veya string[] olabilir, kontrol ediyoruz.
    const categoryParam = Array.isArray(params?.category) ? params.category[0] : params?.category;
    const modelParam = Array.isArray(params?.modelName) ? params.modelName[0] : params?.modelName;

    if (categoryParam && modelParam && URL_MAP[categoryParam]) {
      const filterKey = URL_MAP[categoryParam];
      setSelectedFilters({ 
        ...initialFilters, 
        [filterKey]: [modelParam] 
      });
    } else {
      setSelectedFilters(initialFilters);
    }
  }, [params]);

  // Filtreleme Mantığı
  const filteredDresses = useMemo(() => {
    return DRESSES_DATA.filter(dress =>
      (Object.entries(selectedFilters) as [FilterCategory, string[]][]).every(([key, values]) =>
        values.length === 0 || values.includes(dress.filters[key])
      )
    );
  }, [selectedFilters]);

  // Event handler tipleri (opsiyonel ama iyi pratik)
  const toggleFilter = (type: FilterCategory, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(v => v !== value) 
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => setSelectedFilters(initialFilters);
  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <section className="py-28 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-playfair font-semibold text-gray-800 mb-2">Tüm Gelinlik Modellerimiz</h2>
          <div className="w-24 h-1 bg-rose-300 mx-auto rounded-full"></div>
        </div>

        {/* Filtre Butonları */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-20">
          {(Object.entries(FILTER_LABELS) as [FilterCategory, string][]).map(([key, label]) => (
            <div key={key} className="relative">
              <button
                onClick={() => setOpenFilter(openFilter === key ? null : key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  selectedFilters[key].length > 0 
                    ? 'bg-rose-50 border-rose-200 text-rose-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
                {selectedFilters[key].length > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {selectedFilters[key].length}
                  </span>
                )}
                <svg className={`w-4 h-4 transition-transform ${openFilter === key ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown */}
              {openFilter === key && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpenFilter(null)} />
                  <div className="absolute z-20 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 left-0 sm:left-auto">
                    <div className="max-h-60 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-rose-200">
                      {FILTER_OPTIONS[key].map((opt) => (
                        <label key={opt.id} className="flex items-center px-3 py-2 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors select-none">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-rose-500 focus:ring-rose-200"
                            checked={selectedFilters[key].includes(opt.id)}
                            onChange={() => toggleFilter(key, opt.id)}
                          />
                          <span className="ml-3 text-sm text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-rose-600 underline underline-offset-2 ml-2">
              Temizle
            </button>
          )}
        </div>

        {/* Sonuç Bilgisi */}
        <p className="text-gray-500 mb-6 font-light">
          {filteredDresses.length} tasarım listeleniyor
        </p>
        
        {/* Ürün Listesi */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredDresses.map(dress => (
            <ProductCard key={dress.id} dress={dress} />
          ))}
          
          {filteredDresses.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p>Aradığınız kriterlere uygun gelinlik bulunamadı.</p>
              <button onClick={clearFilters} className="text-rose-500 mt-2 underline">Filtreleri Temizle</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;