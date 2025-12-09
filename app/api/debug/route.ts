import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "missing",
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "exists" : "missing",
    serviceRole: process.env.SUPABASE_SERVICE_ROLE ? "exists" : "missing"
  });
}
