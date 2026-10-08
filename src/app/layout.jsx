import { Outfit, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";
import { SmoothFollower } from "@/components/common/SmoothFollower";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
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
      className={`${outfit.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800 antialiased selection:bg-[#a84bff]/20 selection:text-[#a84bff] font-sans">
        <SmoothFollower />
        {children}
      </body>
       {process.env.NODE_ENV === "development" && <Agentation />}
    </html>
  );
}
