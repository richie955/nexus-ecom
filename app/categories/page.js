import Link from "next/link";
import { getAllCategories } from "@/lib/data";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  const categories = getAllCategories();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Categories</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Four core departments with realistic merchandising patterns.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`} className="group grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[.9fr_1fr]">
            <img src={category.image} alt={category.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <p className="mt-3 text-muted-foreground">{category.description}</p>
              <p className="mt-6 text-sm font-medium">{category.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
