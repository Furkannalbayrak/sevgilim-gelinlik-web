import { MetadataRoute } from 'next';
import { getDresses } from '@/lib/supabase';

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

  const productRoutes = dresses.map((dress) => ({
    url: `${baseUrl}/gelinlik/${dress.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    images: dress.images?.map(img => img) || [], 
  }));

  return [...staticRoutes, ...productRoutes];
}