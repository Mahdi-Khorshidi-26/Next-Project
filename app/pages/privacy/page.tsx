import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and data practices",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: January 2024</p>

        <div className="prose prose-lg">
          <p className="text-lg text-gray-600 mb-8">
            We take your privacy seriously. This policy describes how we
            collect, use, and protect your personal information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Name, email address, and contact information</li>
            <li>Shipping and billing addresses</li>
            <li>
              Payment information (processed securely by our payment providers)
            </li>
            <li>Order history and preferences</li>
            <li>Communications with our customer support team</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">We use your information to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Detect and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Information Sharing
          </h2>
          <p className="text-gray-600 mb-6">
            We do not sell your personal information. We may share your
            information with service providers who help us operate our business,
            such as payment processors and shipping companies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Cookies and Tracking
          </h2>
          <p className="text-gray-600 mb-6">
            We use cookies and similar technologies to improve your browsing
            experience, analyze site traffic, and personalize content. You can
            control cookie settings through your browser.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Data Security
          </h2>
          <p className="text-gray-600 mb-6">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Object to certain data processing</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Children&apos;s Privacy
          </h2>
          <p className="text-gray-600 mb-6">
            Our services are not directed to children under 13. We do not
            knowingly collect information from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-6">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Contact Us
            </h3>
            <p className="text-gray-600">
              If you have questions about this privacy policy, please{" "}
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
