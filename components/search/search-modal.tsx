"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/shopify";
import { formatMoney } from "@/lib/shopify/client";
import { debounce } from "@/lib/utils/helpers";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data.products || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debouncedSearch = debounce(() => searchProducts(query), 300);
    debouncedSearch();
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                <div className="relative">
                  {/* Search Input */}
                  <div className="flex items-center border-b border-gray-200 px-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full border-0 py-4 pl-3 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                      autoFocus
                    />
                    <button
                      onClick={handleClose}
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Results */}
                  <div className="max-h-96 overflow-y-auto p-4">
                    {loading && (
                      <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
                      </div>
                    )}

                    {!loading && query && results.length === 0 && (
                      <div className="py-8 text-center text-gray-500">
                        No products found for &quot;{query}&quot;
                      </div>
                    )}

                    {!loading && results.length > 0 && (
                      <div className="space-y-2">
                        {results.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.handle}`}
                            onClick={handleClose}
                            className="flex items-center gap-4 rounded-lg p-2 hover:bg-gray-50"
                          >
                            {product.images?.[0] && (
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                <Image
                                  src={product.images[0].url}
                                  alt={
                                    product.images[0].altText || product.title
                                  }
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatMoney(
                                  product.priceRange.minVariantPrice
                                )}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {!query && (
                      <div className="py-8 text-center text-gray-500">
                        Start typing to search for products
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
