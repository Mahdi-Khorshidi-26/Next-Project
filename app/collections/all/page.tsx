import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { ProductGrid } from "@/components/product/product-grid";
import { Product } from "@/types/shopify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all products in our store",
};

async function getAllProducts(): Promise<Product[]> {
  try {
    const { data } = await shopifyFetch<{
      products: {
        edges: Array<{
          node: any;
        }>;
      };
    }>({
      query: GET_PRODUCTS,
      variables: { first: 50 },
      revalidate: 1800, // 30 minutes
    });

    return data.products.edges.map((edge: any) => ({
      ...edge.node,
      images: edge.node.images.edges.map((img: any) => img.node),
      variants: edge.node.variants.edges.map((v: any) => v.node),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-600">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600 mb-4">No products found.</p>
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go Home
          </a>
        </div>
      ) : (
        <ProductGrid products={products} columns={4} />
      )}
    </div>
  );
}
