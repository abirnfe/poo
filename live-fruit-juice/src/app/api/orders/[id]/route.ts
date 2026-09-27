import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};

  if (body.status) updateData.status = body.status;
  if (body.note !== undefined) updateData.note = body.note || null;
  if (body.customer_name !== undefined)
    updateData.customer_name = body.customer_name || null;

  const { data, error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data?.[0] ?? null });
}
