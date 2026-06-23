import { notFound } from "next/navigation";
import { ListingPage } from "@/components/commerce/listing-page";
import { getAllCategories, getAllCollections, getCollectionBySlug, getProductsByCollection } from "@/lib/data";

export function generateStaticParams() {
  return getAllCollections().map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  return (
    <ListingPage
      title={collection.name}
      eyebrow={collection.badge}
      description={collection.description}
      products={getProductsByCollection(collection.slug)}
      categories={getAllCategories()}
    />
  );
}
