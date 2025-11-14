import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // unwrap the params

  const product = await client.fetch(
    `
      *[_type == "product" && slug.current == "${slug}"][0]{
        _id,
        title,
        introDescription,
        featureBadges,
        
        variants[]{
          sizeLabel,
          "img": variantImage.asset->url,   // <– THIS MUST BE CORRECT
          variantDescription,
          variantFeatures
        }
      }
    `
  );

  return NextResponse.json({ product });
}
