import GlobalBanner from "@/components/sections/GlobalBanner";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TopTips from "@/components/ChiskopZone/TopTips";
import JoinCrew from "@/components/sections/JoinCrew";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import FaqAccordion from "@/components/contact/FaqAccordion";
import { getPageHero } from "@/lib/sanity/pageHero";
import ImageBanner from "@/components/sections/ImageBanner";

export default async function ChiskopZonePage() {
  // ⭐ Fetch Page Hero
  const hero = await getPageHero("chiskop-zone");

  // ⭐ Fetch FAQ for this page
  const faq = await client.fetch(
    groq`
      *[_type == "faqGroup" && title == "Chiskop Zone"][0]{
        title,
        faqs[] {
          question,
          answer
        }
      }
    `
  );

  // ⭐ Fetch ALL promo banners for this page 
  const promoBanners = await client.fetch(
    groq`
      *[_type == "promoBanner" && page == "chiskop-zone"]{
        "desktopImage": desktopImage.asset->url,
        "mobileImage": mobileImage.asset->url,
        alt
      }
    `
  );

  return (
    <main className="bg-white text-chiskop-black">

      {/* ───────────── PAGE HERO ───────────── */}
      {hero && (
        <GlobalBanner
          desktopImage={hero.desktopImage}
          mobileImage={hero.mobileImage}
          heading={hero.heading}
          headline={hero.headline}
          subtext={hero.subtext}
          alt={hero.alt}
          height="h-[420px] md:h-[500px]"
        />
      )}

      {/* ───────────── INTRO TEXT ───────────── */}
      <Section variant="default" className="py-16 md:py-20 text-center">
        <Container className="max-w-[700px] mx-auto px-6 md:px-8">
          <p className="text-[15px] md:text-[22px] text-chiskop-gray leading-relaxed">
            Welcome to the <strong>Chiskop Zone!</strong> Your go-to spot for
            everything Chiskop. From tips and how-tos to the latest competitions,
            this is where you’ll find everything you need to get the most out of
            your Chiskop products.
          </p>
        </Container>
      </Section>

      {/* ───────────── TOP PROMO BANNERS (if any) ───────────── */}
      {promoBanners[1] && <ImageBanner data={promoBanners[1]} />}

      {/* ───────────── TOP TIPS SECTION ───────────── */}
      <TopTips />

      {/* ───────────── WIN WITH CHISKOP ───────────── */}
      <Section variant="default" className="py-20 text-center">
        <Container className="max-w-[800px] mx-auto px-6 md:px-8">
          <h2 className="text-[27px] md:text-[52px] font-extrabold italic text-chiskop-red uppercase mb-3">
            WIN WITH CHISKOP
          </h2>
          <p className="text-[16px] md:text-[30px] text-chiskop-black leading-tight">
            Keep your eye on this space for Chiskop giveaways, challenges, and competitions.
          </p>
        </Container>
      </Section>

      {/* ───────────── SECOND BATCH OF BANNERS (optional re-render) ───────────── */}
      {promoBanners[0] && <ImageBanner data={promoBanners[0]} />}

      {/* ───────────── FAQ SECTION ───────────── */}
      <Section variant="default" className="bg-white text-chiskop-black py-16 md:py-24">
        <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-[22px] md:text-[46px] font-extrabold text-chiskop-red mb-2">
            Know Your Chiskop
          </h2>
          <p className="text-[15px] md:text-[16px] text-chiskop-gray mb-8">
            Frequently Asked Questions
          </p>

          <FaqAccordion 
            title={faq?.title ?? ""}
            faqs={faq?.faqs ?? []}
          />
        </Container>
      </Section>

      {/* ───────────── JOIN CREW ───────────── */}
      <JoinCrew />

    </main>
  );
}
