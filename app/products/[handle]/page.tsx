import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import { Product } from "@/types/shopify";
import { ProductPageClient } from "./product-page-client";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

async function getProduct(handle: string): Promise<Product | null> {
  try {
    const { data } = await shopifyFetch<any>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
      revalidate: 300, // 5 minutes
    });

    if (!data.product) return null;

    return {
      ...data.product,
      images: data.product.images.edges.map((edge: any) => edge.node),
      variants: data.product.variants.edges.map((edge: any) => edge.node),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage ? [product.featuredImage.url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <ProductPageClient product={product} />
    </div>
  );
}
