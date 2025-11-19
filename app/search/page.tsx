import { Suspense } from "react";
import { shopifyFetch } from "@/lib/shopify/client";
import { SEARCH_PRODUCTS } from "@/lib/shopify/queries";
import { Product } from "@/types/shopify";
import { ProductGrid } from "@/components/product/product-grid";

interface SearchPageProps {
  searchParams: { q?: string };
}

async function SearchResults({ query }: { query: string }) {
  const data = await shopifyFetch<{
    products: {
      edges: Array<{
        node: Product;
      }>;
    };
  }>({
    query: SEARCH_PRODUCTS,
    variables: {
      query,
      first: 20,
    },
  });

  const products = data.products.edges.map(
    (edge: { node: Product }) => edge.node
  );

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">No results found</h2>
        <p className="mt-2 text-gray-600">
          Try searching with different keywords
        </p>
      </div>
    );
  }

  return <ProductGrid products={products} columns={4} />;
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        {query && (
          <p className="mt-2 text-gray-600">
            Showing results for &quot;{query}&quot;
          </p>
        )}
      </div>

      {query ? (
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <div className="py-16 text-center text-gray-600">
          Enter a search query to find products
        </div>
      )}
    </div>
  );
}

export const metadata = {
  title: "Search Products",
  description: "Search for products in our store",
};
