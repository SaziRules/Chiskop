import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

import Hero from "@/components/Home/Hero";
import ProductRange from "@/components/Home/ProductRange";
import ImageBanner from "@/components/sections/ImageBanner";
import RetailersStrip from "@/components/sections/RetailersStrip";
import BrandInfo from "@/components/sections/BrandInfo";
import JoinCrew from "@/components/sections/JoinCrew";

export default async function Home() {

  const { retailerStrip, promoBanners } = await client.fetch(
    groq`
      {
        "retailerStrip": *[_type == "retailerStrip"][0]{
          retailers[] {
            name,
            "logo": logo.asset->url,
            url
          }
        },

        // ⭐ Fetch ALL banners for the HOME page
        "promoBanners": *[_type == "promoBanner" && page == "home"]{
          "desktopImage": desktopImage.asset->url,
          "mobileImage": mobileImage.asset->url,
          alt
        }
      }
    `
  );

  return (
    <>
      <Hero />
      <ProductRange />

      {/* ⭐ Render first banner */}
      {promoBanners[0] && <ImageBanner data={promoBanners[0]} />}

      {/* ⭐ Retailer Strip */}
      <RetailersStrip retailers={retailerStrip?.retailers ?? []} />

      {/* ⭐ Render second banner */}
      {promoBanners[1] && <ImageBanner data={promoBanners[1]} />}

      <BrandInfo />

      {/* ⭐ Render third banner */}
      {promoBanners[2] && <ImageBanner data={promoBanners[2]} />}

      <JoinCrew />
    </>
  );
}
