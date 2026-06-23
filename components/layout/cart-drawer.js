"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/product-card";
import { getTrendingProducts, formatPrice } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { items, dispatch, subtotal, discount, shipping, total } = useCart();
  const recommendations = getTrendingProducts(2);

  return (
    <div className={cn("fixed inset-0 z-50 bg-black/40 transition", cartOpen ? "opacity-100" : "pointer-events-none opacity-0")}>
      <aside className={cn("ml-auto flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition duration-300", cartOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-semibold">Cart</h2>
            <p className="text-sm text-muted-foreground">{items.length} items ready for checkout</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}><X className="h-5 w-5" /></Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center">
              <h3 className="font-semibold">Your cart is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground">Add a few favorites and they will appear here.</p>
              <Button className="mt-5" onClick={() => setCartOpen(false)}>Continue shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 rounded-xl border border-border bg-card p-3">
                  <img src={item.images[0]} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-sm font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.salePrice || item.price)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-border">
                        <button className="p-2" onClick={() => dispatch({ type: "UPDATE_QUANTITY", key: item.key, quantity: item.quantity - 1 })}><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button className="p-2" onClick={() => dispatch({ type: "UPDATE_QUANTITY", key: item.key, quantity: item.quantity + 1 })}><Plus className="h-3 w-3" /></button>
                      </div>
                      <button className="text-muted-foreground hover:text-destructive" onClick={() => dispatch({ type: "REMOVE_ITEM", key: item.key })}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
              <Input placeholder="Coupon code (try NEXUS10)" onBlur={(event) => dispatch({ type: "SET_COUPON", coupon: event.target.value.trim().toUpperCase() })} />
              <div className="grid grid-cols-2 gap-3">
                {recommendations.map((product) => <ProductCard key={product.id} product={product} compact />)}
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border p-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span>-{formatPrice(discount)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Estimated shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link href="/cart" onClick={() => setCartOpen(false)} className="inline-flex h-11 items-center justify-center rounded-lg border border-border text-sm font-medium">View cart</Link>
            <Link href="/checkout" onClick={() => setCartOpen(false)} className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background">Checkout</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
