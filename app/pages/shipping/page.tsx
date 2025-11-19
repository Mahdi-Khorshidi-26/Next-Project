import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Learn about our shipping options and policies",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shipping Policy
        </h1>

        <div className="prose prose-lg">
          <p className="text-lg text-gray-600 mb-8">
            We strive to deliver your orders quickly and efficiently.
            Here&apos;s everything you need to know about our shipping policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Shipping Methods
          </h2>
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-black pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Standard Shipping
              </h3>
              <p className="text-gray-600">5-7 business days | $5.99</p>
            </div>
            <div className="border-l-4 border-black pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Express Shipping
              </h3>
              <p className="text-gray-600">2-3 business days | $12.99</p>
            </div>
            <div className="border-l-4 border-black pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Overnight Shipping
              </h3>
              <p className="text-gray-600">1 business day | $24.99</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Free Shipping
          </h2>
          <p className="text-gray-600 mb-6">
            Enjoy free standard shipping on all orders over $100! No code needed
            - the discount will be applied automatically at checkout.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Processing Time
          </h2>
          <p className="text-gray-600 mb-6">
            Orders are processed within 1-2 business days. Orders placed on
            weekends or holidays will be processed the next business day.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            International Shipping
          </h2>
          <p className="text-gray-600 mb-6">
            We ship to most countries worldwide. International shipping times
            vary by location and typically take 7-21 business days. Customs fees
            and import taxes are the responsibility of the recipient.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Order Tracking
          </h2>
          <p className="text-gray-600 mb-6">
            Once your order ships, you&apos;ll receive a tracking number via
            email. You can also track your order status in your account
            dashboard.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Shipping Restrictions
          </h2>
          <p className="text-gray-600 mb-6">
            We currently do not ship to P.O. boxes or APO/FPO addresses. We ship
            to residential and commercial addresses only.
          </p>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600">
              If you have questions about shipping, please{" "}
              <a
                href="/pages/contact"
                className="font-medium text-black hover:underline"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
