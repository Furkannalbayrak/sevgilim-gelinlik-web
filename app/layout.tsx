import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sevgilimgelinlik.com.tr"),
  alternates: {
    canonical: "https://www.sevgilimgelinlik.com.tr",
  },
  title: {
    default: "Sevgilim Gelinlik | Hayallerinizdeki Gelinlik Modelleri",
    template: "%s | Sevgilim Gelinlik" // Alt sayfalarda otomatik " - Sevgilim Gelinlik" ekler
  },
  description: "İstanbul Fatih'te en şık gelinlik modelleri, özel tasarım ve dikim hizmetleri. Hayalinizdeki gelinliği birlikte tasarlayalım.",
  keywords: ["gelinlik", "gelinlik modelleri", "fatih gelinlikçiler", "gelinlik fiyatları", "tesettür gelinlik"],

  //Eğer logon public klasöründe logo.png olarak varsa:

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.sevgilimgelinlik.com.tr",
    title: "Sevgilim Gelinlik",
    description: "En özel gününüz için eşsiz tasarımlar.",
    siteName: "Sevgilim Gelinlik",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sevgilim Gelinlik",
  "url": "https://www.sevgilimgelinlik.com.tr", // Kendi domainin
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.sevgilimgelinlik.com.tr/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Gelinlik Modelleri",
      "item": "https://www.sevgilimgelinlik.com.tr/gelinlik-modelleri"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "İletişim",
      "item": "https://www.sevgilimgelinlik.com.tr/iletisim"
    }
  ]
};


const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${dancingScript.variable} antialiased`}>
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="json-ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
