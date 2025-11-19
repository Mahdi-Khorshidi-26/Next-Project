import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/shopify/mutations";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data: result } = await shopifyFetch({
      query: CUSTOMER_ACCESS_TOKEN_CREATE,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    console.log("Shopify login response:", JSON.stringify(result, null, 2));

    const data = result as {
      customerAccessTokenCreate?: {
        customerAccessToken?: {
          accessToken: string;
          expiresAt: string;
        };
        customerUserErrors?: Array<{
          code?: string;
          field?: string[];
          message: string;
        }>;
      };
    };

    if (
      data?.customerAccessTokenCreate?.customerUserErrors &&
      data.customerAccessTokenCreate.customerUserErrors.length > 0
    ) {
      const errors = data.customerAccessTokenCreate.customerUserErrors;
      console.error("Customer user errors:", errors);

      const errorCode = errors[0]?.code;
      const errorMessage = errors[0]?.message || "Invalid credentials";

      // Handle "Unidentified customer" error
      if (
        errorCode === "UNIDENTIFIED_CUSTOMER" ||
        errorMessage.includes("Unidentified customer")
      ) {
        return NextResponse.json(
          {
            error:
              "Your account needs to be activated. Please check your email for the activation link sent when you registered.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    const customerAccessToken =
      data?.customerAccessTokenCreate?.customerAccessToken;

    if (!customerAccessToken) {
      console.error("No access token returned:", data);
      return NextResponse.json(
        {
          error:
            "Failed to authenticate. Your account may not be activated yet. Please check your email for an activation link or verify your credentials.",
        },
        { status: 401 }
      );
    }

    console.log("Login successful, setting cookie");

    // Set the access token as an HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        accessToken: customerAccessToken.accessToken,
        expiresAt: customerAccessToken.expiresAt,
      },
      { status: 200 }
    );

    response.cookies.set(
      "customerAccessToken",
      customerAccessToken.accessToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
