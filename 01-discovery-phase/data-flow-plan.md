# Data Flow Plan

## Next.js Headless Shopify Storefront

**Project Name:** [Your Brand] Headless Storefront  
**Last Updated:** November 19, 2025

---

## 1. Overview

This document outlines how data flows through the headless Shopify storefront architecture, from data sources through the application layers to the user interface.

---

## 2. Data Sources

### Primary: Shopify Storefront API (GraphQL)

```yaml
Endpoint: https://{shop}.myshopify.com/api/2024-10/graphql.json
Protocol: GraphQL over HTTPS
Authentication: X-Shopify-Storefront-Access-Token header

Data Provided:
  - Products & variants
  - Collections
  - Cart management
  - Customer authentication
  - Checkout creation
  - Product recommendations
  - Shop metadata
  - Policies (shipping, returns, privacy)

Rate Limits:
  - Cost-based system (1000 points/second)
  - Throttle: 50 requests/second
  - Retry after rate limit: exponential backoff
```

### Secondary: Shopify Admin API (Optional)

```yaml
Endpoint: https://{shop}.myshopify.com/admin/api/2024-10/graphql.json
Protocol: GraphQL over HTTPS
Authentication: X-Shopify-Access-Token header

Use Cases:
  - Custom dashboard features
  - Advanced order management
  - Inventory synchronization
  - Webhook registration
  - Metafield management (custom data)

Access: Server-side only (never expose to client)
```

### Tertiary: Headless CMS (Optional - Sanity/Contentful)

```yaml
Purpose: Marketing content management
Protocol: GraphQL / REST API
Authentication: API key

Content Types:
  - Blog posts
  - Landing pages
  - Homepage sections
  - Banners & promotions
  - Editorial content
  - SEO metadata

Integration: Server-side fetch, ISR cache
```

### Additional Data Sources

```yaml
Search (Algolia):
  - Product search index
  - Autocomplete suggestions
  - Faceted filtering

Analytics (GA4, Segment):
  - User behavior tracking
  - Event collection
  - Conversion tracking

Reviews (Yotpo/Judge.me):
  - Product reviews
  - Star ratings
  - User-generated content

Marketing (Klaviyo):
  - Email subscriptions
  - Customer profiles
  - Abandoned cart recovery
```

---

## 3. Data Flow Architecture

### Request Flow Diagram

```
┌─────────────┐
│   Browser   │ User initiates request (e.g., visits /products/t-shirt)
└──────┬──────┘
       │ HTTPS Request
       ↓
┌─────────────────────────────────────────────────────┐
│  Vercel Edge Network (CDN)                          │
│  ┌─────────────────────────────────────┐            │
│  │  Edge Cache Check                   │            │
│  │  - Cache Hit? Return cached HTML    │            │
│  │  - Cache Miss? Forward to Next.js   │            │
│  └─────────────────────────────────────┘            │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓ (Cache Miss)
┌─────────────────────────────────────────────────────┐
│  Next.js Runtime (Vercel Serverless / Edge)         │
│  ┌─────────────────────────────────────┐            │
│  │  Route Handler                      │            │
│  │  - Match route: /products/[handle]  │            │
│  │  - Check ISR cache                  │            │
│  │  - ISR Hit? Return HTML             │            │
│  │  - ISR Miss? Fetch from Shopify     │            │
│  └─────────────────────────────────────┘            │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓ (ISR Miss - Data needed)
┌─────────────────────────────────────────────────────┐
│  API Layer - Data Fetching                          │
│  ┌─────────────────────────────────────┐            │
│  │  lib/shopify/client.ts              │            │
│  │  - Build GraphQL query              │            │
│  │  - Add authentication               │            │
│  │  - Handle rate limiting             │            │
│  │  - Execute fetch()                  │            │
│  └─────────────────────────────────────┘            │
└────────────────────┬────────────────────────────────┘
                     │ GraphQL Query
                     ↓
┌─────────────────────────────────────────────────────┐
│  Shopify Storefront API                             │
│  - Process GraphQL query                            │
│  - Return product data (JSON)                       │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓ Response (JSON)
┌─────────────────────────────────────────────────────┐
│  Next.js - Data Processing                          │
│  - Transform API response                           │
│  - Render React Server Component                    │
│  - Generate HTML                                    │
│  - Cache HTML (ISR)                                 │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓ HTML Response
┌─────────────────────────────────────────────────────┐
│  Edge Network                                       │
│  - Cache HTML at edge                               │
│  - Return to user                                   │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────┐
│   Browser   │ Render page, hydrate interactive components
└─────────────┘
```

---

## 4. Data Flow Patterns by Feature

### Pattern 1: Product Detail Page (ISR)

```yaml
User Action: Navigate to /products/wireless-headphones

Flow:
  1. Browser → Request /products/wireless-headphones

  2. Edge Cache Check
     - If cached (< 5 min): Return HTML immediately ✅
     - If expired: Continue to Next.js

  3. Next.js ISR Cache Check
     - If cached: Return HTML, schedule background revalidation
     - If expired: Fetch fresh data

  4. Shopify API Call (if needed)
     Query: productByHandle(handle: "wireless-headphones")
     Fields: id, title, description, images, variants, price, etc.

  5. Data Processing
     - Transform Shopify response
     - Format prices (e.g., $99.99)
     - Process variant options
     - Generate SEO metadata

  6. Component Rendering (Server Component)
     - ProductPage component renders with data
     - Generate static HTML
     - Cache for 5 minutes

  7. Response to Browser
     - HTML sent to user
     - JavaScript for interactive features (Add to Cart) loads
     - Images lazy load

Caching Strategy:
  - Edge: 5 minutes
  - ISR: 5 minutes (revalidate)
  - On-demand revalidation on product update webhook
```

### Pattern 2: Shopping Cart (Real-Time)

```yaml
User Action: Add product to cart

Flow:
  1. User clicks "Add to Cart" button

  2. Client Component Event
     - Form submission via Server Action
     - Send: productId, variantId, quantity

  3. Server Action Execution
     File: app/actions/cart.ts
     - Get current cart ID (from cookie)
     - If no cart: Create new cart via Shopify API

  4. Shopify Mutation
     Mutation: cartLinesAdd(cartId, lines)
     - Add item to cart
     - Return updated cart object

  5. Response Processing
     - Update cart cookie with cart ID
     - Return updated cart data

  6. Client State Update
     - Update React Context (cart state)
     - Update cart badge count
     - Show success notification
     - Update cart drawer UI

  7. Real-Time Display
     - Cart drawer slides open
     - Shows updated items
     - Displays new total

Caching: None (always real-time)
State Management: React Context + Cookies
```

### Pattern 3: Collection Page with Filters (SSR + Client)

```yaml
User Action: Browse /collections/mens-shoes?color=black&size=10

Flow:
  1. Request with Query Parameters
     - URL contains filter state
     - SEO-friendly (indexable by search engines)

  2. Server-Side Rendering (SSR)
     - No caching (dynamic based on filters)
     - Parse query params: { color: "black", size: "10" }

  3. Shopify API Query
     Query: collection(handle: "mens-shoes")
     Filters:
       - variantOption: { name: "Color", value: "black" }
       - variantOption: { name: "Size", value: "10" }
     Fields: products(first: 24)

  4. Data Processing
     - Filter and sort products
     - Paginate results
     - Extract available filter options

  5. Component Rendering
     - CollectionPage (Server Component)
     - ProductGrid (Server Component)
     - FilterSidebar (Client Component for interactivity)

  6. Client Hydration
     - Filter checkboxes become interactive
     - Clicking filter → Update URL → Server re-renders

  7. Filter Interaction (Client-Side)
     - User checks "Blue" color filter
     - URL updates: ?color=black,blue&size=10
     - Browser navigation (SPA-style)
     - Server fetches new data
     - React updates UI (fast transition)

Caching: None (user-specific filters)
SEO: Fully crawlable (server-rendered HTML)
```

### Pattern 4: Search (Hybrid: Algolia + Shopify)

```yaml
User Action: Type "leather jacket" in search box

Flow:
  1. Search Input (Client Component)
     - User types in search field
     - Debounced input (300ms delay)

  2. Autocomplete (Client-Side)
     - API route: /api/search/autocomplete
     - Query Algolia for instant suggestions
     - Display dropdown with matches

  3. Full Search Submission
     - User hits Enter or clicks suggestion
     - Navigate to: /search?q=leather+jacket

  4. Search Results Page (SSR)
     - Server-side rendering
     - Query Algolia for full results
     - Fallback: Shopify predictiveSearch API

  5. Results Processing
     - Rank by relevance
     - Apply filters (price, brand, etc.)
     - Paginate (24 per page)

  6. Component Rendering
     - SearchResults component
     - ProductGrid with results
     - Filter sidebar

  7. Client Interactivity
     - Filters update URL
     - Instant filtering via Algolia
     - No page reload

Data Sources:
  - Primary: Algolia (fast, typo-tolerant)
  - Fallback: Shopify Storefront API
  - Sync: Shopify products → Algolia index (webhook)
```

### Pattern 5: Customer Account (Authenticated)

```yaml
User Action: View order history at /account/orders

Flow:
  1. Request /account/orders

  2. Middleware Authentication Check
     File: middleware.ts
     - Check for customerAccessToken cookie
     - If missing: Redirect to /login
     - If present: Validate token with Shopify

  3. Token Validation
     Query: customer(customerAccessToken)
     - If invalid: Clear cookie, redirect to /login
     - If valid: Allow access, attach customer data

  4. Shopify Customer Query (SSR)
     Query: customer { orders(first: 20) { ... } }
     - Fetch authenticated customer's orders
     - Include: order number, date, items, status, total

  5. Server-Side Rendering
     - AccountOrdersPage component
     - Render with customer data
     - Never cache (private data)

  6. Response
     - HTML with order history
     - Client hydration for interactive elements

Security:
  - httpOnly cookies (XSS protection)
  - Secure flag (HTTPS only)
  - SameSite: Lax (CSRF protection)
  - Token expiration: 30 days
```

### Pattern 6: Checkout Redirect Flow

```yaml
User Action: Click "Proceed to Checkout" from cart

Flow:
  1. User clicks checkout button

  2. Server Action Execution
     File: app/actions/checkout.ts
     - Get cart ID from cookie
     - Fetch cart from Shopify (validate)

  3. Shopify Checkout Creation
     Mutation: cartCheckoutUrl(cartId)
     - Generate checkout URL
     - Returns: https://checkout.shopify.com/{shop}/{token}

  4. Redirect
     - Server responds with redirect (307)
     - Browser navigates to Shopify checkout

  5. Customer Completes Purchase
     - On Shopify's secure checkout page
     - Payment processing
     - Order creation

  6. Return to Storefront
     - After completion: Redirect to /thank-you?order={id}
     - Clear cart cookie
     - Display order confirmation

  7. Webhook Processing (Background)
     - Shopify sends order/create webhook
     - Update analytics
     - Send confirmation email (Klaviyo)
     - Trigger fulfillment

Integration: Seamless (user perspective)
Security: PCI-compliant (Shopify handles)
```

---

## 5. Data Caching Strategy

### Multi-Layer Cache

```yaml
Layer 1: Edge CDN (Vercel Edge Network)
  Location: Global (300+ PoPs)
  Duration: Based on Cache-Control headers
  Use Cases:
    - Static assets (images, fonts, CSS, JS)
    - ISR-generated HTML
    - Public API responses
  Invalidation: Time-based + manual purge

Layer 2: Next.js ISR Cache
  Location: Serverless function memory
  Duration: Per-page configuration (revalidate)
  Use Cases:
    - Product pages (5 min)
    - Collection pages (30 min)
    - Homepage (1 hour)
  Invalidation: Time-based + on-demand revalidation

Layer 3: React Cache (Request Deduplication)
  Location: Single request lifecycle
  Duration: Single request only
  Use Cases:
    - Multiple components fetching same data
    - Automatic deduplication in Server Components
  Invalidation: End of request

Layer 4: Browser Cache
  Location: User's browser
  Duration: Based on Cache-Control headers
  Use Cases:
    - Static assets
    - Font files
    - Cached page visits
  Invalidation: Hard refresh / cache expiry
```

### Cache Headers Configuration

```typescript
// Example: Product page cache headers
export const revalidate = 300; // 5 minutes ISR

// Example: API route with edge caching
export const runtime = "edge";
export const revalidate = 60; // 1 minute

// Example: Static assets
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/fonts/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

### On-Demand Revalidation

```typescript
// Webhook handler: Revalidate product on update
// app/api/webhooks/products/update/route.ts

export async function POST(request: Request) {
  // Validate webhook HMAC
  const isValid = await validateWebhook(request);
  if (!isValid) return new Response("Unauthorized", { status: 401 });

  const product = await request.json();

  // Revalidate product page
  await revalidatePath(`/products/${product.handle}`);

  // Revalidate any collections containing this product
  for (const collection of product.collections) {
    await revalidatePath(`/collections/${collection.handle}`);
  }

  return new Response("OK", { status: 200 });
}
```

---

## 6. GraphQL Query Examples

### Product Query

```graphql
query GetProduct($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    description
    descriptionHtml

    # SEO
    seo {
      title
      description
    }

    # Media
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }

    # Variants
    variants(first: 100) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable

          # Pricing
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }

          # Options
          selectedOptions {
            name
            value
          }

          image {
            url
            altText
          }
        }
      }
    }

    # Options (Color, Size, etc.)
    options {
      name
      values
    }

    # Additional
    tags
    vendor
    productType
  }
}
```

### Collection Query with Filters

```graphql
query GetCollection(
  $handle: String!
  $first: Int!
  $filters: [ProductFilter!]
  $sortKey: ProductCollectionSortKeys
  $reverse: Boolean
) {
  collection(handle: $handle) {
    id
    title
    description
    handle

    # SEO
    seo {
      title
      description
    }

    # Products
    products(
      first: $first
      filters: $filters
      sortKey: $sortKey
      reverse: $reverse
    ) {
      edges {
        node {
          id
          title
          handle

          # Featured image
          featuredImage {
            url
            altText
            width
            height
          }

          # Price range
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }

          # Availability
          availableForSale

          # Quick info
          tags
          vendor
        }
      }

      # Pagination
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```

### Cart Mutation (Add Item)

```graphql
mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id

      # Cart lines
      lines(first: 100) {
        edges {
          node {
            id
            quantity

            # Merchandise (variant)
            merchandise {
              ... on ProductVariant {
                id
                title

                # Product info
                product {
                  title
                  handle
                }

                # Price
                priceV2 {
                  amount
                  currencyCode
                }

                # Image
                image {
                  url
                  altText
                }
              }
            }

            # Line cost
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }

      # Cart totals
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }

      # Checkout URL
      checkoutUrl
    }

    userErrors {
      field
      message
    }
  }
}
```

---

## 7. Error Handling & Retry Logic

### API Error Handling

```typescript
// lib/shopify/client.ts

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const endpoint = process.env.PUBLIC_STORE_DOMAIN!;
  const token = process.env.PUBLIC_STOREFRONT_API_TOKEN!;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 }, // ISR cache
    });

    // Handle rate limiting (429)
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;

      await new Promise((resolve) => setTimeout(resolve, delay));
      return shopifyFetch({ query, variables }); // Retry
    }

    // Handle server errors (5xx)
    if (response.status >= 500) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const json = await response.json();

    // Handle GraphQL errors
    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error("Shopify API fetch error:", error);

    // Fallback or rethrow
    throw error;
  }
}
```

### Retry Strategy

```yaml
Rate Limit (429):
  - Read Retry-After header
  - Wait specified time
  - Retry request (max 3 attempts)

Server Error (5xx):
  - Exponential backoff: 1s, 2s, 4s
  - Max 3 retries
  - Log error to Sentry
  - Show user-friendly error page

Network Error:
  - Retry once after 1s
  - If still fails: Show offline page
  - Cache last successful response

GraphQL Error:
  - Log to monitoring (Sentry)
  - Display user-friendly message
  - Provide fallback UI
```

---

## 8. Real-Time Data Synchronization

### Webhook Configuration

```yaml
Shopify Webhooks:
  products/create:
    Action: Revalidate collections, search index
    Handler: /api/webhooks/products/create

  products/update:
    Action: Revalidate product page, related collections
    Handler: /api/webhooks/products/update

  products/delete:
    Action: Remove from cache, update search index
    Handler: /api/webhooks/products/delete

  inventory_levels/update:
    Action: Revalidate product availability
    Handler: /api/webhooks/inventory/update

  orders/create:
    Action: Analytics tracking, email notifications
    Handler: /api/webhooks/orders/create

Security:
  - Validate HMAC signature
  - Check webhook origin
  - Rate limiting
```

### Webhook Handler Example

```typescript
// app/api/webhooks/products/update/route.ts
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function POST(request: Request) {
  // 1. Validate webhook authenticity
  const hmac = request.headers.get("X-Shopify-Hmac-Sha256");
  const body = await request.text();

  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET!)
    .update(body, "utf8")
    .digest("base64");

  if (hash !== hmac) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Parse product data
  const product = JSON.parse(body);

  // 3. Revalidate affected pages
  await revalidatePath(`/products/${product.handle}`);

  // 4. Revalidate collections
  const collections = await getProductCollections(product.id);
  for (const collection of collections) {
    await revalidatePath(`/collections/${collection.handle}`);
  }

  // 5. Update search index (Algolia)
  await updateSearchIndex(product);

  return new Response("OK", { status: 200 });
}
```

---

## 9. Data Transformation & Formatting

### Shopify → App Data Model

```typescript
// lib/shopify/transforms.ts

import type { ShopifyProduct, Product } from "@/types";

export function transformProduct(shopifyProduct: ShopifyProduct): Product {
  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,

    // Price formatting
    price: formatPrice(shopifyProduct.priceRange.minVariantPrice),
    compareAtPrice: shopifyProduct.compareAtPriceRange?.minVariantPrice
      ? formatPrice(shopifyProduct.compareAtPriceRange.minVariantPrice)
      : null,

    // Images
    images: shopifyProduct.images.edges.map(({ node }) => ({
      url: node.url,
      altText: node.altText || shopifyProduct.title,
      width: node.width,
      height: node.height,
    })),

    // Variants
    variants: shopifyProduct.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      sku: node.sku,
      availableForSale: node.availableForSale,
      price: formatPrice(node.priceV2),
      options: node.selectedOptions,
    })),

    // Options
    options: shopifyProduct.options.map((option) => ({
      name: option.name,
      values: option.values,
    })),

    // SEO
    seo: {
      title: shopifyProduct.seo.title || shopifyProduct.title,
      description: shopifyProduct.seo.description || shopifyProduct.description,
    },

    // Metadata
    tags: shopifyProduct.tags,
    vendor: shopifyProduct.vendor,
    productType: shopifyProduct.productType,
  };
}

function formatPrice(price: { amount: string; currencyCode: string }): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  });

  return formatter.format(parseFloat(price.amount));
}
```

---

## 10. Performance Optimization for Data Fetching

### Best Practices

```yaml
1. Minimize GraphQL Query Depth:
  - Fetch only needed fields
  - Limit nested connections (first: N)
  - Use fragments for reusability

2. Parallel Fetching:
  - Fetch multiple resources concurrently
  - Example: Homepage (hero + featured products + collections)
  - Use Promise.all() in Server Components

3. Request Deduplication:
  - React automatic deduplication
  - Multiple components requesting same data = 1 API call

4. Pagination:
  - Cursor-based pagination (Shopify standard)
  - Load more (client-side)
  - Or server-side pagination with URL params

5. Partial Data Loading:
  - Load critical data server-side
  - Lazy load non-critical (e.g., reviews, recommendations)
  - Streaming SSR for large pages
```

### Example: Parallel Data Fetching

```typescript
// app/page.tsx (Homepage)

import { getHeroContent } from "@/lib/cms/sanity";
import { getFeaturedProducts, getFeaturedCollections } from "@/lib/shopify";

export default async function Homepage() {
  // Fetch all data in parallel (Server Component)
  const [hero, products, collections] = await Promise.all([
    getHeroContent(),
    getFeaturedProducts(),
    getFeaturedCollections(),
  ]);

  return (
    <>
      <Hero data={hero} />
      <FeaturedProducts products={products} />
      <FeaturedCollections collections={collections} />
    </>
  );
}
```

---

## 11. Data Flow Testing

### Test Scenarios

```yaml
Unit Tests:
  - Data transformation functions
  - GraphQL query builders
  - Price formatting
  - Cart calculations

Integration Tests:
  - API client with mocked responses
  - Shopify API error handling
  - Retry logic
  - Cache invalidation

E2E Tests (Playwright):
  - Add to cart flow
  - Checkout redirect
  - Search → Results → Product detail
  - Filter and sort collections
  - Customer login → Order history
```

---

## 12. Monitoring & Observability

### Data Flow Metrics

```yaml
Track:
  - API response times (p50, p95, p99)
  - Error rates by endpoint
  - Rate limit hits
  - Cache hit/miss ratios
  - Webhook delivery success

Tools:
  - Vercel Analytics (Web Vitals, API routes)
  - Sentry (Errors, performance)
  - Custom logging (structured JSON)

Alerts:
  - Shopify API error rate > 5%
  - Response time > 1s (p95)
  - Cache hit rate < 80%
  - Webhook failures
```

---

## 13. Data Flow Checklist

- [ ] All Shopify API queries documented
- [ ] GraphQL fragments created for reusability
- [ ] Error handling implemented for all API calls
- [ ] Retry logic configured (rate limits, errors)
- [ ] Caching strategy defined per page type
- [ ] Webhooks registered and handlers implemented
- [ ] Data transformation functions tested
- [ ] Real-time features identified (cart, search)
- [ ] Performance optimizations applied
- [ ] Monitoring and alerting configured
- [ ] Documentation complete for developers

---

**Document Status:** Draft / Under Review / Approved  
**Approved By:** \***\*\*\*\*\*\*\***\_\***\*\*\*\*\*\*\***  
**Date:** \***\*\*\*\*\*\*\***\_\***\*\*\*\*\*\*\***

**Next Document:** [Component Hierarchy](./component-hierarchy.md)
