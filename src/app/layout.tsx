import type { Metadata } from "next";
import { Anton, Archivo, Rajdhani } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const display = Rajdhani({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const heroFont = Anton({ subsets: ["latin"], weight: "400", variable: "--font-hero", display: "swap" });

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: { title: site.title, description: site.description, locale: "pt_BR", type: "website", siteName: site.name },
  twitter: { card: "summary", title: site.title, description: site.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${display.variable} ${archivo.variable} ${heroFont.variable}`}><a className="skip-link" href="#conteudo">Ir para o conteúdo</a>{children}</body></html>;
}
