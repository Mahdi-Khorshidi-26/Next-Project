export const SITE_NAME = "Your Store";
export const SITE_DESCRIPTION =
  "Premium e-commerce storefront powered by Next.js and Shopify";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  COLLECTIONS: "/collections",
  SEARCH: "/search",
  CART: "/cart",
  ACCOUNT: "/account",
  LOGIN: "/account/login",
  REGISTER: "/account/register",
} as const;

export const ITEMS_PER_PAGE = 24;
export const FEATURED_PRODUCTS_COUNT = 8;

export const SORT_OPTIONS = [
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Newest", value: "CREATED" },
  { label: "Price: Low to High", value: "PRICE_ASC" },
  { label: "Price: High to Low", value: "PRICE_DESC" },
  { label: "A-Z", value: "TITLE" },
] as const;
