import React from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import FeatureBadge from "@/components/ui/FeatureBadge"; // ✅ locked badge component

export default function TopTips() {
  const tips = [
    {
      title: "Always Do a Patch Test",
      description:
        "Before using Chiskop Hair Removal Cream, apply a small amount on a small area of skin and leave it on for a few minutes. Rinse and wait 24 hours; if there’s no irritation, you’re good to go.",
    },
    {
      title: "Use the Soothing Balm After",
      description:
        "Apply right after using the hair removal cream to cool, calm, and protect your skin. Did you know? It also works as an aftershave.",
    },
    {
      title: "Hair Length Matters",
      description:
        "For best results, hair should not be too long before applying — around 1–2mm is ideal. Shorter hair makes removal faster, smoother, and more even.",
    },
  ];

  return (
    <Section
      variant="default"
      className="relative bg-[#fafafa] text-chiskop-black py-16 md:py-24 overflow-hidden"
    >
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        {/* ───────────── Heading ───────────── */}
        <h2 className="text-chiskop-red text-[26px] md:text-[34px] font-extrabold mb-10">
          Top Tips
        </h2>

        {/* ───────────── Grid Layout ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side — Tips */}
          <div className="space-y-8">
            {tips.map((tip, i) => (
              <div key={i} className="flex flex-col gap-2">
                <FeatureBadge label={tip.title.toUpperCase()} />
                <p className="text-[16px] text-chiskop-gray leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side — Product Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/chiskop-zone.png"
              alt="Chiskop Soothing Balm"
              width={700}
              height={700}
              className="object-contain w-[520px] md:w-[620px] lg:w-[680px]"
              priority
            />
          </div>
        </div>
      </Container>

      {/* ───────────── Subtle Bottom Gradient ───────────── */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] bg-linear-to-t from-[#f2f2f2] to-transparent" />
    </Section>
  );
}
