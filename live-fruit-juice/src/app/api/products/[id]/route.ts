import { NextRequest, NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "@/lib/data/products";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const product = await updateProduct(id, {
      name: body.name,
      icon: body.icon,
      description: body.description || null,
      price_s: parseFloat(body.price_s),
      price_m: parseFloat(body.price_m),
      price_l: parseFloat(body.price_l),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteProduct(id);

    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
