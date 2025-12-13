'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Plus, Minus, SlidersHorizontal, X } from 'lucide-react';
import { FILTER_OPTIONS, FilterCategory } from '@/lib/data';

const MENU_ITEMS = [
    { label: 'ETEK TİPİNE GÖRE', key: 'etekTipi' as FilterCategory },
    { label: 'YAKA TİPİNE GÖRE', key: 'yakaTipi' as FilterCategory },
    { label: 'KOL TİPİNE GÖRE', key: 'kolTipi' as FilterCategory },
    { label: 'KUMAŞA GÖRE', key: 'kumas' as FilterCategory },
    { label: 'TARZA GÖRE', key: 'konsept' as FilterCategory },
];

export default function FilterDrawer() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const toggleCategory = (key: string) => {
        setOpenCategory(prev => prev === key ? null : key);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-95 shadow-md border border-gray-200">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="font-medium tracking-wide text-sm">FİLTRELE / MODELLER</span>
                </button>
            </SheetTrigger>

            {/* Yan Panel İçeriği (Açık Tema: Beyaz Zemin) */}
            <SheetContent 
                side="left" 
                className="w-[320px] sm:w-[380px] p-0 bg-white border-r border-gray-100 text-gray-900 overflow-y-auto"
            >
                {/* 1. Başlık ve Kapatma Alanı */}
                <SheetHeader className="p-6 border-b border-gray-100 flex flex-row items-center justify-between sticky top-0 bg-white z-10">
                    <SheetTitle className="font-playfair text-xl font-bold tracking-wide text-gray-900 text-left">
                        GELİNLİK MODELLERİ
                    </SheetTitle>
                    <SheetClose className="text-gray-400 hover:text-rose-500 transition-colors">
                        <X className="w-6 h-6" />
                        <span className="sr-only">Kapat</span>
                    </SheetClose>
                </SheetHeader>

                {/* 2. Liste Alanı */}
                <div className="flex flex-col">
                    {MENU_ITEMS.map((item) => {
                        const isOpen = openCategory === item.key;
                        const subOptions = FILTER_OPTIONS[item.key];

                        return (
                            <div key={item.key} className="border-b border-gray-100 last:border-0">
                                {/* Ana Başlık Butonu */}
                                <button
                                    onClick={() => toggleCategory(item.key)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors group"
                                >
                                    <span className={`text-sm font-semibold tracking-wider transition-colors ${isOpen ? 'text-rose-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                        {item.label}
                                    </span>
                                    {/* İkonlar: Zarif Gri */}
                                    {isOpen ? (
                                        <Minus className="w-4 h-4 text-rose-500" />
                                    ) : (
                                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    )}
                                </button>

                                {/* Alt Menü (Açılır Alan: Hafif Gri Zemin) */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/50 ${
                                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <ul className="py-2 pb-4">
                                        {subOptions.map((opt) => (
                                            <li key={opt.id}>
                                                <SheetClose asChild>
                                                    <Link
                                                        href={`/gelinlik-modelleri/${opt.id}`}
                                                        className="block px-8 py-2.5 text-sm text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-all border-l-2 border-transparent hover:border-rose-300"
                                                    >
                                                        {opt.label}
                                                    </Link>
                                                </SheetClose>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Alt Kısım: Tümünü Gör */}
                <div className="p-6 mt-4 bg-gray-50 border-t border-gray-100">
                    <SheetClose asChild>
                        <Link 
                            href="/gelinlik-modelleri"
                            className="flex items-center justify-center w-full py-4 bg-rose-500 text-white rounded-lg font-medium tracking-wide hover:bg-rose-600 transition-colors shadow-md hover:shadow-lg text-sm uppercase"
                        >
                            Tüm Koleksiyonu Gör
                        </Link>
                    </SheetClose>
                </div>

            </SheetContent>
        </Sheet>
    );
}