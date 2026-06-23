"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { ProductGrid } from "@/components/product/product-grid";
import { useWishlist } from "@/context/wishlist-context";

export default function WishlistPage() {
  const { items } = useWishlist();
  return (
    <AccountShell title="Wishlist" description="Keep products here while you compare options or plan a future order.">
      {items.length > 0 ? (
        <ProductGrid products={items} />
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary"><Heart className="h-6 w-6" /></span>
          <h2 className="mt-5 text-xl font-semibold">No saved products yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Use the heart icon on product cards to build a list of favorites for later.</p>
          <Link href="/search" className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background">Browse products</Link>
        </div>
      )}
    </AccountShell>
  );
}
