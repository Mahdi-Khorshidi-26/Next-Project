import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our product collections",
};

const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

async function getCollections() {
  try {
    const { data } = await shopifyFetch<{
      collections: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
            description: string;
            image?: {
              url: string;
              altText?: string;
            };
          };
        }>;
      };
    }>({
      query: GET_COLLECTIONS,
      variables: { first: 20 },
      revalidate: 3600,
    });

    return data.collections.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
        <p className="mt-2 text-gray-600">Browse our curated collections</p>
      </div>

      {collections.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600 mb-4">No collections found.</p>
          <Link
            href="/collections/all"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all"
            >
              {collection.image && (
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {collection.title}
                </h2>
                {collection.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
