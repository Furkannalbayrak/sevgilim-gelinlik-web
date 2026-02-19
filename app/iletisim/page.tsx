import Contact from "@/components/contact/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "İletişim | Sevgilim Gelinlik",
    description: "Sevgilim Gelinlik ile iletişime geçin. Fatih'teki mağazamızı ziyaret edin veya bizi arayın.",
    alternates: {
        canonical: "https://www.sevgilimgelinlik.com.tr/iletisim"
    },
};

export default function ContactPage(){
    return(
        <div>
            <Contact/>
        </div>
    )
}