"use client";

import { useEffect, useState } from "react";
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

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/20 w-screen transition-all duration-500 ${
        scrolled
          ? " border-border bg-background/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${
              scrolled
                ? ""
                : "text-white hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            href="/"
            className={`flex items-center gap-2 font-semibold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            <span>Nexus</span>
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={
              scrolled
                ? ""
                : "text-white hover:bg-white/10 hover:text-white"
            }
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Link
            href="/account/wishlist"
            className={`relative hidden h-9 w-9 place-items-center rounded-lg md:grid transition-colors ${
              scrolled
                ? "hover:bg-secondary"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                {count}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className={`hidden h-9 w-9 place-items-center rounded-lg md:grid transition-colors ${
              scrolled
                ? "hover:bg-secondary"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className={`relative ${
              scrolled
                ? ""
                : "text-white hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}