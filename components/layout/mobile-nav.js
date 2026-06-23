"use client";
import Link from "next/link";
import { Home, Grid2X2, Heart, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUI } from "@/context/ui-context";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen, setCartOpen } = useUI();
  const { itemCount } = useCart();
  const items = [
    ["Home", "/", Home],
    ["Shop", "/categories", Grid2X2],
    ["Wishlist", "/account/wishlist", Heart],
    ["Account", "/account", User],
  ];
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 px-2 pb-2 pt-1 backdrop-blur md:hidden">
        {items.map(([label, href, Icon]) => (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground">
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
        <button type="button" onClick={() => setCartOpen(true)} className="relative flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground">
          <ShoppingBag className="h-5 w-5" />
          Cart
          {itemCount > 0 && <span className="absolute right-4 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[9px] text-background">{itemCount}</span>}
        </button>
      </nav>
      <div className={cn("fixed inset-0 z-50 bg-black/40 transition md:hidden", mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0")}>
        <div className={cn("h-full w-[82vw] max-w-sm bg-background p-5 shadow-2xl transition", mobileMenuOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="font-semibold" onClick={() => setMobileMenuOpen(false)}>Nexus</Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}><X className="h-5 w-5" /></Button>
          </div>
          <div className="space-y-2">
            {["Categories", "Collections", "Search", "About", "Contact"].map((label) => (
              <Link key={label} href={`/${label.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-3 font-medium hover:bg-secondary">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
