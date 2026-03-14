
import { notFound } from "next/navigation";
import { getDressBySlug } from "@/lib/supabase";
import ProductDetailView from "@/components/ProductDetail";
import { Metadata } from "next";
import Script from "next/script";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getDressBySlug(slug);

    if (!product) {
        return {
            title: "Ürün Bulunamadı | Sevgilim Gelinlik",
            description: "Aradığınız gelinlik modeli bulunamadı."
        }
    }

    return {
        title: `${product.name} - Gelinlik Modelleri | Sevgilim Gelinlik`,
        description: product.description || `${product.name} gelinlik modeli ve detayları. Özel dikim ve hazır model seçenekleriyle.`,
        alternates: {
            canonical: `https://www.sevgilimgelinlik.com.tr/gelinlik/${slug}`
        },
        openGraph: {
            title: `${product.name} | Sevgilim Gelinlik`,
            description: product.description,
            images: product.images && product.images.length > 0 ? [product.images[0]] : [],
        }
    }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getDressBySlug(slug);

    if (!product) return notFound();

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Sevgilim Gelinlik'
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.sevgilimgelinlik.com.tr/gelinlik/${product.slug}`,
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            price: "0",
            priceValidUntil: "2025-12-31"
        }
    };

    const breadcrumbJsonLd = {
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
            },
            // Ürünün kategorisi (Örn: Prenses Kesim)
            {
                '@type': 'ListItem',
                'position': 3,
                'name': product.category || 'Gelinlik',
                'item': `https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri/${product.categoryKey || 'tum-modeller'}`
            },
            // Ürünün kendisi
            {
                '@type': 'ListItem',
                'position': 4,
                'name': product.name,
                'item': `https://www.sevgilimgelinlik.com.tr/gelinlik/${product.slug}`
            }
        ]
    };

    return (
        <>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <Script
                id="breadcrumb-schema-product"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <ProductDetailView product={product} />
        </>
    );
}