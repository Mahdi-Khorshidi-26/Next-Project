"use client";

import { useState, useEffect } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { VariantSelector } from "@/components/product/variant-selector";
import { AddToCart } from "@/components/product/add-to-cart";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils/helpers";

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Initialize selected options
  useEffect(() => {
    const initial: Record<string, string> = {};
    product.options.forEach((option) => {
      initial[option.name] = option.values[0];
    });
    setSelectedOptions(initial);
  }, [product.options]);

  // Update selected variant when options change
  useEffect(() => {
    const variant = product.variants.find((v) =>
      v.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      )
    );
    if (variant) {
      setSelectedVariant(variant);
    }
  }, [selectedOptions, product.variants]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const price = selectedVariant.priceV2;
  const compareAtPrice = selectedVariant.compareAtPriceV2;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Gallery */}
      <div>
        <ProductGallery images={product.images} productName={product.title} />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Badges */}
        <div className="flex gap-2">
          {isOnSale && <Badge variant="sale">Sale</Badge>}
          {product.tags.includes("new") && <Badge variant="new">New</Badge>}
          {!selectedVariant.availableForSale && (
            <Badge variant="soldOut">Sold Out</Badge>
          )}
        </div>

        {/* Title & Price */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {product.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {isOnSale && compareAtPrice && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(
                  compareAtPrice.amount,
                  compareAtPrice.currencyCode
                )}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />

        {/* Variant Selector */}
        {product.options.length > 0 && product.options[0].name !== "Title" && (
          <VariantSelector
            options={product.options}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        )}

        {/* Add to Cart */}
        <AddToCart
          variantId={selectedVariant.id}
          availableForSale={selectedVariant.availableForSale}
        />

        {/* Additional Info */}
        <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
          {product.vendor && <p>Brand: {product.vendor}</p>}
          {selectedVariant.sku && <p>SKU: {selectedVariant.sku}</p>}
        </div>
      </div>
    </div>
  );
}
