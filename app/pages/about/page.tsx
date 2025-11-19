import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our store",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

        <div className="prose prose-lg">
          <p className="text-lg text-gray-600 mb-6">
            Welcome to our store! We are passionate about delivering the best
            products and exceptional customer service to our valued customers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 mb-6">
            Founded in 2024, our company started with a simple mission: to
            provide high-quality products that enhance people&apos;s lives. What
            began as a small operation has grown into a thriving business,
            serving customers worldwide.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Quality first - We only sell products we believe in</li>
            <li>Customer satisfaction - Your happiness is our priority</li>
            <li>Sustainability - We care about our environmental impact</li>
            <li>Innovation - Always looking for ways to improve</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            Our dedicated team works tirelessly to source the best products,
            provide excellent customer support, and ensure every order is
            handled with care.
          </p>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600">
              Have questions? We&apos;d love to hear from you.{" "}
              <a
                href="/pages/contact"
                className="font-medium text-black hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
