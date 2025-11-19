import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { CREATE_CART, ADD_TO_CART } from "@/lib/shopify/mutations";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity } = await request.json();

    if (!variantId || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    let cart;

    if (cartId) {
      // Add to existing cart
      const { data: result } = await shopifyFetch<any>({
        query: ADD_TO_CART,
        variables: {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        },
        cache: "no-store",
      });

      cart = result.cartLinesAdd.cart;
    } else {
      // Create new cart
      const { data: result } = await shopifyFetch<any>({
        query: CREATE_CART,
        variables: {
          input: {
            lines: [{ merchandiseId: variantId, quantity }],
          },
        },
        cache: "no-store",
      });

      cart = result.cartCreate.cart;

      // Set cart ID cookie
      cookieStore.set("cartId", cart.id, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    // Transform cart data
    const transformedCart = {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      lines: cart.lines.edges.map((edge: any) => ({
        id: edge.node.id,
        quantity: edge.node.quantity,
        merchandise: edge.node.merchandise,
        cost: edge.node.cost,
      })),
      cost: cart.cost,
    };

    return NextResponse.json({ cart: transformedCart });
  } catch (error) {
    console.error("Cart add error:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
