import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { REMOVE_FROM_CART } from "@/lib/shopify/mutations";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { lineId } = await request.json();

    if (!lineId) {
      return NextResponse.json({ error: "Missing line ID" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return NextResponse.json({ error: "No cart found" }, { status: 404 });
    }

    const { data: result } = await shopifyFetch<any>({
      query: REMOVE_FROM_CART,
      variables: {
        cartId,
        lineIds: [lineId],
      },
      cache: "no-store",
    });

    const cart = result.cartLinesRemove.cart;

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
    console.error("Cart remove error:", error);
    return NextResponse.json(
      { error: "Failed to remove item" },
      { status: 500 }
    );
  }
}
