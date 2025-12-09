// @ts-nocheck
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase/client";

export async function GET(req: Request, context: any) {
  // ⭐ FIX: unwrap params (Webpack bug workaround)
  const params = await context.params;
  const slug = params.slug;

  console.log("API HIT! slug =", slug);

  const { data, error } = await supabaseClient
    .from("product_reviews")
    .select("*")
    .eq("productSlug", slug)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
