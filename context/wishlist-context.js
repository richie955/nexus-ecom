"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexus-wishlist");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("nexus-wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = (product) => {
    setItems((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (productId) => items.some((i) => i.id === productId);
  const remove = (productId) => setItems((prev) => prev.filter((i) => i.id !== productId));

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, remove, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
