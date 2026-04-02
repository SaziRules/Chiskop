import SalonBanner from "@/components/salon/SalonBanner";
import SalonIntro from "@/components/salon/SalonIntro";
import SalonProfessionalSection from "@/components/salon/SalonProfessionalSection";
import JoinCrew from "@/components/sections/JoinCrew";
import ImageBanner from "@/components/sections/ImageBanner";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export default async function SalonPortalPage() {
  const promoBanners = await client.fetch(
    groq`
      *[_type == "promoBanner" && page == "salon"]{
        "desktopImage": desktopImage.asset->url,
        "mobileImage": mobileImage.asset->url,
        alt,
        externalLink
      }
    `
  );

  return (
    <main className="bg-white text-chiskop-black">
      <SalonBanner
        bgSrc="/images/SaloBanner.jpg"
        heightClass="h-[480px] md:h-[560px]"
      />
      <SalonIntro />
      {promoBanners[0] && <ImageBanner data={promoBanners[0]} />}
      <SalonProfessionalSection />
      {/* next sections... */}
      <JoinCrew />
    </main>
  );
}