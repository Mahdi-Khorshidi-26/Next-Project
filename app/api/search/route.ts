import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { SEARCH_PRODUCTS } from "@/lib/shopify/queries";
import { Product } from "@/types/shopify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    const { data } = await shopifyFetch<{
      products: {
        edges: Array<{
          node: Product;
        }>;
      };
    }>({
      query: SEARCH_PRODUCTS,
      variables: {
        query,
        first: limit,
      },
    });

    const products = data.products.edges.map(
      (edge: { node: Product }) => edge.node
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
