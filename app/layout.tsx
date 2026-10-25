import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/lib/settings-store";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getSiteSettings();
  const favicon = brand.favicon ?? "/favicon.svg";
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: "Shadhiya Speaks — IELTS & Spoken English Training",
      template: "%s | Shadhiya Speaks",
    },
    description:
      "Personalised online IELTS and English training designed to elevate your communication and achieve your band score goals.",
    icons: { icon: favicon, apple: favicon },
    openGraph: {
      siteName: "Shadhiya Speaks",
      type: "website",
      locale: "en_AE",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
