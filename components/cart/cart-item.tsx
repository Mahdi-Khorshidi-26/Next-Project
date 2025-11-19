"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { CartLine } from "@/types/shopify";
import { formatPrice } from "@/lib/utils/helpers";
import { useState } from "react";

interface CartItemProps {
  line: CartLine;
}

export function CartItem({ line }: CartItemProps) {
  const { updateItem, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const { merchandise, quantity } = line;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await updateItem(line.id, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeItem(line.id);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`flex gap-4 ${isUpdating ? "opacity-50" : ""}`}>
      {/* Image */}
      <Link
        href={`/products/${merchandise.product.handle}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100"
      >
        {merchandise.image && (
          <Image
            src={merchandise.image.url}
            alt={merchandise.product.title}
            fill
            className="object-cover"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${merchandise.product.handle}`}
              className="text-sm font-medium hover:underline"
            >
              {merchandise.product.title}
            </Link>
            <p className="text-sm text-gray-500">
              {merchandise.selectedOptions
                .filter((option) => option.name !== "Title")
                .map((option) => option.value)
                .join(" / ")}
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="text-gray-400 hover:text-red-600 transition-colors disabled:cursor-not-allowed"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center gap-2 border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating}
              className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-medium">
            {formatPrice(
              line.cost.totalAmount.amount,
              line.cost.totalAmount.currencyCode
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
