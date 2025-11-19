import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_CUSTOMER } from "@/lib/shopify/mutations";

export async function GET(request: NextRequest) {
  try {
    const customerAccessToken = request.cookies.get(
      "customerAccessToken"
    )?.value;

    if (!customerAccessToken) {
      return NextResponse.json({ customer: null }, { status: 200 });
    }

    const { data, errors } = await shopifyFetch<{ customer: any }>({
      query: GET_CUSTOMER,
      variables: {
        customerAccessToken,
      },
    });

    if (errors || !data?.customer) {
      // Token might be expired, clear it
      const response = NextResponse.json({ customer: null }, { status: 200 });
      response.cookies.set("customerAccessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ customer: data.customer }, { status: 200 });
  } catch (error) {
    console.error("Get customer error:", error);
    return NextResponse.json({ customer: null }, { status: 200 });
  }
}
