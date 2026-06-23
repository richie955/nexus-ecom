import { ProductCard } from "@/components/product/product-card";

export function ProductGrid({ products, variant = "default" }) {
  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <h3 className="font-semibold">No products found</h3>
        <p className="mt-2 text-sm text-muted-foreground">Try a broader search or fewer filters.</p>
      </div>
    );
  }

  return (
    <div className={variant === "catalog" ? "grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3" : "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
