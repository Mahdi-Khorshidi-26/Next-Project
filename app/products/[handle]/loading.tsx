export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-md bg-gray-200"
              ></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-8 w-1/4 animate-pulse rounded bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="h-12 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="h-12 w-full animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
