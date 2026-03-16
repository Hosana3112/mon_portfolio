import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/smooth-scroll";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hosana Zitti | Développeuse Fullstack Web & Mobile",
  description: "Portfolio de Hosana Zitti, développeuse spécialisée dans la conception d'applications web et mobiles modernes.",
};

import ParticlesBackground from "@/components/ui/ParticlesBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased text-white selection:bg-white selection:text-black`}
      >
        <ParticlesBackground />
        <Preloader />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
