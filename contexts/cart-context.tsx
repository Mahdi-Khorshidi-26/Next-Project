"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Cart } from "@/types/shopify";
import Cookies from "js-cookie";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    const cartId = Cookies.get("cartId");
    if (!cartId) return;

    try {
      const response = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []);

  useEffect(() => {
    void refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = async (variantId: string, quantity: number) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantId, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        Cookies.set("cartId", data.cart.id, { expires: 7 });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineId, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  };

  const removeItem = async (lineId: string) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
