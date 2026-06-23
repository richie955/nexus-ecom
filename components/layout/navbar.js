"use client";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useUI } from "@/context/ui-context";

const links = [
  ["Categories", "/categories"],
  ["Collections", "/collections"],
  ["Search", "/search"],
  ["About", "/about"],
];

export function Navbar() {
  const { itemCount } = useCart();
  const { count } = useWishlist();
  const { setCartOpen, setSearchOpen, setMobileMenuOpen } = useUI();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span>Nexus</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Open search"><Search className="h-5 w-5" /></Button>
          <Link href="/account/wishlist" className="relative hidden h-9 w-9 place-items-center rounded-lg hover:bg-secondary md:grid" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">{count}</span>}
          </Link>
          <Link href="/account" className="hidden h-9 w-9 place-items-center rounded-lg hover:bg-secondary md:grid" aria-label="Account"><User className="h-5 w-5" /></Link>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">{itemCount}</span>}
          </Button>
        </div>
      </div>
    </header>
  );
}
