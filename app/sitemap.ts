import { MetadataRoute } from 'next';
import { getDresses } from '@/lib/supabase';
import { FILTER_OPTIONS } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sevgilimgelinlik.com.tr'; 

  const dresses = await getDresses();
  
  const staticRoutes = [
    '',
    '/gelinlik-modelleri',
    '/iletisim',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = [];
  
  Object.values(FILTER_OPTIONS).forEach((options) => {
    options.forEach((opt) => {
      categoryRoutes.push({
        url: `${baseUrl}/gelinlik-modelleri/${opt.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8, // Kategoriler önemlidir
      });
    });
  });

  const productRoutes = dresses.map((dress) => ({
    url: `${baseUrl}/gelinlik/${dress.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    images: dress.images?.map(img => img) || [], 
  }));

  return [...staticRoutes, ...productRoutes];
}