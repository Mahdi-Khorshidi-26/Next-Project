import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">{SITE_NAME}</h3>
            <p className="text-sm text-gray-600">
              Premium e-commerce storefront powered by Next.js and Shopify.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/all"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/new"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/sale"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pages/contact"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/shipping"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/faq"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pages/privacy"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/terms"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
