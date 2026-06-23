import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchDialog } from "@/components/layout/search-dialog";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: {
    default: "Nexus — Premium Ecommerce",
    template: "%s | Nexus",
  },
  description:
    "Discover premium electronics, fashion, books, and home decor at Nexus. Shop the latest trends with fast shipping and easy returns.",
  keywords: ["ecommerce", "shopping", "electronics", "fashion", "premium"],
  authors: [{ name: "Nexus Store" }],
  creator: "Nexus Store",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexus-store.com",
    title: "Nexus — Premium Ecommerce",
    description: "Discover premium products at Nexus Store.",
    siteName: "Nexus Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus — Premium Ecommerce",
    description: "Discover premium products at Nexus Store.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchDialog />
          <MobileNav />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
