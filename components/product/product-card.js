"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { ProductBadge } from "@/components/ui/badge";
import { formatPrice, getDiscountPercentage } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export function ProductCard({ product, compact = false, variant = "default" }) {
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { setCartOpen } = useUI();
  const price = product.salePrice || product.price;

  const addToCart = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_ITEM", item: product });
    setCartOpen(true);
  };

  const wishlist = (event) => {
    event.preventDefault();
    toggle(product);
  };

    return (
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative  overflow-hidden rounded-xl bg-secondary shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full aspect-[4/5] object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <ProductBadge badge={product.badge} />
            {product.salePrice && (
              <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-destructive">
                -{getDiscountPercentage(product.price, product.salePrice)}%
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={wishlist}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-sm ring-1 ring-black/5 transition hover:scale-105"
          >
            <Heart className={cn("h-4 w-4", isWishlisted(product.id) && "fill-destructive text-destructive")} />
          </button>
        </div>
        <div className="px-1 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.brand}</p>
              <h3 className="mt-1 line-clamp-1 font-semibold">{product.name}</h3>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">{formatPrice(price)}</span>
              {product.salePrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>}
            </div>
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-semibold transition hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <ShoppingBag className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>
      </Link>
    );
  }
