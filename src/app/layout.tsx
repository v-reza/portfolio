import type { Metadata } from "next";
import { Caveat, JetBrains_Mono, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/lib/smooth-scroll";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Newsreader({ variable: "--font-serif", style: "italic", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "M Zulfi Fahreza: Fullstack & AI Engineer",
  description:
    "Fullstack and AI engineer from Malang, Indonesia. A train ride through four years of production systems for enterprise and government teams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${hand.variable} ${mono.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
