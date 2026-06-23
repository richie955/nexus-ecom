import Link from "next/link";
import { Star } from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getFeaturedCategories,
  getFeaturedCollections,
  getTrendingProducts,
  getBestSellers,
  getNewArrivals,
} from "@/lib/data";

export default function Home() {
  const categories = getFeaturedCategories();
  const collections = getFeaturedCollections();
  const heroProducts = getTrendingProducts(4);

  return (
    <div>
      <HeroCarousel products={heroProducts} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Shop by department</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Featured categories</h2>
          </div>
          <Link href="/categories" className="hidden text-sm font-medium md:block">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden"><img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="p-4">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Trending products" href="/collection/trending"><ProductGrid products={getTrendingProducts(8)} /></Section>
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-background/60">Limited offer</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Upgrade every shelf, desk, and wardrobe.</h2>
            <p className="mt-4 max-w-xl text-background/70">Use code NEXUS10 at checkout for 10% off your demo order.</p>
          </div>
          <div className="flex items-center md:justify-end">
            <Button variant="secondary" size="lg">Shop the edit</Button>
          </div>
        </div>
      </section>
      <Section title="Best sellers" href="/collection/best-sellers"><ProductGrid products={getBestSellers(8)} /></Section>
      <Section title="New arrivals" href="/collection/new-arrivals"><ProductGrid products={getNewArrivals(8)} /></Section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Curated drops</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Collections</h2>
          </div>
          <Link href="/collections" className="text-sm font-medium">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.slug} href={`/collection/${collection.slug}`} className="relative min-h-72 overflow-hidden rounded-xl">
              <img src={collection.image} alt={collection.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <div className="absolute bottom-0 p-5 text-white">
                <Badge>{collection.badge}</Badge>
                <h3 className="mt-3 text-2xl font-semibold">{collection.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/75">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {["Beautifully organized, fast, and easy to tailor for a client catalog.", "The checkout flow feels reassuring without needing a real backend.", "It has the polish local brands usually cannot get from templates."].map((quote) => (
            <div key={quote} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-sm leading-6 text-muted-foreground">{quote}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-8 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Join the product dispatch</h2>
            <p className="mt-2 text-muted-foreground">New drops, seasonal edits, and private client promos.</p>
          </div>
          <form className="mt-6 flex gap-2 md:mt-0">
            <input className="h-11 rounded-lg border border-border bg-background px-4 text-sm" placeholder="Email address" />
            <Button>Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Section({ title, href, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <Link href={href} className="text-sm font-medium">View all</Link>
      </div>
      {children}
    </section>
  );
}
