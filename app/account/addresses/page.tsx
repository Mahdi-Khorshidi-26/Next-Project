import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your shipping addresses",
};

export default function AddressesPage() {
  // In a real app, fetch addresses from Shopify API
  const addresses = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      province: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Addresses</h1>
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            You haven&apos;t added any addresses yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              {address.isDefault && (
                <span className="inline-flex rounded-full bg-black text-white px-3 py-1 text-xs font-medium mb-4">
                  Default
                </span>
              )}
              <div className="text-sm text-gray-900 space-y-1">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.address1}</p>
                {address.address2 && <p>{address.address2}</p>}
                <p>
                  {address.city}, {address.province} {address.zip}
                </p>
                <p>{address.country}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="text-sm font-medium text-black hover:underline">
                  Edit
                </button>
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
