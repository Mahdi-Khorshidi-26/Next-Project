"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

        {submitted && (
          <div className="mb-8 rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Thank you for your message! We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Have a question or concern? Fill out the form and we&apos;ll get
              back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Email
                </h3>
                <p className="text-gray-600">support@example.com</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Phone
                </h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Address
                </h3>
                <p className="text-gray-600">
                  123 Main Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />

            <Input
              label="Subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="How can we help?"
            />

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Tell us more..."
              />
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
