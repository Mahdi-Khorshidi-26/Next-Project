import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_CART } from "@/lib/shopify/mutations";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const { data: result } = await shopifyFetch<any>({
      query: GET_CART,
      variables: { cartId },
      cache: "no-store",
    });

    if (!result.cart) {
      // Cart not found, clear cookie
      cookieStore.delete("cartId");
      return NextResponse.json({ cart: null });
    }

    const cart = result.cart;

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
    console.error("Cart fetch error:", error);
    return NextResponse.json({ cart: null });
  }
}
