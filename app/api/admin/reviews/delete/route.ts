import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const { error } = await supabaseServer
    .from("product_reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
