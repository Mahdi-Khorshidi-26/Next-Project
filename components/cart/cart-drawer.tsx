"use client";

import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CartItem } from "./cart-item";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils/helpers";
import { ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { isOpen, closeCart, cart } = useCart();

  if (!cart) return null;

  const isEmpty = cart.lines.length === 0;

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title="Shopping Cart">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={closeCart} variant="secondary">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 p-4 space-y-4">
            {cart.lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between text-base font-medium">
              <span>Subtotal</span>
              <span>
                {formatPrice(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode
                )}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>

            <a
              href="/cart"
              onClick={closeCart}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white text-black border border-gray-300 hover:bg-gray-50 focus-visible:ring-black h-12 px-8 text-lg w-full"
            >
              View Cart
            </a>

            <a
              href={cart.checkoutUrl}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-black text-white hover:bg-gray-800 focus-visible:ring-black h-12 px-8 text-lg w-full"
            >
              Checkout
            </a>

            <Button onClick={closeCart} variant="secondary" className="w-full">
              Continue Shopping
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}
