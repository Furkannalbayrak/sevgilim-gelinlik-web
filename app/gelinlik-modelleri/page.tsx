import ProductList from "@/components/products/ProductList";
import { getDresses } from "@/lib/supabase";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Gelinlik Modelleri | Sevgilim Gelinlik",
    description: "En yeni gelinlik modelleri, özel tasarım gelinlikler ve uygun fiyatlı seçenekler Sevgilim Gelinlik'te. Koleksiyonumuzu hemen inceleyin.",
    alternates: {
        canonical: "https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri"
    },
};

export const dynamic = 'force-dynamic';

export default async function GelinlikModelleriPage() {
    const dresses = await getDresses();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Ana Sayfa',
                'item': 'https://www.sevgilimgelinlik.com.tr'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Gelinlik Modelleri',
                'item': 'https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri'
            }
        ]
    };

    return (
        <>
            <Script
                id="breadcrumb-schema-gelinlik-modelleri"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div>
                <ProductList dresses={dresses} />
            </div>
        </>
    );
}