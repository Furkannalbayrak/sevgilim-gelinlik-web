import ProductList from "@/components/products/ProductList";
import { getDresses } from "@/lib/supabase";
import { Metadata } from "next";

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

    return (
        <div>
            <ProductList dresses={dresses} />
        </div>
    );
}