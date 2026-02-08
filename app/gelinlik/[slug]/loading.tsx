export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="relative">
                {/* Dış Daire */}
                <div className="w-16 h-16 border-4 border-rose-100 rounded-full animate-spin"></div>
                {/* İç Çizgi */}
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-rose-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Gelinlik detayları hazırlanıyor...</p>
        </div>
    );
}