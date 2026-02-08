import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/sevgilimgelinlik/',
      icon: <Instagram className="w-6 h-6" />
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/905452984202',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-rose-100 text-gray-700 pt-12 pb-8">
      <div className="container px-6 md:mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* About */}
          <div className="flex flex-col items-start justify-center md:pr-12">
            <h3 className="text-2xl font-playfair font-bold text-rose-400 mb-4">Sevgilim Gelinlik</h3>
            <p className="text-md mb-6 max-w-md leading-relaxed">
              En özel gününüz için şık ve zarif gelinliklerimizle yanınızdayız. Hem hazır koleksiyonumuz hem de özel dikim seçeneklerimizle hayalinizdeki gelinliği gerçeğe dönüştürüyoruz.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className='flex flex-col md:items-end md:justify-center'>
            <div className="md:min-w-[320px]">
              <h4 className="font-semibold text-2xl text-rose-400 mb-4">İletişim Bilgileri</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-rose-400 mt-1 mr-3 shrink-0" />
                  <span className="text-base text-gray-600">Fevzipaşa Caddesi Galleria Üllü Pasajı no: 100, 34091 Dükkan No: 204<br />Fatih / İstanbul</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-rose-400 mr-3 shrink-0" />
                  <span className="text-base text-gray-600">+90 545 298 42 02</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-gray-500 md:mb-0">
              &copy; {currentYear} Sevgilim Gelinlik. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}