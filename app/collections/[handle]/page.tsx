import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify/queries";
import { ProductGrid } from "@/components/product/product-grid";
import { Collection, Product } from "@/types/shopify";
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

async function getCollection(handle: string): Promise<Collection | null> {
  try {
    const { data } = await shopifyFetch<{ collection: any }>({
      query: GET_COLLECTION_BY_HANDLE,
      variables: { handle, first: 24 },
      revalidate: 1800, // 30 minutes
    });

    if (!data.collection) return null;

    const products: Product[] = data.collection.products.edges.map(
      (edge: any) => ({
        ...edge.node,
        images: edge.node.images.edges.map((img: any) => img.node),
        variants: edge.node.variants.edges.map((v: any) => v.node),
      })
    );

    return {
      ...data.collection,
      products,
    };
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: collection.seo.title || collection.title,
    description: collection.seo.description || collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Collection Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-gray-600">{collection.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {collection.products.length}{" "}
          {collection.products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={collection.products} columns={4} />
    </div>
  );
}
