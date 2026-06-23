"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProducts, formatPrice } from "@/lib/data";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query, { limit: 6 }), [query]);
  const trends = ["wireless headphones", "linen blazer", "desk lamp", "design books"];

  return (
    <div className={cn("fixed inset-0 z-50 bg-black/45 p-4 transition", searchOpen ? "opacity-100" : "pointer-events-none opacity-0")}>
      <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories, brands" className="border-0 bg-transparent p-0 shadow-none focus:ring-0" autoFocus />
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}><X className="h-5 w-5" /></Button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {!query && (
            <div>
              <h3 className="text-sm font-semibold">Trending searches</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {trends.map((trend) => <button key={trend} onClick={() => setQuery(trend)} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{trend}</button>)}
              </div>
            </div>
          )}
          {query && (
            <div className="space-y-2">
              {results.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} onClick={() => setSearchOpen(false)} className="flex gap-3 rounded-lg p-2 hover:bg-secondary">
                  <img src={product.images[0]} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-1 text-sm font-semibold">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.brand} · {formatPrice(product.salePrice || product.price)}</p>
                  </div>
                </Link>
              ))}
              {results.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No products found.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
