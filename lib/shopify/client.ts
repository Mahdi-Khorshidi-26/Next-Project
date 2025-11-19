import type { ShopifyResponse } from "@/types/shopify";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN!;

if (!domain || !storefrontAccessToken) {
  throw new Error(
    "Missing Shopify environment variables. Please check your .env.local file."
  );
}

const endpoint = `https://${domain}/api/2024-10/graphql.json`;

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  revalidate?: number;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = "force-cache",
  revalidate,
}: ShopifyFetchOptions): Promise<ShopifyResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache,
      next: revalidate ? { revalidate } : undefined,
    });

    // Handle rate limiting (429)
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;

      console.warn(`Rate limited. Retrying after ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Retry the request
      return shopifyFetch({ query, variables, cache, revalidate });
    }

    // Handle server errors (5xx)
    if (response.status >= 500) {
      console.error(`Shopify API error: ${response.status}`);
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const json: ShopifyResponse<T> = await response.json();

    // Handle GraphQL errors
    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
    }

    return json;
  } catch (error) {
    console.error("Shopify API fetch error:", error);
    throw error;
  }
}

// Helper function to format money
export function formatMoney(money: {
  amount: string;
  currencyCode: string;
}): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  });

  return formatter.format(parseFloat(money.amount));
}

// Helper function to get variant by selected options
export function getVariantByOptions(
  product: any,
  selectedOptions: Record<string, string>
): any {
  return product.variants.find((variant: any) =>
    variant.selectedOptions.every(
      (option: any) => selectedOptions[option.name] === option.value
    )
  );
}
