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
                className={`flex items-center gap-1 text-xl font-sans transition-all duration-300 cursor-pointer text-gray-700 hover:text-rose-500 group`}
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
                        href="https://wa.me/905452984202" // Telefon numaranı buraya yaz
                        target="_blank"
                        className="group relative"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-green-50 border-green-500 hover:bg-green-100 transition-all duration-300">

                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>

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