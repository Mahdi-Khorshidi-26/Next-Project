"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-900">
          Error
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-4 text-base text-gray-600">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={reset}
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Try again
          </button>
          <Link href="/" className="text-sm font-semibold text-gray-900">
            Go back home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
