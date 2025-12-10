"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
// İkonları Lucide'den çekiyoruz
import { Menu, ChevronDown, ChevronUp } from "lucide-react"

export default function MobileNav() {
    // Sheet'in açık/kapalı durumunu kontrol etmek için state
    const [isOpen, setIsOpen] = useState(false)
    
    // Gelinlik kategorileri için accordion state'i
    const [openCategories, setOpenCategories] = useState<boolean[]>(Array(5).fill(false))

    const navLinks = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Gelinlik Modelleri', path: '/tum-gelinlik-modelleri' },
        { name: 'Hakkımızda', path: '/hakkimizda' },
        { name: 'İletişim', path: '/iletisim' },
    ]

    const dressCategories = [
        {
            title: 'Etek Tipi',
            category: 'etek-tipi',
            models: [
                { name: 'Prenses Gelinlik', slug: 'prenses' },
                { name: 'A kesim Gelinlik', slug: 'a-kesim' },
                { name: 'Helen Gelinlik', slug: 'helen' },
                { name: 'Balık Gelinlik', slug: 'balik' },
                { name: 'Kısa Gelinlik', slug: 'kisa' },
                { name: 'Kabarık Gelinlik', slug: 'kabarik' },
            ]
        },
        {
            title: 'Yaka Tipi',
            category: 'yaka-tipi',
            models: [
                { name: 'Kayık Yaka Gelinlik', slug: 'kayik-yaka' },
                { name: 'Hakim Yaka Gelinlik', slug: 'hakim-yaka' },
                { name: 'V Yaka Gelinlik', slug: 'v-yaka' },
                { name: 'Kalp Yaka Gelinlik', slug: 'kalp-yaka' },
                { name: 'Askılı Gelinlik', slug: 'askili' },
                { name: 'Kare Yaka Gelinlik', slug: 'kare-yaka' },
                { name: 'Omuz Açık Gelinlik', slug: 'omuz-acik' },
            ]
        },
        {
            title: 'Kol Tipi',
            category: 'kol-tipi',
            models: [
                { name: 'Uzun Kollu Gelinlik', slug: 'uzun-kollu' },
                { name: 'Yarım Kollu Gelinlik', slug: 'yarim-kollu' },
                { name: 'Balon Kollu Gelinlik', slug: 'balon-kollu' },
                { name: 'Tek Omuz Gelinlik', slug: 'tek-omuz' },
                { name: 'Düşük Omuz Gelinlik', slug: 'dusuk-omuz' },
                { name: 'Kolsuz/Sıfır Kollu Gelinlik', slug: 'kolsuz' },
            ]
        },
        {
            title: 'Kumaş',
            category: 'kumas',
            models: [
                { name: 'Dantelli Gelinlik', slug: 'dantelli' },
                { name: 'Tül Gelinlik', slug: 'tul' },
                { name: 'Saten Gelinlik', slug: 'saten' },
                { name: 'Fransız Dantelli Gelinlik', slug: 'fransiz-dantelli' },
                { name: 'Şifon Gelinlik', slug: 'sifon' },
                { name: 'Simli Gelinlik', slug: 'simli' },
            ]
        },
        {
            title: 'Tarzlar / Konseptler',
            category: 'tarzlar',
            models: [
                { name: 'Bohem Gelinlik', slug: 'bohem' },
                { name: 'Vintage Gelinlik', slug: 'vintage' },
                { name: 'Sade Gelinlik', slug: 'sade' },
                { name: 'Zarif Gelinlik', slug: 'zarif' },
                { name: 'Modern Gelinlik', slug: 'modern' },
            ]
        }
    ]

    // Kategori açıp kapatma fonksiyonu
    const toggleCategory = (index: number) => {
        const newOpenCategories = [...openCategories]
        newOpenCategories[index] = !newOpenCategories[index]
        setOpenCategories(newOpenCategories)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {/* Lucide Menu İkonu */}
                <button className="text-gray-700 hover:text-rose-300 focus:outline-none lg:hidden p-2">
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>
            
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left font-dancing text-2xl text-rose-500">
                        Sevgilim Gelinlik
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="w-full border-b border-gray-100 pb-2">
                            {link.name === 'Gelinlik Modelleri' ? (
                                // --- Accordion (Dropdown) Kısmı ---
                                <div className="w-full">
                                    <div className="w-full py-2 pl-2 pr-2">
                                        <p className="mb-3 font-medium text-lg text-gray-700">Kategoriler</p>
                                        {dressCategories.map((category, catIndex) => (
                                            <div key={catIndex} className="mb-2">
                                                <div
                                                    className="flex transition duration-100 items-center justify-between py-2 px-2 text-gray-600 hover:bg-rose-50 font-medium cursor-pointer rounded-md"
                                                    onClick={() => toggleCategory(catIndex)}
                                                >
                                                    <span className="text-sm">{category.title}</span>
                                                    {openCategories[catIndex] ?
                                                        <ChevronUp className="h-4 w-4 text-rose-400" /> :
                                                        <ChevronDown className="h-4 w-4" />
                                                    }
                                                </div>

                                                {/* Alt Menüler (Modeller) */}
                                                {openCategories[catIndex] && (
                                                    <div className="ml-3 border-l-2 border-rose-100 pl-3 py-1 mt-1">
                                                        {category.models.map((model, modelIndex) => (
                                                            <Link
                                                                key={modelIndex}
                                                                href={`/gelinlikler/${category.category}/${model.slug}`}
                                                                className="block py-2 px-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors text-sm"
                                                                onClick={() => setIsOpen(false)} // Linke tıklayınca menüyü kapat
                                                            >
                                                                {model.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        <div className="mt-4 pt-3">
                                            <Link
                                                href="/gelinlikler"
                                                className="block w-full py-2 px-4 text-center bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors text-sm font-medium"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Tüm Modelleri Gör
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // --- Normal Linkler ---
                                <Link
                                    href={link.path}
                                    className="block py-2 text-gray-700 hover:text-rose-400 transition-colors duration-200 text-lg font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}