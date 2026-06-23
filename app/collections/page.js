import Link from "next/link";
import { getAllCollections } from "@/lib/data";

export const metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Collections</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Curated merchandising surfaces for campaigns, seasonal edits, and premium picks.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {getAllCollections().map((collection) => (
          <Link key={collection.slug} href={`/collection/${collection.slug}`} className="group relative min-h-80 overflow-hidden rounded-xl">
            <img src={collection.image} alt={collection.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/65">{collection.badge}</p>
              <h2 className="mt-2 text-2xl font-semibold">{collection.name}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-white/75">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
