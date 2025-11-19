import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils/helpers";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const isSoldOut = !product.availableForSale;

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isOnSale && <Badge variant="sale">Sale</Badge>}
          {product.tags.includes("new") && <Badge variant="new">New</Badge>}
          {isSoldOut && <Badge variant="soldOut">Sold Out</Badge>}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {isOnSale && compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
