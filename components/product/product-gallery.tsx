"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageType } from "@/types/shopify";

interface ProductGalleryProps {
  images: ImageType[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].altText || productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImage(index)}
              className={`
                relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all
                ${
                  selectedImage === index
                    ? "ring-2 ring-black"
                    : "opacity-60 hover:opacity-100"
                }
              `}
            >
              <Image
                src={image.url}
                alt={image.altText || `${productName} ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
