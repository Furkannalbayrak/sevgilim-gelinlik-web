import ProductList from "@/components/products/ProductList";
import { getDresses } from "@/lib/supabase"; // Veri çekme fonksiyonu

// Async component yapıyoruz
export default async function GelinlikModelleriPage() {
    // Veriyi sunucuda çek
    const dresses = await getDresses();

    return (
        <div>
            <ProductList dresses={dresses} />
        </div>
    );
}