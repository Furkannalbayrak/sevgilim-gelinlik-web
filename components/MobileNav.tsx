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
                        <a href="https://www.instagram.com/sevgilimgelinlik/" target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-6 w-6 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
                        </a>

                        <a href="https://wa.me/905452984202" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}