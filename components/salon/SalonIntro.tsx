import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import FeatureBadge from "@/components/ui/FeatureBadge";

export default function SalonIntro() {
  return (
    <Section variant="default" className="bg-[#fafafa] text-chiskop-black py-16 md:py-20 text-center">
      <Container className="max-w-[900px] mx-auto py-14 px-6 md:px-8">
        {/* ───────────── Intro Paragraph ───────────── */}
        <p className="text-[15px] md:text-[19px] text-chiskop-gray leading-relaxed mb-8">
          Chiskop For Men now comes in a salon-sized 950g pack, specially
          designed for barbers and grooming professionals. It’s the easy,
          blade-free solution for clients who want a clean, smooth chiskop.
        </p>

        {/* ───────────── Feature Badges ───────────── */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
          <FeatureBadge label="NO RAZOR RASH" />
          <FeatureBadge label="NO BUMPS" />
          <FeatureBadge label="NO PRICKLY REGROWTH" />
        </div>

        {/* ───────────── Subtext ───────────── */}
        <p className="text-[15px] md:text-[19px] text-chiskop-black font-semibold leading-relaxed">
          Deliver lasting smoothness in just 7 minutes, with results<br /> your
          clients will feel and see immediately.
        </p>
      </Container>
    </Section>
  );
}
