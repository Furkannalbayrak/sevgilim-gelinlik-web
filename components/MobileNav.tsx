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
import { Menu, Plus, Minus, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { FILTER_LABELS, FILTER_OPTIONS, FilterCategory } from '@/lib/data';

export default function MobileNav() {
    // Alt kategorilerin (Etek Tipi vb.) açık/kapalı durumu
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    // Ana "Gelinlik Modelleri" menüsünün açık/kapalı durumu
    const [isGelinlikMenuOpen, setIsGelinlikMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Gelinlik Modelleri', path: '/gelinlik-modelleri', isDropdown: true },
        { name: 'Hakkımızda', path: '/hakkimizda' },
        { name: 'İletişim', path: '/iletisim' },
    ]

    // Alt Kategori Aç/Kapa Fonksiyonu
    const toggleCategory = (key: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="text-gray-700 hover:text-rose-500 focus:outline-none lg:hidden p-2">
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            {/* Açık Tema: Beyaz Arka Plan */}
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto bg-white border-r border-gray-100 p-0 text-gray-900 flex flex-col h-full">

                {/* Header Kısmı */}
                <SheetHeader className="border-b border-gray-100 p-6 text-left shrink-0 sticky top-0 bg-white z-10">
                    <SheetTitle className="text-left font-dancing text-2xl text-rose-500 font-bold">
                        Sevgilim Gelinlik
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col flex-grow">
                    {navLinks.map((link) => (
                        <div key={link.name} className="w-full border-b border-gray-100 last:border-0">

                            {/* --- ÖZEL DURUM: Gelinlik Modelleri (Dropdown) --- */}
                            {link.isDropdown ? (
                                <div className="flex flex-col">
                                    {/* Ana Başlık Butonu - Tıklanınca Açılır/Kapanır */}
                                    <button
                                        onClick={() => setIsGelinlikMenuOpen(!isGelinlikMenuOpen)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors group"
                                    >
                                        <span className={`text-sm font-semibold tracking-wider transition-colors ${isGelinlikMenuOpen ? 'text-rose-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                            {link.name.toUpperCase()}
                                        </span>
                                        {/* İkon Değişimi */}
                                        {isGelinlikMenuOpen ? (
                                            <Minus className="w-4 h-4 text-rose-500" />
                                        ) : (
                                            <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        )}
                                    </button>

                                    {/* Açılır Menü İçeriği */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/50 ${isGelinlikMenuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>

                                        {/* Alt Kategoriler (Etek Tipi, Yaka Tipi vb.) */}
                                        {(Object.entries(FILTER_LABELS) as [FilterCategory, string][]).map(([key, label]) => (
                                            <div key={key} className="border-b border-gray-100 last:border-0">
                                                <button
                                                    className="w-full flex items-center justify-between py-3 px-8 text-gray-600 hover:text-rose-600 transition-colors text-xs font-medium uppercase tracking-wider"
                                                    onClick={() => toggleCategory(key)}
                                                >
                                                    <span>{label}</span>
                                                    {openCategories[key] ?
                                                        <Minus className="h-3 w-3 text-rose-400" /> :
                                                        <Plus className="h-3 w-3 text-gray-400" />
                                                    }
                                                </button>

                                                {/* En Alt Linkler (Prenses, A Kesim vb.) */}
                                                {openCategories[key] && (
                                                    <div className="bg-white">
                                                        {FILTER_OPTIONS[key].map((opt) => (
                                                            <SheetClose asChild key={opt.id}>
                                                                <Link
                                                                    href={`/gelinlik-modelleri/${opt.id}`}
                                                                    className="block py-2 px-10 text-xs text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-all border-l-4 border-transparent hover:border-rose-200"
                                                                >
                                                                    {opt.label}
                                                                </Link>
                                                            </SheetClose>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Tümünü Gör Butonu */}
                                        <div className="p-6">
                                            <SheetClose asChild>
                                                <Link
                                                    href="/gelinlik-modelleri"
                                                    className="block w-full py-3 text-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-xs font-medium uppercase tracking-widest shadow-sm"
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
                                        className="block p-5 text-sm font-semibold tracking-wider text-gray-700 hover:text-rose-600 hover:bg-gray-50 transition-colors uppercase"
                                    >
                                        {link.name}
                                    </Link>
                                </SheetClose>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer / Sosyal Medya */}
                <div className="mt-auto border-t border-gray-100 p-6 shrink-0 bg-gray-50">
                    <div className="flex justify-center space-x-6">
                        <Facebook className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
                        <Instagram className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
                        <Youtube className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}