import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { UPDATE_CART_LINE } from "@/lib/shopify/mutations";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { lineId, quantity } = await request.json();

    if (!lineId || quantity === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return NextResponse.json({ error: "No cart found" }, { status: 404 });
    }

    const result = await shopifyFetch<any>({
      query: UPDATE_CART_LINE,
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
      cache: "no-store",
    });

    const cart = result.cartLinesUpdate.cart;

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
    console.error("Cart update error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
