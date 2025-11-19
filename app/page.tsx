import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { Product } from "@/types/shopify";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{
      products: { edges: Array<{ node: Product }> };
    }>({
      query: GET_PRODUCTS,
      variables: { first: 8 },
      revalidate: 3600, // 1 hour
    });

    return data.products.edges.map((edge) => ({
      ...edge.node,
      images: (edge.node.images as any).edges.map((img: any) => img.node),
      variants: (edge.node.variants as any).edges.map((v: any) => v.node),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Your Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our premium collection
        </p>
        <Link
          href="/collections/all"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-black text-white hover:bg-gray-800 h-12 px-8 text-lg"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <ProductGrid products={products} columns={4} />
      </section>
    </div>
  );
}
