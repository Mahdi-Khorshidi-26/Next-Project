// Product Queries
export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      url
      altText
      width
      height
    }
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
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    options {
      name
      values
    }
    availableForSale
    tags
    vendor
    productType
    seo {
      title
      description
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS = `
  query getProducts($first: Int = 12, $after: String, $sortKey: ProductSortKeys = TITLE, $reverse: Boolean = false) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductFragment
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Collection Queries
export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    handle
    title
    description
    image {
      url
      altText
      width
      height
    }
    seo {
      title
      description
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query getCollection($handle: String!, $first: Int = 24, $sortKey: ProductCollectionSortKeys = BEST_SELLING, $reverse: Boolean = false) {
    collection(handle: $handle) {
      ...CollectionFragment
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...ProductFragment
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTIONS = `
  query getCollections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;

// Search Query
export const SEARCH_PRODUCTS = `
  query searchProducts($query: String!, $first: Int = 24) {
    search(query: $query, first: $first, types: PRODUCT) {
      edges {
        node {
          ... on Product {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Product Recommendations
export const GET_PRODUCT_RECOMMENDATIONS = `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;
