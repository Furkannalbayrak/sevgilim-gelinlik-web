import ProductList from '@/components/products/ProductList';
import { FILTER_OPTIONS, FilterCategory } from '@/lib/data';
import { getDresses } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Script from 'next/script';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getLabelBySlug = (slug: string): string | null => {
  for (const key in FILTER_OPTIONS) {
    const found = FILTER_OPTIONS[key as FilterCategory].find(opt => opt.id === slug);
    if (found) return found.label;
  }
  return null;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const label = getLabelBySlug(slug);

  if (!label) return { title: 'Gelinlik Modelleri' };

  return {
    title: `${label} Model Gelinlikler | Sevgilim Gelinlik`,
    description: `En şık ${label} gelinlik modellerini ve fiyatlarını inceleyin. İstanbul Fatih mağazamızda özel dikim seçenekleri.`,
    alternates: {
      canonical: `https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri/${slug}`
    },
    openGraph: {
      title: `${label} Model Gelinlikler | Sevgilim Gelinlik`,
      description: `${label} modelleri için hemen tıklayın.`,
    }
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const label = getLabelBySlug(slug);

  if (!label) {
    notFound();
  }

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
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': label,
        'item': `https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri/${slug}`
      }
    ]
  };

  // ProductList'e slug'ı "activeSlug" olarak gönderiyoruz
  return (
    <>
      <Script
        id={`breadcrumb-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductList activeSlug={slug} dresses={dresses} />
    </>
  );
}