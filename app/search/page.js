import { ListingPage } from "@/components/commerce/listing-page";
import { getAllCategories, getAllProducts } from "@/lib/data";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return <ListingPage title="Search" eyebrow="Discovery" description="Search, sort, and filter the complete demo catalog." products={getAllProducts()} categories={getAllCategories()} />;
}
