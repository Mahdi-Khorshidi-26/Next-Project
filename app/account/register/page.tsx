"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      router.push("/account");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-2 text-gray-600">Join us today</p>
      </div>

      <div className="rounded-md bg-blue-50 border border-blue-200 p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> After registration, you'll receive an email to
          activate your account. Please check your inbox and click the
          activation link before logging in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="John"
          />

          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Doe"
          />
        </div>

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
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="••••••••"
        />

        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 mt-1 rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{" "}
            <Link
              href="/pages/terms"
              className="font-medium text-black hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/pages/privacy"
              className="font-medium text-black hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/account/login"
          className="font-medium text-black hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
