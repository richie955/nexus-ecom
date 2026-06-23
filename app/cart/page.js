"use client";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/product/product-grid";
import { getBestSellers, formatPrice } from "@/lib/data";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items, dispatch, subtotal, discount, shipping, total } = useCart();

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">Cart</h1>
        <div className="mt-8 space-y-4">
          {items.length === 0 && <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">Your cart is empty.</div>}
          {items.map((item) => (
            <div key={item.key} className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-[120px_1fr_auto]">
              <img src={item.images[0]} alt={item.name} className="h-32 w-full rounded-lg object-cover sm:h-28" />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{[item.selectedColor, item.selectedSize].filter(Boolean).join(" · ") || item.brand}</p>
                <p className="mt-3 font-medium">{formatPrice(item.salePrice || item.price)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-border">
                  <button className="p-2" onClick={() => dispatch({ type: "UPDATE_QUANTITY", key: item.key, quantity: item.quantity - 1 })}><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button className="p-2" onClick={() => dispatch({ type: "UPDATE_QUANTITY", key: item.key, quantity: item.quantity + 1 })}><Plus className="h-4 w-4" /></button>
                </div>
                <button onClick={() => dispatch({ type: "REMOVE_ITEM", key: item.key })} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-5 w-5" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold">Recommended for you</h2>
          <ProductGrid products={getBestSellers(4)} />
        </div>
      </section>
      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <Input className="mt-5" placeholder="Coupon code" onBlur={(event) => dispatch({ type: "SET_COUPON", coupon: event.target.value.trim().toUpperCase() })} />
        <div className="mt-5 space-y-3 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row label="Discount" value={`-${formatPrice(discount)}`} />
          <Row label="Shipping" value={shipping ? formatPrice(shipping) : "Free"} />
          <Row label="Total" value={formatPrice(total)} strong />
        </div>
        <Link href="/checkout" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-foreground font-medium text-background">Checkout</Link>
      </aside>
    </div>
  );
}

function Row({ label, value, strong }) {
  return <div className={`flex justify-between ${strong ? "border-t border-border pt-3 text-base font-semibold" : ""}`}><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
