import Contact from "@/components/contact/Contact";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "İletişim | Sevgilim Gelinlik",
    description: "Sevgilim Gelinlik ile iletişime geçin. Fatih'teki mağazamızı ziyaret edin veya bizi arayın.",
    alternates: {
        canonical: "https://www.sevgilimgelinlik.com.tr/iletisim"
    },
};

export default function ContactPage() {

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Ana Sayfa',
                'item': 'https://www.sevgilimgelinlik.com.tr'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'İletişim',
                'item': 'https://www.sevgilimgelinlik.com.tr/iletisim'
            }
        ]
    };

    const businessLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness', // Veya 'BridalShop' da olabilir ama LocalBusiness garanti
        'name': 'Sevgilim Gelinlik',
        'image': 'https://www.sevgilimgelinlik.com.tr/icon.png',
        '@id': 'https://www.sevgilimgelinlik.com.tr',
        'url': 'https://www.sevgilimgelinlik.com.tr',
        'telephone': '+905452984202', 
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Fevzipaşa Caddesi Galleria Ülkü Pasajı No: 100, 34091 Dükkan No: 204 Fatih / İstanbul',
            'addressLocality': 'Fatih',
            'addressRegion': 'İstanbul',
            'postalCode': '34091',
            'addressCountry': 'TR'
        },
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            'opens': '08:00',
            'closes': '19:30'
        }
    };

    return (
        <>
            <Script
                id="breadcrumb-schema-iletisim"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
            />

            <div>
                <Contact />
            </div>
        </>
    )
}