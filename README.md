# Next.js Headless Shopify Storefront

A modern, high-performance headless commerce storefront built with Next.js 16 and Shopify Storefront API.

## 🚀 Features

- **Next.js 16.0.3** - Latest version with App Router and React Server Components
- **TypeScript** - Full type safety with strict mode
- **Tailwind CSS** - Utility-first styling with custom configuration
- **Shopify Storefront API** - GraphQL integration with cart management
- **Shopping Cart** - Real-time cart with persistent state and mini cart drawer
- **Product Pages** - Dynamic product detail pages with variant selection and image gallery
- **Collections** - Product collection pages and all products view
- **Search** - Modal search with live results and dedicated search page
- **Customer Accounts** - Login, register, profile, orders, and addresses pages
- **Static Pages** - About, Contact, FAQ, Shipping, Privacy Policy, Terms of Service
- **ISR** - Incremental Static Regeneration for optimal performance
- **Responsive Design** - Mobile-first approach with Tailwind
- **Headless UI** - Accessible component primitives
- **Loading States** - Loading skeletons and error boundaries
- **404 Page** - Custom not found page

## 📋 Prerequisites

- Node.js 18+ (recommended: Node 22)
- npm, yarn, pnpm, or bun
- Shopify store with Storefront API access

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd storefront
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env.local` and add your Shopify credentials:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Shopify store details:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_STOREFRONT_API_TOKEN=your-storefront-access-token
SHOPIFY_ADMIN_ACCESS_TOKEN=your-admin-access-token (optional)
```

**Getting Shopify Credentials:**

1. Go to your Shopify Admin → Settings → Apps and sales channels
2. Click "Develop apps" → "Create an app"
3. Configure Storefront API scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
4. Install the app and copy the Storefront API access token

## 🚀 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

## 🏗️ Project Structure

```
storefront/
├── app/                              # Next.js App Router
│   ├── api/                          # API routes
│   │   ├── cart/                     # Cart management (add, update, remove, get)
│   │   └── search/                   # Search API endpoint
│   ├── account/                      # Customer account pages
│   │   ├── login/                    # Login page
│   │   ├── register/                 # Registration page
│   │   ├── profile/                  # Profile settings
│   │   ├── orders/                   # Order history
│   │   └── addresses/                # Address management
│   ├── cart/                         # Cart page
│   │   └── page.tsx                  # Full cart view
│   ├── collections/                  # Collection routes
│   │   ├── all/                      # All products page
│   │   ├── [handle]/                 # Dynamic collection pages
│   │   └── page.tsx                  # Collections index
│   ├── pages/                        # Static pages
│   │   ├── about/                    # About page
│   │   ├── contact/                  # Contact form
│   │   ├── faq/                      # FAQ page
│   │   ├── shipping/                 # Shipping policy
│   │   ├── privacy/                  # Privacy policy
│   │   └── terms/                    # Terms of service
│   ├── products/[handle]/            # Product detail pages
│   │   ├── page.tsx                  # Server component
│   │   ├── product-page-client.tsx   # Client component
│   │   └── loading.tsx               # Loading state
│   ├── search/                       # Search results page
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Homepage
│   ├── loading.tsx                   # Global loading state
│   ├── error.tsx                     # Error boundary
│   └── not-found.tsx                 # 404 page
├── components/                       # React components
│   ├── cart/                         # Cart components
│   │   ├── cart-context.tsx          # Cart state management
│   │   ├── cart-drawer.tsx           # Mini cart drawer
│   │   ├── cart-item.tsx             # Cart line item
│   │   └── cart-trigger.tsx          # Header cart button
│   ├── layout/                       # Layout components
│   │   ├── header.tsx                # Site header with nav
│   │   └── footer.tsx                # Site footer
│   ├── product/                      # Product components
│   │   ├── product-card.tsx          # Product grid item
│   │   ├── product-grid.tsx          # Product grid layout
│   │   ├── product-gallery.tsx       # Image gallery with thumbnails
│   │   ├── variant-selector.tsx      # Variant options picker
│   │   └── add-to-cart.tsx           # Add to cart button
│   ├── search/                       # Search components
│   │   └── search-modal.tsx          # Search modal with live results
│   └── ui/                           # Base UI components
│       ├── button.tsx                # Button with variants
│       ├── input.tsx                 # Form input
│       ├── badge.tsx                 # Product badges
│       ├── modal.tsx                 # Dialog modal
│       └── drawer.tsx                # Slide-out drawer
├── contexts/                         # React contexts
│   └── cart-context.tsx              # Global cart state
├── lib/                              # Utilities and libraries
│   ├── shopify/                      # Shopify API integration
│   │   ├── client.ts                 # GraphQL client with error handling
│   │   ├── queries.ts                # Product, collection, search queries
│   │   └── mutations.ts              # Cart and customer mutations
│   ├── utils/                        # Helper functions
│   │   └── helpers.ts                # Format, truncate, slugify utilities
│   └── constants.ts                  # App constants and routes
├── types/                            # TypeScript type definitions
│   └── shopify.ts                    # Complete Shopify type system
├── public/                           # Static assets
├── .env.local                        # Environment variables (not in git)
├── .env.example                      # Environment variables template
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## 🎨 Key Components

### Cart System

- **`CartContext`** - Global cart state with React Context
- **`CartDrawer`** - Mini cart drawer that slides in from right
- **`CartItem`** - Line item with quantity controls (+/-) and remove button
- **`CartTrigger`** - Header cart icon with item count badge
- **`Cart Page`** - Full cart view with order summary sidebar

### Product Display

- **`ProductCard`** - Product card with image, title, price, and badges
- **`ProductGrid`** - Responsive grid (2/3/4 columns)
- **`ProductGallery`** - Image gallery with main image and thumbnail navigation
- **`VariantSelector`** - Variant option picker (color, size, etc.)
- **`AddToCart`** - Add to cart with quantity selector and loading state

### Search

- **`SearchModal`** - Modal search with live results and debouncing
- **`Search Page`** - Dedicated search results page with filters

### Layout

- **`Header`** - Sticky header with navigation, search, account, and cart
- **`Footer`** - Site footer with links and copyright

### UI Primitives

- **`Button`** - Variant-based button (primary, secondary, ghost) with loading state
- **`Input`** - Form input with label, error state, and validation
- **`Badge`** - Product badges (sale, new, soldOut, custom)
- **`Modal`** - Accessible dialog modal with backdrop
- **`Drawer`** - Slide-out panel (left/right positioning)

## 🌐 API Routes

### Cart Management

- **`GET /api/cart`** - Fetch current cart by ID (from cookie)
- **`POST /api/cart/add`** - Add item to cart (creates cart if needed)
- **`POST /api/cart/update`** - Update line item quantity
- **`POST /api/cart/remove`** - Remove line item from cart

### Search

- **`GET /api/search`** - Search products by query string

## 📄 Pages

### Shopping

- **`/`** - Homepage with hero section and featured products
- **`/collections`** - All collections overview
- **`/collections/all`** - All products page
- **`/collections/[handle]`** - Individual collection pages
- **`/products/[handle]`** - Product detail pages with variants
- **`/cart`** - Full shopping cart page
- **`/search`** - Search results page

### Customer Account

- **`/account`** - Account dashboard
- **`/account/login`** - Login page
- **`/account/register`** - Registration page
- **`/account/profile`** - Profile settings
- **`/account/orders`** - Order history
- **`/account/addresses`** - Address management

### Static Pages

- **`/pages/about`** - About us page
- **`/pages/contact`** - Contact form
- **`/pages/faq`** - Frequently asked questions
- **`/pages/shipping`** - Shipping policy
- **`/pages/privacy`** - Privacy policy
- **`/pages/terms`** - Terms of service

## 🔧 Configuration

### ISR Revalidation Times

- Homepage: 3600s (1 hour)
- Product pages: 300s (5 minutes)
- Collection pages: 1800s (30 minutes)

### Image Optimization

Shopify CDN images are configured in `next.config.ts` for automatic optimization.

## 📦 Build & Deploy

### Build for production

```bash
npm run build
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project" → Import your repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `next build` (auto-configured)
   - **Output Directory**: `.next` (auto-configured)
5. Add environment variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` = `your-store.myshopify.com`
   - `NEXT_PUBLIC_STOREFRONT_API_TOKEN` = `your_storefront_token`
   - `SHOPIFY_ADMIN_ACCESS_TOKEN` = `your_admin_token` (optional)
6. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

During deployment, you'll be prompted to add environment variables. Make sure to add:

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_STOREFRONT_API_TOKEN`
- `SHOPIFY_ADMIN_ACCESS_TOKEN` (optional)

#### Post-Deployment Steps

1. **Update Site URL**: After deployment, update your `.env.local` and Vercel environment variable:

   ```
   NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
   ```

2. **Configure Custom Domain** (Optional):

   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain and follow DNS configuration steps

3. **Enable Analytics** (Optional):

   - Go to Vercel Dashboard → Your Project → Analytics
   - Enable Vercel Analytics and Speed Insights

4. **Configure Redirects** (Optional):
   - Update `vercel.json` for custom redirects and headers

**Environment Variables for Vercel:**

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., `your-store.myshopify.com`)
- `NEXT_PUBLIC_STOREFRONT_API_TOKEN` - Storefront API access token
- `SHOPIFY_ADMIN_ACCESS_TOKEN` - Admin API token (optional, for advanced features)
- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://your-store.vercel.app`)

## 🎯 Key Features Explained

### Cart Functionality

- **Persistent Cart**: Cart ID stored in cookies (7 days expiry)
- **Real-time Updates**: Cart state updates instantly across all components
- **Mini Cart Drawer**: Quick cart preview that slides in from right
- **Full Cart Page**: Detailed cart view with order summary
- **Auto-open**: Mini cart opens automatically when adding products

### Search

- **Live Search**: Results update as you type (300ms debounce)
- **Search Modal**: Quick search accessible from header
- **Search Page**: Full search results with product grid
- **Shopify Integration**: Uses Shopify Storefront API search

### Caching Strategy

- **Edge Caching**: Static assets cached at CDN edge
- **ISR (Incremental Static Regeneration)**:
  - Homepage: 1 hour revalidation
  - Product pages: 5 minutes revalidation
  - Collection pages: 30 minutes revalidation
- **React Cache**: Automatic request deduplication

### Performance Optimizations

- **Server Components**: Default to server-side rendering
- **Image Optimization**: Next.js Image component with Shopify CDN
- **Code Splitting**: Automatic code splitting per route
- **Streaming**: Loading states with Suspense boundaries

## 🧪 Testing

```bash
npm run test
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
