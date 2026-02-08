import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "İletişim & Randevu | Sevgilim Gelinlik Fatih",
    description: "İstanbul Fatih'teki mağazamızda gelinlik provası için randevu alın. Adres, telefon ve konum bilgileri için tıklayın.",
};

export default function Contact() {
  return (
    <section id="iletisim" className="pt-16 pb-24 bg-white relative overflow-hidden">
      {/* Arkaplan Dekorasyonu (Opsiyonel) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-60"></div>

      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 relative z-10">

        {/* Başlık Bölümü */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl font-[family-name:var(--font-dancing)]">
            Bizimle İletişime Geçin
          </h2>

          {/* Dekoratif Çizgi */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-28 bg-gradient-to-r from-transparent to-rose-400"></div>
            <div className="text-rose-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="h-[1px] w-28 bg-gradient-to-l from-transparent to-rose-400"></div>
          </div>

          <p className="mx-auto max-w-2xl text-gray-500">
            Randevu almak, modellerimiz hakkında bilgi edinmek veya prova için mağazamızı ziyaret etmek isterseniz bize ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Sol Taraf: İletişim Bilgileri */}
          <div className="space-y-6">
            {/* Adres Kartı */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-rose-100 transition-colors group">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Mağaza Adresi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fevzipaşa Caddesi Galleria Ülkü Pasajı No: 100, 34091 Dükkan No: 204<br />
                  Fatih / İstanbul
                </p>
              </div>
            </div>

            {/* Telefon Kartı */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-rose-100 transition-colors group">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Telefon & WhatsApp</h3>
                <p className="text-gray-600 mb-1">0 (545) 298 42 02</p>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-rose-100 transition-colors group">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Çalışma Saatleri</h3>
                <p className="text-gray-600">Pazartesi - Cumartesi: 08:00 - 19:30</p>
                <p className="text-gray-600">Pazar: 12:00 - 19:00</p>
              </div>
            </div>
          </div>

          {/* Sağ Taraf: Google Maps */}
          <div className="h-full min-h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative group">
            {/* Harita iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.1601612962595!2d28.94226752586919!3d41.0217518213486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba1863aa6acf%3A0xf2046642e7c06c52!2zR2FsbGVyaWEgw5xsa8O8IEdlbGlubGlrw6dpbGVyIMOHYXLFn8Sxc8Sx!5e0!3m2!1str!2str!4v1770477585524!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>

            {/* Harita Üzeri Bilgi (Opsiyonel) */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-800">
              📍 Sevgilim Gelinlik
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};
