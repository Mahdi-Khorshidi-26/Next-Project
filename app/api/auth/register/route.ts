import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  CUSTOMER_CREATE,
  CUSTOMER_ACCESS_TOKEN_CREATE,
} from "@/lib/shopify/mutations";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create customer account
    const createResult = await shopifyFetch({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
          acceptsMarketing: false,
        },
      },
    });

    console.log(
      "Customer create response:",
      JSON.stringify(createResult, null, 2)
    );

    const createData = createResult as {
      customerCreate?: {
        customer?: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
        };
        customerUserErrors?: Array<{
          code?: string;
          field?: string[];
          message: string;
        }>;
      };
    };

    if (
      createData?.customerCreate?.customerUserErrors &&
      createData.customerCreate.customerUserErrors.length > 0
    ) {
      const errors = createData.customerCreate.customerUserErrors;
      console.error("Customer create errors:", errors);
      const errorMessage = errors[0]?.message || "Failed to create account";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Auto-login after registration
    const loginResult = await shopifyFetch({
      query: CUSTOMER_ACCESS_TOKEN_CREATE,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    console.log("Auto-login response:", JSON.stringify(loginResult, null, 2));

    const loginData = loginResult as {
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
      loginData?.customerAccessTokenCreate?.customerUserErrors &&
      loginData.customerAccessTokenCreate.customerUserErrors.length > 0
    ) {
      const errors = loginData.customerAccessTokenCreate.customerUserErrors;
      console.log("Auto-login failed, user needs to activate account:", errors);
      return NextResponse.json(
        {
          success: true,
          message:
            "Account created successfully. Please check your email to activate your account before logging in.",
        },
        { status: 201 }
      );
    }

    const customerAccessToken =
      loginData?.customerAccessTokenCreate?.customerAccessToken;

    if (!customerAccessToken) {
      console.log(
        "No access token from auto-login, account may need activation"
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Account created successfully. Please check your email to activate your account before logging in.",
        },
        { status: 201 }
      );
    }

    // Set the access token as an HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        customer: createData?.customerCreate?.customer,
      },
      { status: 201 }
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
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
