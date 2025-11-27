import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

import Hero from "@/components/Home/Hero";
import ProductRange from "@/components/Home/ProductRange";
import ImageBanner from "@/components/sections/ImageBanner";
import RetailersStrip from "@/components/sections/RetailersStrip";
import BrandInfo from "@/components/sections/BrandInfo";
import JoinCrew from "@/components/sections/JoinCrew";

export default async function Home() {
  // ⭐ Fetch Retailer Strip + Promo Banner
  const { retailerStrip, promoBanner } = await client.fetch(
    groq`
      {
        "retailerStrip": *[_type == "retailerStrip"][0]{
          retailers[] {
            name,
            "logo": logo.asset->url,
            url
          }
        },

        "promoBanner": *[_type == "promoBanner"][0]{
          bannerImage {
            asset->{
              url
            }
          },
          alt
        }
      }
    `
  );

  return (
    <>
      <Hero />
      <ProductRange />

      {/* ⭐ Homepage Banner (CMS) */}
      <ImageBanner data={promoBanner} />

      {/* ⭐ Retailer Strip (CMS) */}
      <RetailersStrip retailers={retailerStrip?.retailers ?? []} />

      <BrandInfo />
      <JoinCrew />
    </>
  );
}
