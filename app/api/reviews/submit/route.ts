export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("product_reviews")
    .insert({
      productSlug: body.productSlug,
      name: body.name,
      title: body.title,
      message: body.message,
      rating: body.rating,
      recommend: body.recommend,
      approved: false, // ⭐ moderation
    })
    .select()
    .single();

  if (error) {
    console.error("Review insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, review: data });
}
