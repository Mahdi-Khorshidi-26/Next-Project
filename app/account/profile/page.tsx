"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Profile Settings
        </h1>
        <p className="mt-2 text-gray-600">Manage your personal information</p>
      </div>

      <div className="mx-auto max-w-2xl">
        {success && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Profile updated successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <Input
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Password</h2>
            <p className="text-sm text-gray-600">
              Want to change your password?{" "}
              <Link
                href="/account/reset"
                className="font-medium text-black hover:underline"
              >
                Reset password
              </Link>
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Marketing Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="email-marketing"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 mt-1 rounded border-gray-300 text-black focus:ring-black"
                />
                <label htmlFor="email-marketing" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900">
                    Email Marketing
                  </span>
                  <p className="text-gray-600">
                    Receive emails about new products, sales, and promotions
                  </p>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="sms-marketing"
                  type="checkbox"
                  className="h-4 w-4 mt-1 rounded border-gray-300 text-black focus:ring-black"
                />
                <label htmlFor="sms-marketing" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900">
                    SMS Marketing
                  </span>
                  <p className="text-gray-600">
                    Receive text messages about exclusive offers
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button type="button" variant="secondary" asChild>
              <Link href="/account">Cancel</Link>
            </Button>
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Danger Zone
          </h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h3 className="text-sm font-semibold text-red-900 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              type="button"
              className="text-sm font-medium text-red-600 hover:text-red-700 underline"
            >
              Delete my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
