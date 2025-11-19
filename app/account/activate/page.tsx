"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ActivateAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activationUrl = searchParams.get("url");
    const token = searchParams.get("token");

    let timeoutId: NodeJS.Timeout;

    if (activationUrl || token) {
      // Account was activated via Shopify
      Promise.resolve().then(() => {
        setStatus("success");
        setMessage("Your account has been activated successfully!");
      });

      // Redirect to login after 3 seconds
      timeoutId = setTimeout(() => {
        router.push("/account/login");
      }, 3000);
    } else {
      Promise.resolve().then(() => {
        setStatus("error");
        setMessage(
          "Invalid activation link. Please check your email and try again."
        );
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchParams, router]);

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="mb-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Activating your account...
            </h1>
            <p className="text-gray-600">Please wait</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 text-green-600">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Account Activated!
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
            <Button
              onClick={() => router.push("/account/login")}
              className="mt-4"
            >
              Go to Login
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 text-red-600">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Activation Failed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button
              onClick={() => router.push("/account/login")}
              variant="secondary"
            >
              Go to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
