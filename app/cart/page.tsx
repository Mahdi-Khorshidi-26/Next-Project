"use client";

import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/components/cart/cart-item";
import { formatPrice } from "@/lib/utils/helpers";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();

  if (!cart) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const isEmpty = cart.lines.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-lg text-gray-500 mb-6">Your cart is empty</p>
          <Link
            href="/collections/all"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-black text-white hover:bg-gray-800 h-12 px-8"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.lines.map((line) => (
              <div
                key={line.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <CartItem line={line} />
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 p-6 space-y-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(
                      cart.cost.subtotalAmount.amount,
                      cart.cost.subtotalAmount.currencyCode
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>
                      {formatPrice(
                        cart.cost.totalAmount.amount,
                        cart.cost.totalAmount.currencyCode
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={cart.checkoutUrl}
                className="block w-full text-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-black text-white hover:bg-gray-800 h-12 px-6 py-3"
              >
                Proceed to Checkout
              </a>

              <p className="text-xs text-center text-gray-500">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
