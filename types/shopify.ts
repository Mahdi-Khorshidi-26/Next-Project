// Shopify Types
export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable?: number;
  priceV2: Money;
  compareAtPriceV2: Money | null;
  selectedOptions: SelectedOption[];
  image: Image | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: Image | null;
  images: Image[];
  variants: ProductVariant[];
  options: ProductOption[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  availableForSale: boolean;
  tags: string[];
  vendor: string;
  productType: string;
  seo: {
    title: string | null;
    description: string | null;
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  products: Product[];
  seo: {
    title: string | null;
    description: string | null;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
    };
    priceV2: Money;
    image: Image | null;
    selectedOptions: SelectedOption[];
  };
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  totalQuantity: number;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
}

export interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    extensions?: {
      code: string;
    };
  }>;
}

// GraphQL Input Types
export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

export interface CartInput {
  lines: CartLineInput[];
}

export interface ProductFilter {
  available?: boolean;
  price?: {
    min?: number;
    max?: number;
  };
  productType?: string;
  variantOption?: {
    name: string;
    value: string;
  };
}
