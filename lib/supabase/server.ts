import { createClient } from "@supabase/supabase-js";

// ⚠️ SERVICE ROLE KEY — SERVER ONLY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE!;

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey);
