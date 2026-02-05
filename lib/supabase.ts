import { createClient } from '@supabase/supabase-js';
import { Dress } from './data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface DressRow {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  category_key: string;
  images: string[] | null;
  etek_tipi: string | null;
  yaka_tipi: string | null;
  kol_tipi: string | null;
  kumas: string | null;
  konsept: string | null;
}

export const mapDressRowToDress = (row: DressRow): Dress => {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug, // URL'de kullanacağımız slug
    category: row.category,
    categoryKey: row.category_key,
    images: row.images || [],
    description: row.description || '',
    filters: {
      etekTipi: row.etek_tipi || '',
      yakaTipi: row.yaka_tipi || '',
      kolTipi: row.kol_tipi || '',
      kumas: row.kumas || '',
      konsept: row.konsept || ''
    }
  };
};

export async function getDresses(): Promise<Dress[]> {
  const { data, error } = await supabase
    .from('dresses')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Gelinlikler çekilirken hata:', error);
    return [];
  }

  return (data as DressRow[]).map(mapDressRowToDress);
}

export async function getDressBySlug(slug: string): Promise<Dress | null> {
  // Önce tam eşleşme
  let { data, error } = await supabase
    .from('dresses')
    .select('*')
    .eq('slug', slug)
    .single();

  // Slug bulunamazsa ve slug içinde ID varsa (eski linkler için yedek plan)
  if (!data) {
     const parts = slug.split('-');
     const possibleId = parts[parts.length - 1];
     if (!isNaN(Number(possibleId))) {
        const { data: dataById } = await supabase
          .from('dresses')
          .select('*')
          .eq('id', possibleId)
          .single();
        if (dataById) data = dataById;
     }
  }

  if (!data) return null;
  return mapDressRowToDress(data as DressRow);
}