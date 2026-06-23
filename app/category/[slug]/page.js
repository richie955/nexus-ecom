import { notFound } from "next/navigation";
import { ListingPage } from "@/components/commerce/listing-page";
import { getAllCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/data";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  return (
    <ListingPage
      title={category.name}
      eyebrow="Category"
      description={category.description}
      products={getProductsByCategory(category.slug)}
      categories={getAllCategories()}
      lockCategory={category.slug}
    />
  );
}
