# Deployment Guide - Vercel

This guide will walk you through deploying your Next.js Shopify storefront to Vercel.

## Prerequisites

- [ ] Code pushed to Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Shopify Storefront API credentials ready

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository:

```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy via Vercel Dashboard

1. **Sign in to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub/GitLab/Bitbucket account

2. **Import Project**

   - Click "Add New..." → "Project"
   - Select your repository
   - Click "Import"

3. **Configure Project**

   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `next build` (auto-configured)
   - **Output Directory**: `.next` (auto-configured)
   - **Install Command**: `npm install` (auto-configured)

4. **Add Environment Variables**

   Click "Environment Variables" and add:

   | Name                               | Value                          | Environment                      |
   | ---------------------------------- | ------------------------------ | -------------------------------- |
   | `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com`     | Production, Preview, Development |
   | `NEXT_PUBLIC_STOREFRONT_API_TOKEN` | `your_storefront_access_token` | Production, Preview, Development |
   | `SHOPIFY_ADMIN_ACCESS_TOKEN`       | `your_admin_token` (optional)  | Production, Preview, Development |

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 1-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### 3. Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview environment
vercel

# Follow prompts to set up project
# Add environment variables when prompted

# Deploy to production
vercel --prod
```

## Post-Deployment Configuration

### Update Site URL

After your first deployment, update the site URL:

1. Copy your Vercel deployment URL (e.g., `https://your-store.vercel.app`)
2. In Vercel Dashboard → Your Project → Settings → Environment Variables
3. Add or update:
   ```
   NEXT_PUBLIC_SITE_URL = https://your-store.vercel.app
   ```
4. Redeploy for changes to take effect

### Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `shop.yourdomain.com`)
4. Follow DNS configuration instructions:
   - **For subdomain**: Add CNAME record pointing to `cname.vercel-dns.com`
   - **For apex domain**: Add A record pointing to Vercel's IP
5. Wait for DNS propagation (can take up to 48 hours)
6. SSL certificate will be automatically provisioned

### Enable Vercel Analytics (Optional)

1. Go to Vercel Dashboard → Your Project → Analytics
2. Click "Enable Analytics"
3. Add Speed Insights for Core Web Vitals tracking

## Environment Variables Reference

### Required Variables

```bash
# Your Shopify store domain (without https://)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Storefront API access token
NEXT_PUBLIC_STOREFRONT_API_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Optional Variables

```bash
# Admin API token (for advanced features)
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site URL (update after first deployment)
NEXT_PUBLIC_SITE_URL=https://your-store.vercel.app

# Analytics (if using Google Analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Troubleshooting

### Build Fails

- **Check build logs**: Vercel Dashboard → Deployments → Failed Build → View Logs
- **Common issues**:
  - Missing environment variables
  - TypeScript errors
  - Dependency installation failures

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

### Images Not Loading

- Verify `next.config.ts` includes Shopify CDN in `remotePatterns`
- Check Shopify store domain is correct in environment variables
- Ensure Storefront API token has proper permissions

### API Routes Returning 500 Errors

- Check API route logs in Vercel Dashboard → Functions
- Verify Shopify API credentials are correct
- Ensure API token has required scopes:
  - `unauthenticated_read_product_listings`
  - `unauthenticated_read_product_inventory`
  - `unauthenticated_write_checkouts`
  - `unauthenticated_read_checkouts`

## Continuous Deployment

Once connected, Vercel automatically deploys:

- **Production**: Pushes to `main` branch → `https://your-domain.com`
- **Preview**: Pull requests and other branches → Unique preview URLs
- **Comments**: Automatic deployment comments on PRs

## Performance Optimization

### Vercel Configuration

The included `vercel.json` configures:

- Build settings
- Environment variables
- Regional deployment (US East by default)

### Monitoring

- **Analytics**: Vercel Dashboard → Analytics
- **Speed Insights**: Real User Monitoring for Core Web Vitals
- **Function Logs**: Vercel Dashboard → Functions

## Security Best Practices

1. **Never commit `.env.local`** - Use `.env.example` as template
2. **Use environment variables** - Store secrets in Vercel Dashboard
3. **Rotate API tokens** - Regenerate Shopify tokens periodically
4. **Enable 2FA** - On both Vercel and Shopify accounts
5. **Restrict API scopes** - Only grant necessary permissions

## Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Environment variables configured in Vercel
- [ ] Build completes successfully
- [ ] Site loads correctly at Vercel URL
- [ ] Products display properly
- [ ] Cart functionality works
- [ ] Search works
- [ ] Images load from Shopify CDN
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics enabled (optional)
- [ ] NEXT_PUBLIC_SITE_URL updated to production URL

## Next Steps

- Set up monitoring and alerts
- Configure custom domain
- Enable Vercel Analytics
- Set up automatic Lighthouse testing
- Configure edge caching strategies
- Add monitoring for Shopify API rate limits

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Shopify Storefront API**: [shopify.dev/docs/api/storefront](https://shopify.dev/docs/api/storefront)
