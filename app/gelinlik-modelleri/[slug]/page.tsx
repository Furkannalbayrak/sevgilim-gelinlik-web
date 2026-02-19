import ProductList from '@/components/products/ProductList';
import { FILTER_OPTIONS, FilterCategory } from '@/lib/data';
import { getDresses } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// SEO için Metadata (Başlıklar dinamik değişsin)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Slug'a uygun etiketi bul (Örn: prenses -> Prenses)
  let label = '';
  for (const key in FILTER_OPTIONS) {
    const found = FILTER_OPTIONS[key as FilterCategory].find(opt => opt.id === slug);
    if (found) label = found.label;
  }

  if (!label) return { title: 'Gelinlik Modelleri' };

  return {
    title: `${label} Gelinlik Modelleri | Sevgilim Gelinlik`,
    description: `En şık ${label} gelinlik modellerini ve fiyatlarını inceleyin.`,
    alternates: {
      canonical: `https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri/${slug}`
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Geçersiz bir kategori girilirse 404 verelim (Güvenlik)
  let isValidSlug = false;
  for (const key in FILTER_OPTIONS) {
    if (FILTER_OPTIONS[key as FilterCategory].some(opt => opt.id === slug)) {
      isValidSlug = true;
      break;
    }
  }

  if (!isValidSlug) {
    notFound();
  }

  const dresses = await getDresses();

  // ProductList'e slug'ı "activeSlug" olarak gönderiyoruz
  return <ProductList activeSlug={slug} dresses={dresses}/>;
}