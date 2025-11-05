import { createClient } from "next-sanity";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-04", // today’s date ensures schema freshness
  useCdn: true, // faster read performance for public data
});
