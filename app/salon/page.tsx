import SalonBanner from "@/components/salon/SalonBanner";
import SalonIntro from "@/components/salon/SalonIntro";
import SalonProfessionalSection from "@/components/salon/SalonProfessionalSection";
import JoinCrew from "@/components/sections/JoinCrew";
import ImageBanner from "@/components/sections/ImageBanner";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import GlobalBanner from "@/components/sections/GlobalBanner";
import { getPageHero } from "@/lib/sanity/pageHero";

export default async function SalonPortalPage() {
  const hero = await getPageHero("salon");
  const [promoBanners] = await Promise.all([
    client.fetch(
      groq`
        *[_type == "promoBanner" && page == "salon"]{
          "desktopImage": desktopImage.asset->url,
          "mobileImage": mobileImage.asset->url,
          alt,
          externalLink
        }
      `
    )
  ]);

  return (
    <main className="bg-white text-chiskop-black">
      {/* ───────────── PAGE HERO ───────────── */}
            {hero && (
              <GlobalBanner
                desktopImage={hero.desktopImage}
                mobileImage={hero.mobileImage}
                alt={hero.alt}
              />
            )}
      <SalonIntro />
      {promoBanners[0] && <ImageBanner data={promoBanners[0]} />}
      <SalonProfessionalSection />
      {/* next sections... */}
      <JoinCrew />
    </main>
  );
}