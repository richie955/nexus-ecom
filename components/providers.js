"use client";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { UIProvider } from "@/context/ui-context";
import { AuthProvider } from "@/context/auth-context";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </AuthProvider>
  );
}
