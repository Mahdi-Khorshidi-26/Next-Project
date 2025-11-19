import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions",
};

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unused items in original packaging. Please contact our support team to initiate a return.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you will receive a tracking number via email. You can also view tracking information in your account dashboard.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.",
  },
  {
    question: "How do I cancel my order?",
    answer:
      "Orders can be cancelled within 1 hour of placement. After this time, please contact our support team for assistance.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes, gift wrapping is available for most items. You can select this option during checkout.",
  },
  {
    question: "Are your products authentic?",
    answer:
      "Yes, all our products are 100% authentic and sourced directly from authorized distributors.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-8 last:border-0"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gray-50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Can&apos;t find the answer you&apos;re looking for? Please contact
            our customer support team.
          </p>
          <a
            href="/pages/contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
