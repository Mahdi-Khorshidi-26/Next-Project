"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  variantId: string;
  availableForSale: boolean;
  quantity?: number;
}

export function AddToCart({
  variantId,
  availableForSale,
  quantity = 1,
}: AddToCartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem, openCart } = useCart();

  const handleAddToCart = async () => {
    if (!availableForSale) return;

    setIsLoading(true);

    try {
      await addItem(variantId, quantity);
      openCart();
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!availableForSale || isLoading}
      loading={isLoading}
      className="w-full"
      size="lg"
    >
      {!availableForSale ? (
        "Sold Out"
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
