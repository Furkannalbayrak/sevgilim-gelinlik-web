"use client"

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, ShoppingBag } from 'lucide-react';
import MobileNav from './MobileNav'; // Az önce oluşturduğun dosyayı buraya çağırıyoruz
import { FILTER_LABELS, FILTER_OPTIONS, FilterCategory } from '@/lib/data';

// --- Masaüstü Açılır Menü Bileşeni ---
const DressModelsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    return (
        <div
            className="relative"
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="max-w-7xl w-full mx-auto px-4 pl-20 py-8">
                        <div className="grid grid-cols-5 gap-8">
                            {(Object.entries(FILTER_LABELS) as [FilterCategory, string][]).map(([key, label]) => (
                                <div key={key} className="p-2">
                                    {/* Kategori Başlığı */}
                                    <h4 className="font-semibold text-base text-rose-600 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
                                        {label}
                                    </h4>

                                    {/* Linkler */}
                                    <ul className="space-y-2">
                                        {FILTER_OPTIONS[key].map((opt) => (
                                            <li key={opt.id}>
                                                <Link
                                                    href={`/gelinlik-modelleri/${opt.id}`}
                                                    className="block text-gray-600 hover:text-rose-600 hover:translate-x-1 transition-all text-sm py-1"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {opt.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center border-t border-gray-100 pt-6 pr-20">
                            <Link
                                href="/gelinlik-modelleri"
                                className="inline-block py-3 px-10 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors font-medium shadow-md hover:shadow-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                TÜM MODELLERİ GÖR
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
        { name: 'Gelinlik Modelleri', path: '/gelinlik-modelleri' },
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