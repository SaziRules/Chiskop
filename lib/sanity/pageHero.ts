import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const PAGE_HERO_QUERY = groq`
  *[_type == "pageHero" && page.current == $slug && enabled == true][0]{
    heading,
    headline,
    subtext,
    alt,
    "desktopImage": desktopImage.asset->url,
    "mobileImage": mobileImage.asset->url
  }
`;

export async function getPageHero(slug: string) {
  try {
    const hero = await client.fetch(PAGE_HERO_QUERY, { slug });
    return hero || null;
  } catch (error) {
    console.error("Error fetching Page Hero:", error);
    return null;
  }
}
