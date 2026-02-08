import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-white">
      <h2 className="text-8xl font-[family-name:var(--font-dancing)] text-rose-400 mb-4">404</h2>
      <h3 className="text-2xl font-serif text-gray-800 mb-4">Aradığınız Sayfa Bulunamadı</h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Baktığınız gelinlik modeli kaldırılmış veya bağlantı adresi değişmiş olabilir.
      </p>
      
      <div className="flex gap-4">
        <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
            Anasayfa
        </Link>
        <Link
            href="/gelinlik-modelleri"
            className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
        >
            Koleksiyonu İncele
        </Link>
      </div>
    </div>
  );
}