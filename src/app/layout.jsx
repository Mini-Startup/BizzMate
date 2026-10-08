import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://bizzmate.com"),
  title: "BizzMate — High-Performance Software Solutions & AI Automations",
  description: "BizzMate is a software solutions agency engineering custom websites, AI workflows, domain chatbots, WhatsApp automations, and enterprise web applications.",
  icons: {
    icon: "/Only Logo.png",
  },
  openGraph: {
    title: "BizzMate — Software Solutions & AI Automations Agency",
    description: "Websites, AI Automations, AI Chatbots, WhatsApp Cloud API Automations, and Web Applications engineered by technical founders.",
    images: [{ url: "/Full Logo Horizontal.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-100 antialiased selection:bg-[#a84bff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
