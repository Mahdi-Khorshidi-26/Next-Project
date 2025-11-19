"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";

export function CartTrigger() {
  const { cart, openCart } = useCart();
  const itemCount = cart?.totalQuantity || 0;

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 rounded-md transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
