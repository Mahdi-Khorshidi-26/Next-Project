"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const { customer, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Account</h1>
          <p className="text-gray-600 mb-8">
            Please sign in to access your account
          </p>
          <div className="space-x-4">
            <Link href="/account/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/account/register">
              <Button variant="secondary">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {customer.firstName}!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <Link
            href="/account/profile"
            className="rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Profile
            </h2>
            <p className="text-gray-600">Manage your personal information</p>
          </Link>

          {/* Orders Card */}
          <Link
            href="/account/orders"
            className="rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Orders</h2>
            <p className="text-gray-600">View your order history</p>
          </Link>

          {/* Addresses Card */}
          <Link
            href="/account/addresses"
            className="rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Addresses
            </h2>
            <p className="text-gray-600">Manage shipping addresses</p>
          </Link>

          {/* Logout Card */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Sign Out
            </h2>
            <p className="text-gray-600 mb-4">End your session</p>
            <Button onClick={handleLogout} variant="destructive">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
