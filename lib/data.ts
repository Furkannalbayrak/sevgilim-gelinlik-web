export type FilterCategory = 'etekTipi' | 'yakaTipi' | 'kolTipi' | 'kumas' | 'konsept';

export interface Dress {
  id: number;
  name: string;
  slug: string; 
  category: string;
  categoryKey: string;
  images: string[];
  description: string;
  filters: {
    etekTipi: string;
    yakaTipi: string;
    kolTipi: string;
    kumas: string;
    konsept: string;
  };
}

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

export interface FilterOption {
  id: string;
  label: string;
}

export const FILTER_LABELS: Record<FilterCategory, string> = {
  etekTipi: 'Etek Tipi',
  yakaTipi: 'Yaka Tipi',
  kolTipi: 'Kol Tipi',
  kumas: 'Kumaş',
  konsept: 'Tasarım',
};

export const URL_MAP: Record<string, FilterCategory> = {
  'etek-tipi': 'etekTipi',
  'yaka-tipi': 'yakaTipi',
  'kol-tipi': 'kolTipi',
  'kumas': 'kumas',
  'tarzlar': 'konsept',
};

export const FILTER_OPTIONS: Record<FilterCategory, FilterOption[]> = {
  etekTipi: [
    { id: 'prenses', label: 'Prenses' }, { id: 'a-kesim', label: 'A Kesim' },
    { id: 'helen', label: 'Helen' }, { id: 'balik', label: 'Balık' },
    // { id: 'kisa', label: 'Kısa' },
    { id: 'kabarik', label: 'Kabarık' }
  ],
  yakaTipi: [
    // { id: 'kayik-yaka', label: 'Kayık Yaka' }, 
    { id: 'v-yaka', label: 'V Yaka' },
    { id: 'kalp-yaka', label: 'Kalp Yaka' }, { id: 'askili', label: 'Askılı' },
    { id: 'havuz-yaka', label: 'Havuz Yaka'}, { id: 'kare-yaka', label: 'Kare Yaka'},
    { id: 'madonna-yaka', label: 'Madonna Yaka'}, { id: 'hakim-yaka', label: 'Hakim Yaka'}
  ],
  kolTipi: [
    { id: 'uzun-kollu', label: 'Uzun Kollu' }, 
    // { id: 'yarim-kollu', label: 'Yarım Kollu' },
    { id: 'kolsuz', label: 'Kolsuz' }, { id: 'dusuk-omuz', label: 'Düşük Omuz' }
  ],
  kumas: [
    { id: 'dantelli', label: 'Dantelli' }, { id: 'tul', label: 'Tül' },
    { id: 'saten', label: 'Saten' },
    //  { id: 'sifon', label: 'Sifon' },
    { id: 'tafta', label: 'Tafta'}
  ],
  konsept: [
    { id: 'bohem', label: 'Bohem' }, 
    // { id: 'vintage', label: 'Vintage' },
    { id: 'modern', label: 'Modern' }, { id: 'zarif', label: 'Zarif' }
  ]
};


// export const DRESSES_DATA: Dress[] = [
//   {
//     id: 1,
//     name: 'Prenses Kesim Gelinlik',
//     slug: 'prenses-kesim-ozel-tasarim-gelinlik',
//     category: 'Prenses Kesim',
//     categoryKey: 'prenses',
//     images: [
//       'https://www.yesimgelinlik.com/wp-content/uploads/2022/08/prenses-gelinlik-modeli-33-4056835395.jpg',
//       'https://cdn-europe.dugunbuketi.com/media/3260/conversions/header-1-md.jpg'
//     ],
//     description: 'Bu muhteşem prenses kesim gelinlik, özel günlerinizde sizi bir masal prensesi gibi hissettirecek. Dantel detayları ve kabarık eteği ile göz kamaştırıcı bir görünüm sunar.',
//     filters: { etekTipi: 'prenses', yakaTipi: 'v-yaka', kolTipi: 'kolsuz', kumas: 'dantelli', konsept: 'bohem' }
//   },
//   {
//     id: 2,
//     name: 'Balık Sırtı Gelinlik',
//     slug: 'balik-sirti-zarif-gelinlik-modeli',
//     category: 'Balık Sırtı',
//     categoryKey: 'balik',
//     images: [
//       'https://alissenuera.com/cdn/shop/files/Alisse-nuerA-Dusuk-Omuzlu-Drapeli-Sade-Helen-Gelinlik-Modeli-Front-Image_2048x.jpg',
//       'https://janroz.com.tr/wp-content/uploads/2025/09/DzSC00580-550x978.jpg'
//     ],
//     description: 'Vücut hatlarını kusursuzca saran balık model gelinlik, modern ve zarif bir duruş sergilemek isteyen gelin adayları için ideal bir tercihtir.',
//     filters: { etekTipi: 'balik-sirti', yakaTipi: 'halka-yaka', kolTipi: 'uzun-kollu', kumas: 'sifon', konsept: 'modern' }
//   },
//   {
//     id: 3,
//     name: 'A-Line Gelinlik',
//     slug: 'a-line-bohem-gelinlik-modeli',
//     category: 'A-Line',
//     categoryKey: 'a-kesim',
//     images: [
//       'https://cdn.dsmcdn.com/ty784/product/media/images/20230317/16/306358829/889458153/1/1_org_zoom.jpg',
//       'https://janroz.com.tr/wp-content/uploads/2025/04/2J1A3619-2-scaled.jpg'
//     ],
//     description: 'Klasik ve zamansız A-kesim gelinlik, her vücut tipine uyum sağlayan zarif yapısıyla öne çıkıyor. Sade şıklığı sevenler için mükemmel.',
//     filters: { etekTipi: 'a-kesim', yakaTipi: 'kalp-yaka', kolTipi: 'askili', kumas: 'saten', konsept: 'zarif' }
//   },
//   {
//     id: 4,
//     name: 'Uzun Kollu Gelinlik',
//     slug: 'uzun-kollu-tasli-gelinlik-modeli',
//     category: 'Prenses Kesim',
//     categoryKey: 'prenses',
//     images: [
//       'https://www.yesimgelinlik.com/wp-content/uploads/2025/01/Urun1-700x1050.jpg',
//       'https://www.narinmoda.com/Panel/dashboard/Uploads/Product/Detail/Gallery/Prenses_Gelinlik_1052_1_.jpg'
//     ],
//     description: 'Kış düğünleri ve daha kapalı mekanlar için ideal olan uzun kollu gelinlik, dantel işlemeli kolları ile romantik bir hava katıyor.',
//     filters: { etekTipi: 'prenses', yakaTipi: 'kayik-yaka', kolTipi: 'uzun-kollu', kumas: 'dantelli', konsept: 'vintage' }
//   },
//   {
//     id: 5,
//     name: 'Etek-Ceket Gelinlik',
//     slug: 'helen-kisa-kollu-gelinlik-modeli',
//     category: 'Helenistik',
//     categoryKey: 'helen',
//     images: [
//       'https://medihacambaz.com/cdn/shop/files/luxe-22-el-yapimi-isiltili-prenses-model-gelinlik-mediha-cambaz-bridal-3_800x.jpg?v=1749036785',
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuCgpsiGOBz7gAzP8cKKpl7K-dsL3RboX0w&s'
//     ],
//     description: 'Farklı ve iddialı bir tarz arayanlar için etek-ceket formundaki bu tasarım, modern gelinlerin tercihi.',
//     filters: { etekTipi: 'helen', yakaTipi: 'v-yaka', kolTipi: 'uzun-kollu', kumas: 'saten', konsept: 'modern' }
//   },
//   {
//     id: 6,
//     name: 'İnci İşlemeli',
//     slug: 'inci-islemeli-sirt-dekolteli-gelinlik-modeli',
//     category: 'Prenses Kesim',
//     categoryKey: 'prenses',
//     images: [
//       'https://www.davetcokelbisemyok.com/media/catalog/product/cache/401798936e1f39ab34bbb19329bd4ca1/g/e/gemma_gelinlik_dhbd.jpg',
//       'https://duguntrendy.com/images/gallery_post/big/sirti-acik-gelinlik-modelleri_3.jpg'
//     ],
//     description: 'Tamamı el işçiliği inci detaylarıyla bezeli bu gelinlik, lüks ve zarafeti bir arada sunuyor.',
//     filters: { etekTipi: 'prenses', yakaTipi: 'kalp-yaka', kolTipi: 'askili', kumas: 'tul', konsept: 'zarif' }
//   },
// ];