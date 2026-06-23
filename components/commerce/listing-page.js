"use client";

import { useMemo, useState } from "react";
import {
SlidersHorizontal,
X,
} from "lucide-react";

import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

function filterProducts(products, filters) {
return products
.filter((product) => {
const price = product.salePrice || product.price;
const query = filters.query.trim().toLowerCase();


  return (
    (!query ||
      product.name.toLowerCase().includes(query) ||
      product.description
        .toLowerCase()
        .includes(query) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      )) &&
    (!filters.category ||
      product.category === filters.category) &&
    price >= filters.minPrice &&
    price <= filters.maxPrice &&
    product.rating >= filters.rating &&
    (!filters.inStock || product.stock > 0)
  );
})
.sort((a, b) => {
  const ap = a.salePrice || a.price;
  const bp = b.salePrice || b.price;

  if (filters.sort === "price-asc")
    return ap - bp;

  if (filters.sort === "price-desc")
    return bp - ap;

  if (filters.sort === "rating")
    return b.rating - a.rating;

  if (filters.sort === "popularity")
    return b.reviewsCount - a.reviewsCount;

  if (filters.sort === "newest")
    return Number(b.isNew) - Number(a.isNew);

  return 0;
});

}

export function ListingPage({
title,
eyebrow,
description,
products,
categories,
lockCategory,
}) {
const defaultFilters = {
query: "",
category: lockCategory || "",
minPrice: 0,
maxPrice: 500,
rating: 0,
inStock: false,
sort: "default",
};

const [drawerOpen, setDrawerOpen] =
useState(false);

const [filters, setFilters] =
useState(defaultFilters);

const filtered = useMemo(
() => filterProducts(products, filters),
[products, filters]
);

const setFilter = (key, value) =>
setFilters((current) => ({
...current,
[key]: value,
}));

const resetFilters = () =>
setFilters(defaultFilters);

const controls = ( <div className="space-y-7">
{/* Search */} <div> <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
Search </label>


    <Input
      value={filters.query}
      onChange={(event) =>
        setFilter(
          "query",
          event.target.value
        )
      }
      placeholder="Search products..."
    />
  </div>

  {/* Category */}
  {!lockCategory && (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Category
      </label>

      <Select
        value={filters.category}
        onChange={(event) =>
          setFilter(
            "category",
            event.target.value
          )
        }
        className="w-full"
      >
        <option value="">
          All categories
        </option>

        {categories.map((category) => (
          <option
            key={category.slug}
            value={category.slug}
          >
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  )}

  {/* Price */}
  <div>
    <div className="mb-3 flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Max Price
      </span>

      <span className="text-sm font-medium">
        ${filters.maxPrice}
      </span>
    </div>

    <input
      type="range"
      min="25"
      max="500"
      step="25"
      value={filters.maxPrice}
      onChange={(event) =>
        setFilter(
          "maxPrice",
          Number(event.target.value)
        )
      }
      className="w-full accent-foreground"
    />
  </div>

  {/* Rating */}
  <div>
    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      Rating
    </label>

    <Select
      value={filters.rating}
      onChange={(event) =>
        setFilter(
          "rating",
          Number(event.target.value)
        )
      }
      className="w-full"
    >
      <option value="0">
        Any Rating
      </option>
      <option value="4">
        ★★★★ & Up
      </option>
      <option value="4.5">
        ★★★★½ & Up
      </option>
    </Select>
  </div>

  {/* Stock */}
  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
    <label className="flex cursor-pointer items-center justify-between">
      <div>
        <p className="text-sm font-medium">
          In Stock Only
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Hide unavailable products
        </p>
      </div>

      <input
        type="checkbox"
        checked={filters.inStock}
        onChange={(event) =>
          setFilter(
            "inStock",
            event.target.checked
          )
        }
        className="h-4 w-4 accent-foreground"
      />
    </label>
  </div>
</div>

);

return ( <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
{/* Header */} <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"> <div>
{eyebrow && ( <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
{eyebrow} </p>
)}


      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </div>

    <div className="flex gap-3">
      <Button
        variant="outline"
        className="lg:hidden"
        onClick={() =>
          setDrawerOpen(true)
        }
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
      </Button>

      <Select
        value={filters.sort}
        onChange={(event) =>
          setFilter(
            "sort",
            event.target.value
          )
        }
      >
        {SORT_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  </div>

  {/* Content */}
  <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
    {/* Desktop Sidebar */}
    <aside
      className="
        sticky
        top-24
        hidden
        h-fit
        rounded-3xl
        border
        border-border/60
        bg-card/70
        p-6
        backdrop-blur-xl
        lg:block
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Filters
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Refine your search
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>

      <div className="my-6 h-px bg-border" />

      {controls}
    </aside>

    {/* Products */}
    <section>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} products
        </p>

        <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {filtered.length} Results
        </div>
      </div>

      <ProductGrid
        products={filtered}
        variant="catalog"
      />
    </section>
  </div>

  {/* Mobile Drawer */}
  <div
    className={cn(
      "fixed inset-0 z-50 bg-black/40 transition lg:hidden",
      drawerOpen
        ? "opacity-100"
        : "pointer-events-none opacity-0"
    )}
  >
    <div
      className={cn(
        "ml-auto h-full w-[88vw] max-w-sm bg-background p-6 shadow-2xl transition",
        drawerOpen
          ? "translate-x-0"
          : "translate-x-full"
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            Filters
          </h2>

          <p className="text-xs text-muted-foreground">
            Refine products
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setDrawerOpen(false)
          }
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {controls}

      <div className="mt-8 flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={resetFilters}
        >
          Reset
        </Button>

        <Button
          className="flex-1"
          onClick={() =>
            setDrawerOpen(false)
          }
        >
          Apply
        </Button>
      </div>
    </div>
  </div>
</div>

);
}
