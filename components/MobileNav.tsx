"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu, ChevronDown, ChevronUp } from "lucide-react"
import { FILTER_LABELS, FILTER_OPTIONS, FilterCategory } from '@/lib/data';

export default function MobileNav() {
    // Accordion için hangi kategorinin açık olduğunu tutan state
    // Örn: { 'etekTipi': true, 'yakaTipi': false }
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const navLinks = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Gelinlik Modelleri', path: '/gelinlik-modelleri' },
        { name: 'Hakkımızda', path: '/hakkimizda' },
        { name: 'İletişim', path: '/iletisim' },
    ]

    // Kategori Aç/Kapa Fonksiyonu
    const toggleCategory = (key: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [key]: !prev[key] // Tıklananı tersine çevir (Açıksa kapat, kapalıysa aç)
        }));
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="text-gray-700 hover:text-rose-300 focus:outline-none lg:hidden p-2">
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>
            
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto bg-white">
                <SheetHeader className="border-b border-gray-100 pb-4 mb-4">
                    <SheetTitle className="text-left font-dancing text-2xl text-rose-500 font-bold">
                        Sevgilim Gelinlik
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <div key={link.name} className="w-full border-b border-gray-50 pb-2 last:border-0">
                            
                            {/* --- ÖZEL DURUM: Gelinlik Modelleri --- */}
                            {link.name === 'Gelinlik Modelleri' ? (
                                <div>
                                    <div className="py-2">
                                        <p className="mb-3 font-semibold text-lg text-gray-800">Koleksiyonlar</p>
                                        
                                        {/* KATEGORİLERİ DÖNGÜYE ALIYORUZ */}
                                        {(Object.entries(FILTER_LABELS) as [FilterCategory, string][]).map(([key, label]) => (
                                            <div key={key} className="mb-1">
                                                {/* Kategori Başlığı (Örn: Etek Tipi) */}
                                                <button
                                                    className="w-full flex items-center justify-between py-2.5 px-2 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors text-sm font-medium"
                                                    onClick={() => toggleCategory(key)}
                                                >
                                                    <span>{label}</span>
                                                    {openCategories[key] ? 
                                                        <ChevronUp className="h-4 w-4 text-rose-400" /> : 
                                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                                    }
                                                </button>

                                                {/* ALT LİNKLER (Modeller) */}
                                                {openCategories[key] && (
                                                    <div className="ml-2 border-l-2 border-rose-100 pl-2 mt-1 space-y-1">
                                                        {FILTER_OPTIONS[key].map((opt) => (
                                                            <SheetClose asChild key={opt.id}>
                                                                <Link
                                                                    href={`/gelinlik-modelleri/${opt.id}`}
                                                                    className="block py-2 px-3 text-sm text-gray-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-md transition-all"
                                                                >
                                                                    {opt.label}
                                                                </Link>
                                                            </SheetClose>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        <div className="mt-4 pt-2">
                                            <SheetClose asChild>
                                                <Link
                                                    href="/gelinlik-modelleri"
                                                    className="block w-full py-2.5 text-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium shadow-sm"
                                                >
                                                    Tüm Modelleri Gör
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // --- NORMAL LİNKLER (Ana Sayfa, İletişim vb.) ---
                                <SheetClose asChild>
                                    <Link
                                        href={link.path}
                                        className="block py-2 text-gray-700 hover:text-rose-500 transition-colors text-lg font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                </SheetClose>
                            )}
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}