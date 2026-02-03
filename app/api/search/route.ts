import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search across multiple content types
    const searchQuery = groq`
      {
        "products": *[_type == "product" && (
          title match $searchTerm + "*" ||
          pt::text(introDescription) match $searchTerm + "*"
        )][0...5]{
          _id,
          _type,
          title,
          "slug": slug.current,
          "image": variants[0].variantImage.asset->url,
          "category": category,
          "description": pt::text(introDescription)[0...100]
        },
        
        "faqs": *[_type == "faqGroup"]{
          title,
          faqs[
            question match $searchTerm + "*" ||
            pt::text(answer) match $searchTerm + "*" ||
            pt::text(richAnswer) match $searchTerm + "*"
          ][0...3]{
            question,
            "answer": coalesce(pt::text(richAnswer), answer)[0...100],
            "groupTitle": ^.title
          }
        }[count(faqs) > 0],
        
        "pages": *[_type in ["pageHero", "tip"] && (
          heading match $searchTerm + "*" ||
          headline match $searchTerm + "*" ||
          pt::text(content) match $searchTerm + "*"
        )][0...3]{
          _id,
          _type,
          "title": coalesce(heading, headline, title),
          "description": pt::text(content)[0...100]
        }
      }
    `;

    const results = await client.fetch(searchQuery, {
      searchTerm: query.toLowerCase(),
    });

    // Flatten and format results
    const allResults = [
      ...(results.products || []).map((item: any) => ({
        ...item,
        type: "product",
        url: `/mainProduct/${item.slug}`,
      })),
      ...(results.faqs || []).flatMap((group: any) =>
        group.faqs.map((faq: any) => ({
          ...faq,
          type: "faq",
          title: faq.question,
          description: faq.answer,
          groupTitle: faq.groupTitle,
          url: "/contact", // or wherever FAQs live
        }))
      ),
      ...(results.pages || []).map((item: any) => ({
        ...item,
        type: item._type,
        url: `/${item._type}/${item._id}`,
      })),
    ];

    return NextResponse.json({ results: allResults });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}