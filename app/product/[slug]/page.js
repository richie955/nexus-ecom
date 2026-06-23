import { notFound } from "next/navigation";
import { Check, RotateCcw, ShieldCheck, Truck, Star } from "lucide-react";
import { ProductActions } from "./product-actions";
import { ProductGrid } from "@/components/product/product-grid";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getAllProducts, getProductBySlug, getRelatedProducts, getReviewsByProductId, formatPrice } from "@/lib/data";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const reviews = getReviewsByProductId(product.id);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="grid gap-4 md:grid-cols-[88px_1fr]">
          <div className="hidden space-y-3 md:block">
            {product.images.map((image) => <img key={image} src={image} alt="" className="aspect-square rounded-lg object-cover" />)}
          </div>
          <div className="overflow-hidden rounded-xl bg-secondary">
            <img src={product.images[0]} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            {product.badge && <Badge>{product.badge}</Badge>}
            <span className="text-sm text-muted-foreground">{product.brand}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {product.rating}</span>
            <span>{product.reviewsCount} reviews</span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatPrice(product.salePrice || product.price)}</span>
            {product.salePrice && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>}
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">{product.description}</p>
          <ProductActions product={product} />
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                [Truck, "Fast delivery", "Ships in 1-2 days"],
                [RotateCcw, "Easy returns", "14-day return window"],
                [ShieldCheck, "Secure checkout", "Protected mock payment"],
              ].map(([Icon, label, copy]) => (
                <div key={label} className="flex gap-3 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{copy}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4">
              <Tabs
                tabs={[
                  { value: "details", label: "Details", content: <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{product.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-success" />{feature}</li>)}</ul> },
                  { value: "shipping", label: "Shipping", content: <p className="text-sm leading-6 text-muted-foreground">Free shipping over $100. Orders ship in 1-2 business days with tracking and delivery protection.</p> },
                  { value: "returns", label: "Returns", content: <p className="text-sm leading-6 text-muted-foreground">Return unused items within 14 days. Exchanges and store credit are processed instantly in this mock flow.</p> },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Customer reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {(reviews.length ? reviews : [{ id: "demo", name: "Ava", rating: 5, title: "Excellent", comment: "Premium feel, quick delivery, and clean packaging." }]).slice(0, 3).map((review) => (
            <div key={review.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex text-amber-400">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <h3 className="mt-3 font-semibold">{review.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              <p className="mt-4 text-sm font-medium">{review.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h2 className="mb-5 text-2xl font-semibold">Related products</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
