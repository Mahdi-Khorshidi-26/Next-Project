import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Our terms of service and conditions",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: January 2024</p>

        <div className="prose prose-lg">
          <p className="text-lg text-gray-600 mb-8">
            Please read these Terms of Service carefully before using our
            website and services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Acceptance of Terms
          </h2>
          <p className="text-gray-600 mb-6">
            By accessing and using this website, you accept and agree to be
            bound by the terms and provisions of this agreement. If you do not
            agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Use of Service
          </h2>
          <p className="text-gray-600 mb-4">
            You agree to use our service only for:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Lawful purposes</li>
            <li>Personal, non-commercial use</li>
            <li>Browsing and purchasing products</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Account Responsibilities
          </h2>
          <p className="text-gray-600 mb-6">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Product Information
          </h2>
          <p className="text-gray-600 mb-6">
            We strive to provide accurate product descriptions and pricing.
            However, we do not warrant that product descriptions or other
            content is accurate, complete, or error-free.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Pricing and Payment
          </h2>
          <p className="text-gray-600 mb-6">
            All prices are subject to change without notice. We reserve the
            right to refuse or cancel any order for any reason, including but
            not limited to product availability or errors in pricing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Returns and Refunds
          </h2>
          <p className="text-gray-600 mb-6">
            Please refer to our Return Policy for information about returns and
            refunds. All returns are subject to our approval.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Intellectual Property
          </h2>
          <p className="text-gray-600 mb-6">
            All content on this website, including text, graphics, logos, and
            images, is the property of our company and protected by copyright
            laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-600 mb-6">
            We shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or
            inability to use our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Governing Law
          </h2>
          <p className="text-gray-600 mb-6">
            These terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which our company is registered.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-600 mb-6">
            We reserve the right to modify these terms at any time. Your
            continued use of the service after any changes constitutes
            acceptance of the new terms.
          </p>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Questions?
            </h3>
            <p className="text-gray-600">
              If you have questions about these terms, please{" "}
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
