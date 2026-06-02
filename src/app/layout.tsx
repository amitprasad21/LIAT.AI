import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { LeftSidebar } from "@/components/navigation/LeftSidebar";
import { DeckProvider } from "@/context/DeckContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dubai Mall | Cinematic Interactive Sales Deck",
  description: "Experience the world's premier retail, luxury, and entertainment destination. An interactive, self-contained showcase for leasing, corporate sponsorships, and premier venue bookings.",
  keywords: "Dubai Mall, Leasing, Retail Space, Sponsorship, Event Venue, Luxury Brands, Downtown Dubai",
  authors: [{ name: "Emaar Properties" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Dubai Mall | Cinematic Interactive Sales Deck",
    description: "Experience the world's premier retail, luxury, and entertainment destination.",
    url: "https://thedubaimall.com",
    siteName: "Dubai Mall Interactive Sales Deck",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Mall | Cinematic Interactive Sales Deck",
    description: "Experience the world's premier retail, luxury, and entertainment destination.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} bg-background text-text-primary font-sans antialiased min-h-screen selection:bg-gold selection:text-white`}
      >
        <DeckProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:font-semibold focus:rounded-md focus-ring"
          >
            Skip to content
          </a>

          {/* Static Skeuomorphic Left Navigation Panel */}
          <LeftSidebar />

          {/* Content Viewport Container shifted right to clear Pinned Sidebar */}
          <div id="main-content" className="w-full min-h-screen lg:px-28 pb-24 lg:pb-0 transition-all duration-300">
            {children}
          </div>
        </DeckProvider>
      </body>
    </html>
  );
}
