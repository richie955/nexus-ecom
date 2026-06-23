"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

export function HeroCarousel({ products }) {
  const slides = useMemo(() => products.slice(0, 4), [products]);

  const [active, setActive] = useState(0);

  const product = slides[active];

  useEffect(() => {
    if (!slides.length) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const go = (direction) => {
    setActive(
      (current) =>
        (current + direction + slides.length) % slides.length
    );
  };

  if (!product) return null;

  return (
    <section className="relative h-[85vh] md:h-[93vh] overflow-hidden bg-black text-white">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.images[0]}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-all duration-1000",
            index === active
              ? "scale-100 opacity-100"
              : "scale-110 opacity-0"
          )}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex my-auto h-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        {/* Hero Content */}
        <div className="flex flex-1 items-center">
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              {product.brand}
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-[0.95] tracking-tight md:text-4xl lg:text-[3.25rem]">
              Curated products.
              <br />
              Confident checkout.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
              Premium electronics, fashion, books and home decor
              arranged for effortless discovery and a seamless
              shopping experience.
            </p>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="grid gap-6 border-t md:mb-15 border-white/10 pt-6 md:grid-cols-[400px_1fr] md:items-center">
          {/* Product Card */}
          <Link
            href={`/product/${product.slug}`}
            className="
              group
              flex
              gap-4
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur-xl
              ring-1
              ring-white/10
              transition-all
              duration-300
              hover:bg-white/15
            "
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="
                h-24
                w-24
                shrink-0
                rounded-xl
                object-cover
              "
            />

            <div className="min-w-0 flex-1">
              <h2 className="line-clamp-1 text-lg font-semibold">
                {product.name}
              </h2>

              <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-white/65">
                {product.description}
              </p>

              <p className="mt-3 text-xl font-semibold">
                {formatPrice(
                  product.salePrice || product.price
                )}
              </p>
            </div>
          </Link>

          {/* CTA Area */}
          <div className="flex flex-col items-start md:items-end">
            <p className="max-w-md text-sm leading-6 text-white/65 md:text-right">
              Discover carefully selected products designed around
              quality, aesthetics and everyday utility. Shop best
              sellers, new arrivals and exclusive collections.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`/product/${product.slug}`}
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2.5
                  rounded-full
                  bg-white
                  px-5
                  text-sm
                  font-medium
                  text-black
                  transition-all
                  hover:scale-[1.02]
                "
              >
                View Product

                <span
                  className="
                    grid
                    h-7
                    w-7
                    place-items-center
                    rounded-full
                    bg-black
                    text-white
                  "
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-full
                    bg-white/10
                    backdrop-blur-xl
                    ring-1
                    ring-white/10
                    transition
                    hover:bg-white/15
                  "
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-full
                    bg-white/10
                    backdrop-blur-xl
                    ring-1
                    ring-white/10
                    transition
                    hover:bg-white/15
                  "
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Indicators */}
            <div className="mt-4 flex gap-2 md:justify-end">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === active
                      ? "w-12 bg-white"
                      : "w-5 bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}