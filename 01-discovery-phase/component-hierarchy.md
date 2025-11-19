# Component Hierarchy & Design System

## Next.js Headless Shopify Storefront

**Project Name:** [Your Brand] Headless Storefront  
**Last Updated:** November 19, 2025

---

## 1. Overview

This document defines the component architecture, design patterns, and reusable component library for the headless storefront. Components are organized by feature, responsibility, and reusability.

---

## 2. Component Architecture Principles

### Design Principles

```yaml
1. Server-First:
  - Default to Server Components (React 18+)
  - Use Client Components only when necessary
  - Minimize JavaScript shipped to client

2. Composition:
  - Small, focused components
  - Composable patterns
  - Avoid prop drilling (use composition)

3. Accessibility:
  - WCAG 2.1 Level AA
  - Semantic HTML
  - ARIA labels where needed
  - Keyboard navigation

4. Performance:
  - Lazy loading for heavy components
  - Image optimization (next/image)
  - Code splitting by route
  - Minimize re-renders

5. Type Safety:
  - TypeScript strict mode
  - Typed props
  - Typed API responses
```

### Component Types

```yaml
Server Components (Default):
  - No interactivity needed
  - Data fetching
  - SEO-critical content
  - Static content
  - Example: ProductCard, ProductGrid, Header (static)

Client Components ("use client"):
  - User interactions (clicks, inputs)
  - Browser APIs (localStorage, window)
  - State management (useState, useContext)
  - Real-time updates
  - Example: AddToCart, SearchInput, MobileMenu, CartDrawer

Shared Components:
  - Can be used as both Server and Client
  - Typically UI primitives
  - Example: Button, Badge, Input
```

---

## 3. Component Hierarchy

### Application Structure

```
app/
├── layout.tsx                    # Root layout (Server Component)
│   ├── <Header>                  # Site header (Server)
│   │   ├── <Logo>                # Brand logo (Server)
│   │   ├── <Navigation>          # Main nav (Server with Client Menu)
│   │   │   └── <MobileMenu>      # Mobile nav (Client)
│   │   ├── <SearchTrigger>       # Search icon (Client)
│   │   │   └── <SearchModal>     # Search overlay (Client)
│   │   ├── <AccountLink>         # Account icon (Server)
│   │   └── <CartTrigger>         # Cart icon (Client)
│   │       └── <CartDrawer>      # Cart sidebar (Client)
│   │
│   ├── <main>                    # Page content
│   │   └── {children}            # Page-specific content
│   │
│   └── <Footer>                  # Site footer (Server)
│       ├── <FooterNav>           # Footer links (Server)
│       ├── <Newsletter>          # Email signup (Client)
│       └── <SocialLinks>         # Social icons (Server)
```

---

## 4. Component Library

### 📦 UI Components (Primitives)

Location: `components/ui/`

#### Button

```typescript
// components/ui/button.tsx
import { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-white text-black border border-black hover:bg-gray-100",
        ghost: "hover:bg-gray-100",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

#### Badge

```typescript
// components/ui/badge.tsx
export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "sale" | "new" | "soldOut";
}) {
  const styles = {
    default: "bg-gray-100 text-gray-800",
    sale: "bg-red-500 text-white",
    new: "bg-blue-500 text-white",
    soldOut: "bg-gray-300 text-gray-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
```

#### Input

```typescript
// components/ui/input.tsx
import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 border rounded-md
          focus:ring-2 focus:ring-black focus:border-black
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

#### Modal

```typescript
// components/ui/modal.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl">
              {title && (
                <div className="flex items-center justify-between p-4 border-b">
                  <Dialog.Title className="text-lg font-semibold">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              <div className="p-4">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
```

#### Drawer (Slide-out Panel)

```typescript
// components/ui/drawer.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "left" | "right";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
}: DrawerProps) {
  const positionClasses = position === "right" ? "ml-auto" : "mr-auto";

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`fixed inset-y-0 ${position}-0 flex max-w-full`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }
              >
                <Dialog.Panel className="w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {title && (
                      <div className="flex items-center justify-between px-4 py-6 border-b">
                        <Dialog.Title className="text-lg font-semibold">
                          {title}
                        </Dialog.Title>
                        <button
                          onClick={onClose}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                    <div className="flex-1 overflow-y-auto">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
```

**Other UI Components:**

- `Spinner` - Loading indicator
- `Skeleton` - Loading placeholder
- `Tabs` - Tab navigation
- `Accordion` - Collapsible content
- `Tooltip` - Hover information
- `Dropdown` - Select menu
- `Toast` - Notification

---

### 🛍️ Product Components

Location: `components/product/`

#### ProductCard

```typescript
// components/product/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOnSale =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const isSoldOut = !product.availableForSale;

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {/* Product Image */}
        <Image
          src={product.images[0].url}
          alt={product.images[0].altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isOnSale && <Badge variant="sale">Sale</Badge>}
          {product.tags.includes("new") && <Badge variant="new">New</Badge>}
          {isSoldOut && <Badge variant="soldOut">Sold Out</Badge>}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {product.price}
          </span>
          {isOnSale && (
            <span className="text-sm text-gray-500 line-through">
              {product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
```

#### ProductGrid

```typescript
// components/product/product-grid.tsx
import { ProductCard } from "./product-card";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### ProductGallery

```typescript
// components/product/product-gallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].altText || productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImage(index)}
              className={`
                relative aspect-square overflow-hidden rounded-lg bg-gray-100
                ${
                  selectedImage === index
                    ? "ring-2 ring-black"
                    : "opacity-60 hover:opacity-100"
                }
              `}
            >
              <Image
                src={image.url}
                alt={image.altText || `${productName} ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### VariantSelector

```typescript
// components/product/variant-selector.tsx
"use client";

import type { ProductOption, ProductVariant } from "@/types";

interface VariantSelectorProps {
  options: ProductOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
}

export function VariantSelector({
  options,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name}>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {option.name}: {selectedOptions[option.name]}
          </label>

          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;

              return (
                <button
                  key={value}
                  onClick={() => onOptionChange(option.name, value)}
                  className={`
                    px-4 py-2 border rounded-md text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                    }
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

#### AddToCart

```typescript
// components/product/add-to-cart.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/actions/cart";
import { useCart } from "@/contexts/cart-context";

interface AddToCartProps {
  variantId: string;
  availableForSale: boolean;
}

export function AddToCart({ variantId, availableForSale }: AddToCartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { openCart } = useCart();

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      await addToCart(variantId, 1);
      openCart(); // Open cart drawer
    } catch (error) {
      console.error("Add to cart error:", error);
      // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!availableForSale || isLoading}
      className="w-full"
    >
      {isLoading ? "Adding..." : availableForSale ? "Add to Cart" : "Sold Out"}
    </Button>
  );
}
```

**Other Product Components:**

- `ProductReviews` - Review list
- `ProductRecommendations` - Related products
- `SizeGuide` - Size chart modal
- `ProductDetails` - Description, specs

---

### 🛒 Cart Components

Location: `components/cart/`

#### CartDrawer

```typescript
// components/cart/cart-drawer.tsx
"use client";

import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CartItem } from "./cart-item";
import { useCart } from "@/contexts/cart-context";

export function CartDrawer() {
  const { isOpen, closeCart, cart } = useCart();

  if (!cart) return null;

  const isEmpty = cart.lines.length === 0;

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title="Shopping Cart">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <p className="text-gray-500">Your cart is empty</p>
          <Button onClick={closeCart} variant="secondary" className="mt-4">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 p-4 space-y-4">
            {cart.lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-base font-medium">
              <span>Subtotal</span>
              <span>{cart.cost.subtotalAmount.amount}</span>
            </div>

            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>

            <Button as="a" href={cart.checkoutUrl} className="w-full">
              Checkout
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}
```

#### CartItem

```typescript
// components/cart/cart-item.tsx
"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { updateCartItem, removeCartItem } from "@/app/actions/cart";
import type { CartLine } from "@/types";

interface CartItemProps {
  line: CartLine;
}

export function CartItem({ line }: CartItemProps) {
  const { merchandise, quantity } = line;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === 0) {
      await removeCartItem(line.id);
    } else {
      await updateCartItem(line.id, newQuantity);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Image */}
      <div className="relative h-24 w-24 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={merchandise.image.url}
          alt={merchandise.product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium">{merchandise.product.title}</h3>
        <p className="text-sm text-gray-500">{merchandise.title}</p>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="h-8 w-8 rounded border hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="h-8 w-8 rounded border hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-medium">
            {line.cost.totalAmount.amount}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeCartItem(line.id)}
        className="text-gray-400 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
```

**Other Cart Components:**

- `CartSummary` - Subtotal, tax, shipping
- `DiscountCode` - Promo code input
- `FreeShippingProgress` - Progress bar to free shipping

---

### 🔍 Search Components

Location: `components/search/`

#### SearchModal

```typescript
// components/search/search-modal.tsx
"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { SearchInput } from "./search-input";
import { SearchResults } from "./search-results";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <SearchInput value={query} onChange={setQuery} autoFocus />

        {query && <SearchResults query={query} />}
      </div>
    </Modal>
  );
}
```

---

### 📄 Layout Components

Location: `components/layout/`

#### Header

```typescript
// components/layout/header.tsx
import Link from "next/link";
import { Navigation } from "./navigation";
import { SearchTrigger } from "./search-trigger";
import { CartTrigger } from "./cart-trigger";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Store Logo
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <SearchTrigger />
            <Link href="/account">Account</Link>
            <CartTrigger />
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

### 🎨 Collection Components

Location: `components/collection/`

- `FilterSidebar` - Product filters
- `SortDropdown` - Sort options
- `ActiveFilters` - Applied filter chips
- `CollectionHeader` - Title, description

---

## 5. Component Patterns

### Server vs Client Component Decision Tree

```
Does the component need:
├─ User interaction (onClick, onChange)? ──> CLIENT
├─ Browser APIs (localStorage, window)? ──> CLIENT
├─ React hooks (useState, useEffect)? ──> CLIENT
├─ Context (useContext)? ──> CLIENT
└─ None of the above? ──> SERVER (default)
```

### Composition Pattern (Avoid Prop Drilling)

```typescript
// ❌ Bad: Prop drilling
<ProductPage product={product} onAddToCart={handleAddToCart} cartCount={cartCount} />

// ✅ Good: Composition
<ProductPage product={product}>
  <ProductGallery images={product.images} />
  <ProductInfo>
    <ProductTitle>{product.title}</ProductTitle>
    <ProductPrice price={product.price} />
    <VariantSelector options={product.options} />
    <AddToCart variantId={selectedVariant.id} />
  </ProductInfo>
</ProductPage>
```

### Server Action Pattern (Forms)

```typescript
// app/actions/newsletter.ts (Server Action)
"use server";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  // Validate
  if (!email || !email.includes("@")) {
    return { error: "Invalid email" };
  }

  // Subscribe via API (e.g., Klaviyo)
  await subscribeEmail(email);

  return { success: true };
}

// components/newsletter-form.tsx (Client Component)
("use client");

import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  return (
    <form action={subscribeToNewsletter}>
      <input type="email" name="email" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

---

## 6. Styling System

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        primary: {
          50: "#f0f9ff",
          // ... full palette
          500: "#0ea5e9",
          900: "#0c4a6e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
```

### Design Tokens

```typescript
// lib/design-tokens.ts
export const designTokens = {
  // Spacing
  spacing: {
    section: "py-16 md:py-24",
    container: "container mx-auto px-4",
  },

  // Typography
  typography: {
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-3xl md:text-4xl font-bold",
    h3: "text-2xl md:text-3xl font-semibold",
    body: "text-base md:text-lg",
  },

  // Animation
  transition: {
    default: "transition-all duration-200 ease-in-out",
    slow: "transition-all duration-500 ease-in-out",
  },
};
```

---

## 7. Component Documentation

### Storybook Setup (Optional)

```yaml
Purpose: Component library documentation
Benefits:
  - Visual component testing
  - Interactive playground
  - Living documentation
  - Isolated development

Setup:
  - Install Storybook for Next.js
  - Create stories for each component
  - Document props and variants
  - Add examples and use cases
```

---

## 8. Component Testing

### Testing Strategy

```yaml
Unit Tests (Jest + React Testing Library):
  - UI component rendering
  - User interactions (clicks, inputs)
  - Conditional rendering
  - Prop variations

Integration Tests:
  - Component composition
  - Form submissions
  - Server Actions

Visual Regression Tests (Optional):
  - Chromatic / Percy
  - Prevent UI regressions
  - Screenshot comparison
```

### Example Test

```typescript
// components/product/product-card.test.tsx
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./product-card";

const mockProduct = {
  id: "1",
  handle: "test-product",
  title: "Test Product",
  price: "$99.99",
  images: [{ url: "/test.jpg", altText: "Test" }],
  availableForSale: true,
  tags: ["new"],
};

describe("ProductCard", () => {
  it("renders product information", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test")).toBeInTheDocument();
  });

  it('shows "New" badge when product has new tag', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
```

---

## 9. Component Checklist

- [ ] All components documented with props
- [ ] Server vs Client components identified
- [ ] Reusable UI primitives created
- [ ] Product components built
- [ ] Cart components implemented
- [ ] Search components ready
- [ ] Layout components finalized
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] TypeScript types defined
- [ ] Component tests written
- [ ] Storybook stories created (optional)
- [ ] Design system tokens defined
- [ ] Responsive design verified

---

**Document Status:** Draft / Under Review / Approved  
**Approved By:** ************\_************  
**Date:** ************\_************

**Next Document:** [Project Scope](./project-scope.md)
