"use client";

import { useState } from "react";
import Link from "next/link";
import { CartTrigger } from "@/components/cart/cart-trigger";
import { SearchModal } from "@/components/search/search-modal";
import { Search, User } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { customer } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold hover:opacity-80 transition-opacity"
            >
              {SITE_NAME}
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/collections/all"
                className="text-sm font-medium hover:underline"
              >
                Shop All
              </Link>
              <Link
                href="/collections"
                className="text-sm font-medium hover:underline"
              >
                Collections
              </Link>
              <Link
                href="/pages/about"
                className="text-sm font-medium hover:underline"
              >
                About
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </button>

              <Link
                href="/account"
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Account"
                title={
                  customer
                    ? `${customer.firstName} ${customer.lastName}`
                    : "Account"
                }
              >
                <User className="h-6 w-6" />
                {customer && (
                  <span className="hidden lg:inline text-sm font-medium">
                    {customer.firstName}
                  </span>
                )}
              </Link>

              <CartTrigger />
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
