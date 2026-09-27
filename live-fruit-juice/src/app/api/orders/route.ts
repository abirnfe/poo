import { NextRequest, NextResponse } from "next/server";
import { getAllOrders, createOrder } from "@/lib/data/orders";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json({ data: orders });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = await createOrder({
      items: body.items,
      note: body.note || null,
      customer_name: body.customer_name || null,
    });

    return NextResponse.json({ data: order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
