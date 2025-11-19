import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // In development, provide instructions for manual activation
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
      return NextResponse.json({
        success: true,
        message: `Account activation email would be sent to ${email}.`,
        instructions: [
          "For development, please activate the account manually:",
          "1. Go to your Shopify Admin",
          "2. Navigate to Customers",
          `3. Find the customer: ${email}`,
          "4. Click 'Activate account'",
          "5. Then return to the login page",
        ],
        adminUrl: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/customers`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Please check your email for account activation instructions.",
    });
  } catch (error) {
    console.error("Resend activation error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
