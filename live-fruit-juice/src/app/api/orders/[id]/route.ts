import { NextRequest, NextResponse } from "next/server";
import { updateOrder, getOrder } from "@/lib/data/orders";
import { OrderStatus } from "@/lib/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates: { status?: OrderStatus; note?: string | null } = {};
    if (body.status) updates.status = body.status as OrderStatus;
    if (body.note !== undefined) updates.note = body.note || null;

    const order = await updateOrder(id, updates);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ data: order });
  } catch {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ data: order });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
