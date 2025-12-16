"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1622277430358-f4d134452e2e?fm=jpg&q=60&w=3000",
        "https://images.unsplash.com/photo-1502955422409-06e43fd3eff3?q=80&w=387",
        "https://images.unsplash.com/photo-1705288840070-6a879b431033?fm=jpg&q=60&w=3000",
        "https://images.unsplash.com/flagged/photo-1578317767641-c2a23b16b814?fm=jpg&q=60&w=3000",
        "https://images.unsplash.com/photo-1599142296733-1c1f2073e6de?fm=jpg&q=60&w=3000",
        "https://images.unsplash.com/photo-1596181243306-e02a1897afb1?fm=jpg&q=60&w=3000"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000); // 5 saniyede bir değiş

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative min-h-screen pb-32 flex items-center justify-center overflow-hidden">
            {/* Background images layered */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-0' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            ))}

            {/* İçerik */}
            <div className="max-w-7xl w-full mx-auto px-6 md:px-10 z-10 text-center sm:text-left text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-dancing font-bold mb-6">
                    Hayalinizdeki Gelinliği Keşfedin
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center sm:text-left">
                    Özel gününüz için tasarlanmış zarif ve şık gelinlik koleksiyonumuzu inceleyin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-64 sm:w-full mx-auto">
                    <Link
                        href="/gelinlik-modelleri"
                        className="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-5 rounded-full transition-colors duration-300"
                    >
                        Gelinlik Modellerini Gör
                    </Link>
                    <Link
                        href="/iletisim"
                        className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
                    >
                        Randevu Al
                    </Link>
                </div>
            </div>

            {/* Aşağı ok ikonu */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center animate-bounce z-10">
                <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                >
                    <path
                        d="M7 10L12 15L17 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
