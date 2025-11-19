import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History",
  description: "View your order history",
};

export default function OrdersPage() {
  // In a real app, fetch orders from Shopify API
  const orders = [
    {
      id: "1",
      orderNumber: "#1001",
      date: "2024-01-15",
      total: "$129.99",
      status: "Delivered",
      items: 3,
    },
    {
      id: "2",
      orderNumber: "#1002",
      date: "2024-01-20",
      total: "$89.99",
      status: "In Transit",
      items: 2,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            You haven&apos;t placed any orders yet.
          </p>
          <a
            href="/collections/all"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order {order.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {order.total}
                  </p>
                  <p className="text-sm text-gray-600">{order.items} items</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
                <a
                  href={`/account/orders/${order.id}`}
                  className="text-sm font-medium text-black hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
