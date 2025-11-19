"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
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
        <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800 font-medium">{error}</p>
            {error.includes("activated") && (
              <div className="mt-3 text-xs text-red-700 space-y-2">
                <p className="font-semibold">
                  For development, manually activate your account:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to your Shopify Admin</li>
                  <li>Navigate to Customers</li>
                  <li>Find and click on your email</li>
                  <li>Click "Activate account" button</li>
                  <li>Return here and login</li>
                </ol>
                <a
                  href="https://vytfm1-sb.myshopify.com/admin/customers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline font-semibold"
                >
                  Open Shopify Admin →
                </a>
              </div>
            )}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/account/reset"
            className="text-sm font-medium text-black hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Sign In
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/account/register"
          className="font-medium text-black hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
