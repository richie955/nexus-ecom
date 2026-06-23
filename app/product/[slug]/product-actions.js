"use client";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.variants?.colors?.[0]?.name || "");
  const [size, setSize] = useState(product.variants?.sizes?.[0] || "");
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { setCartOpen } = useUI();

  const add = () => {
    dispatch({ type: "ADD_ITEM", item: { ...product, quantity, selectedColor: color, selectedSize: size } });
    setCartOpen(true);
  };

  return (
    <div className="mt-8 space-y-6">
      {!!product.variants?.colors?.length && (
        <div>
          <p className="mb-3 text-sm font-medium">Color: {color}</p>
          <div className="flex gap-2">
            {product.variants.colors.map((option) => (
              <button key={option.name} aria-label={option.name} onClick={() => setColor(option.name)} className={cn("h-9 w-9 rounded-full border-2", color === option.name ? "border-foreground" : "border-border")} style={{ backgroundColor: option.value }} />
            ))}
          </div>
        </div>
      )}
      {!!product.variants?.sizes?.length && (
        <div>
          <p className="mb-3 text-sm font-medium">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.sizes.map((option) => <button key={option} onClick={() => setSize(option)} className={cn("rounded-lg border px-4 py-2 text-sm font-medium", size === option ? "border-foreground bg-foreground text-background" : "border-border")}>{option}</button>)}
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <div className="flex h-12 items-center rounded-lg border border-border">
          <button className="p-3" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></button>
          <span className="w-10 text-center">{quantity}</span>
          <button className="p-3" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></button>
        </div>
        <Button size="lg" className="flex-1" onClick={add}><ShoppingBag className="h-4 w-4" />Add to cart</Button>
        <Button size="lg" variant="outline" onClick={() => toggle(product)}><Heart className={cn("h-4 w-4", isWishlisted(product.id) && "fill-destructive text-destructive")} /></Button>
      </div>
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border bg-background p-3 md:hidden">
        <Button className="w-full" size="lg" onClick={add}>Add to cart</Button>
      </div>
    </div>
  );
}
