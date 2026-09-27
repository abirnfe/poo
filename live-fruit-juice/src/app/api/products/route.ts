import { NextRequest, NextResponse } from "next/server";
import {
  getAllProducts,
  createProduct,
} from "@/lib/data/products";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ data: products });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await createProduct({
      name: body.name,
      icon: body.icon,
      description: body.description || null,
      price_s: parseFloat(body.price_s),
      price_m: parseFloat(body.price_m),
      price_l: parseFloat(body.price_l),
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
