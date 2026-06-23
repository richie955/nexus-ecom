"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = `${action.item.id}-${action.item.selectedColor || ""}-${action.item.selectedSize || ""}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + (action.item.quantity || 1) } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, key, quantity: action.item.quantity || 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.key !== action.key) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_COUPON":
      return { ...state, coupon: action.coupon };
    case "LOAD":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const initialState = { items: [], coupon: null };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexus-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD", items: parsed });
      }
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("nexus-cart", JSON.stringify(state.items));
  }, [state.items]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + (i.salePrice || i.price) * i.quantity, 0);
  const discount = state.coupon === "NEXUS10" ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  return (
    <CartContext.Provider value={{ ...state, itemCount, subtotal, discount, shipping, total, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
