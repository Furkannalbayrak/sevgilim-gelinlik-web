"use client"

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, ShoppingBag } from 'lucide-react';
import MobileNav from './MobileNav'; // Az önce oluşturduğun dosyayı buraya çağırıyoruz

// --- Masaüstü Açılır Menü Bileşeni ---
const DressModelsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    ];

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const handleDropdownEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleDropdownLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`flex items-center gap-1 text-xl font-sans transition-all duration-300 cursor-pointer text-gray-700 hover:text-rose-300 group`}
            >
                Gelinlik Modelleri
                <ChevronDown className={`h-4 w-4 mt-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div
                    className="fixed left-0 right-0 mt-4 bg-white shadow-xl z-50 border-t border-gray-100"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                >
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-5 gap-8">
                            {dressCategories.map((category, index) => (
                                <div key={index} className="p-2">
                                    <h4 className="font-semibold text-lg text-rose-700 mb-4 pb-2 border-b border-gray-100">
                                        {category.title}
                                    </h4>
                                    <ul className="space-y-2">
                                        {category.models.map((model, modelIndex) => (
                                            <li key={modelIndex} className="mb-1">
                                                <Link
                                                    href={`/gelinlikler/${category.category}/${model.slug}`}
                                                    className="block py-1.5 px-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors text-sm"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {model.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center border-t border-gray-100 pt-6">
                            <Link
                                href="/gelinlikler"
                                className="inline-block py-3 px-10 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors font-medium shadow-md hover:shadow-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Tüm Modelleri Gör
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Ana Header Bileşeni ---
const Header = () => {
    const navLinks = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Gelinlik Modelleri', path: '/gelinlikler' }, // Path güncellendi
        { name: 'Hakkımızda', path: '/hakkimizda' },
        { name: 'İletişim', path: '/iletisim' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

                <div className="lg:hidden">
                    <MobileNav />
                </div>

                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-3xl md:text-4xl tracking-wider font-dancing font-bold text-rose-500 group-hover:text-rose-600 transition-colors">
                        Sevgilim Gelinlik
                    </span>
                </Link>

                {/* 2. ORTA TARAF (Desktop Menü) - Genişliği içeriği kadar */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            {link.name === 'Gelinlik Modelleri' ? (
                                <DressModelsDropdown />
                            ) : (
                                <Link
                                    href={link.path}
                                    className="text-lg font-sans font-medium text-stone-600 hover:text-rose-500 transition-colors duration-300"
                                >
                                    {link.name}
                                    {/* Hover Alt Çizgi Efekti */}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-300 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link 
                        href="https://wa.me/905555555555" // Telefon numaranı buraya yaz
                        target="_blank"
                        className="group relative"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-green-50 border-green-500 hover:bg-green-100 transition-all duration-300">
                            
                            {/* Lucide'den 'MessageCircle' ikonu (Çizgisel stil, tasarıma daha uygun) */}
                            <MessageCircle className="h-5 w-5 text-stone-600 group-hover:text-green-600 transition-colors" />
                            
                            <span className="font-medium text-stone-600 group-hover:text-green-600 transition-colors hidden sm:block">
                                WhatsApp
                            </span>
                        </div>
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;