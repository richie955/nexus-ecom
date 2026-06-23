import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import collectionsData from "@/data/collections.json";
import reviewsData from "@/data/reviews.json";
import ordersData from "@/data/orders.json";

// ── Products ──────────────────────────────────────────────────────────────────

export function getAllProducts() {
  return productsData;
}

export function getProductBySlug(slug) {
  return productsData.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return productsData.find((p) => p.id === id) || null;
}

export function getProductsByCategory(categorySlug, options = {}) {
  const { sort = "default", minPrice, maxPrice, minRating, inStock, limit } = options;
  let products = productsData.filter((p) => p.category === categorySlug);
  if (inStock) products = products.filter((p) => p.stock > 0);
  if (minPrice !== undefined) products = products.filter((p) => (p.salePrice || p.price) >= minPrice);
  if (maxPrice !== undefined) products = products.filter((p) => (p.salePrice || p.price) <= maxPrice);
  if (minRating !== undefined) products = products.filter((p) => p.rating >= minRating);
  products = sortProducts(products, sort);
  if (limit) products = products.slice(0, limit);
  return products;
}

export function getProductsByCollection(collectionSlug, options = {}) {
  const { sort = "default", limit } = options;
  let products = productsData.filter((p) =>
    Array.isArray(p.collection)
      ? p.collection.includes(collectionSlug)
      : p.collection === collectionSlug
  );
  products = sortProducts(products, sort);
  if (limit) products = products.slice(0, limit);
  return products;
}

export function getFeaturedProducts(limit = 8) {
  return productsData.filter((p) => p.isFeatured).slice(0, limit);
}

export function getNewArrivals(limit = 8) {
  return getProductsByCollection("new-arrivals", { limit });
}

export function getBestSellers(limit = 8) {
  return getProductsByCollection("best-sellers", { limit });
}

export function getTrendingProducts(limit = 8) {
  return getProductsByCollection("trending", { limit });
}

export function getSaleProducts(limit = 8) {
  return productsData.filter((p) => p.salePrice !== null).slice(0, limit);
}

export function getRelatedProducts(product, limit = 4) {
  return productsData
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function searchProducts(query, options = {}) {
  const { sort = "default", limit } = options;
  if (!query || query.trim() === "") return [];
  const q = query.toLowerCase();
  let results = productsData.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      (p.brand && p.brand.toLowerCase().includes(q))
  );
  results = sortProducts(results, sort);
  if (limit) results = results.slice(0, limit);
  return results;
}

function sortProducts(products, sort) {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    case "price-desc":
      return copy.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case "popularity":
      return copy.sort((a, b) => b.reviewsCount - a.reviewsCount);
    default:
      return copy;
  }
}

// ── Categories ────────────────────────────────────────────────────────────────

export function getAllCategories() {
  return categoriesData;
}

export function getCategoryBySlug(slug) {
  return categoriesData.find((c) => c.slug === slug) || null;
}

export function getFeaturedCategories() {
  return categoriesData.filter((c) => c.featured);
}

// ── Collections ───────────────────────────────────────────────────────────────

export function getAllCollections() {
  return collectionsData;
}

export function getCollectionBySlug(slug) {
  return collectionsData.find((c) => c.slug === slug) || null;
}

export function getFeaturedCollections() {
  return collectionsData.filter((c) => c.featured);
}

// ── Reviews ───────────────────────────────────────────────────────────────────

export function getReviewsByProductId(productId) {
  return reviewsData.filter((r) => r.productId === productId);
}

export function getAllReviews() {
  return reviewsData;
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function getAllOrders() {
  return ordersData;
}

export function getOrderById(id) {
  return ordersData.find((o) => o.id === id) || null;
}

export function getOrderByNumber(orderNumber) {
  return ordersData.find((o) => o.orderNumber === orderNumber) || null;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

export function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

export function getDiscountPercentage(price, salePrice) {
  if (!salePrice) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

export function getPriceRange() {
  const prices = productsData.map((p) => p.salePrice || p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];
