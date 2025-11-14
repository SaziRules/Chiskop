import GlobalBanner from "@/components/sections/GlobalBanner";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TopTips from "@/components/ChiskopZone/TopTips";
import JoinCrew from "@/components/sections/JoinCrew";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import FaqAccordion from "@/components/contact/FaqAccordion";

export default async function ChiskopZonePage() {
  // ⭐ FETCH FAQ GROUP for this page
  const faq = await client.fetch(
    groq`*[_type == "faqGroup" && title == "Chiskop Zone"][0]{
      title,
      faqs[]{
        question,
        answer
      }
    }`
  );

  return (
    <main className="bg-white text-chiskop-black">
      {/* ───────────── HERO BANNER ───────────── */}
      <GlobalBanner title="Chiskop Zone" height="h-[400px] md:h-[500px]" />

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

      {/* ───────────── BANNER ───────────── */}
      <GlobalBanner title="BANNER IMAGE - TUTORIAL / STEP BY STEP GUIDE" height="md:h-[500px]" />

      {/* ───────────── TOP TIPS SECTION ───────────── */}
      <TopTips />

      {/* ───────────── WIN WITH CHISKOP ───────────── */}
      <Section variant="default" className="py-20 text-center">
        <Container className="max-w-[800px] mx-auto px-6 md:px-8">
          <h2 className="text-[26px] md:text-[52px] font-extrabold italic text-chiskop-red uppercase mb-3">
            WIN WITH CHISKOP
          </h2>
          <p className="text-[16px] md:text-[30px] text-chiskop-black leading-9">
            Keep your eye on this space for Chiskop giveaways, challenges, and competitions.
          </p>
        </Container>
      </Section>

      {/* ───────────── BANNER ───────────── */}
      <GlobalBanner title="BANNER IMAGE" height="md:h-[500px]" />

      {/* ───────────── FAQ SECTION ───────────── */}
      <Section variant="default" className="bg-white text-chiskop-black py-16 md:py-24">
        <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-[22px] md:text-[26px] font-bold text-chiskop-red mb-6">
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

      {/* ───────────── JOIN THE CREW ───────────── */}
      <JoinCrew />
    </main>
  );
}
