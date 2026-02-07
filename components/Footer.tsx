import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook',
      url: '#', 
      icon: <Facebook className="w-6 h-6" />
    },
    { 
      name: 'Instagram',
      url: '#', 
      icon: <Instagram className="w-6 h-6" />
    },
    { 
      name: 'Twitter',
      url: '#', 
      icon: <Twitter className="w-6 h-6" />
    },
  ];

  return (
    <footer className="bg-rose-100 text-gray-700 pt-12 pb-8">
      <div className="container px-8 md:mx-auto max-w-7xl">
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
                  <span className="text-base text-gray-600">Örnek Mah. Gelinlik Cad. No:123<br />İstanbul / Türkiye</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-rose-400 mr-3 shrink-0" />
                  <span className="text-base text-gray-600">+90 555 123 45 67</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-rose-400 mr-3 shrink-0" />
                  <span className="text-base text-gray-600">info@sevgilimgelinlik.com</span>
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