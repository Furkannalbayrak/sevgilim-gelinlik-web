
import { notFound } from "next/navigation";
import { getDressBySlug } from "@/lib/supabase";
import ProductDetailView from "@/components/ProductDetail";
import { Metadata } from "next";

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

    return <ProductDetailView product={product} />;
}