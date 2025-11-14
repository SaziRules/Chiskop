"use client";

import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";

// Helper: extract simple text from Portable Text blocks
const extractText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map((b: any) => b?.children?.[0]?.text || "").join(" ");
};

export default function ProductUsageSection({
  usage,
  ingredients,
}: {
  usage: any[];
  ingredients: any[];
}) {
  const usageText =
    extractText(usage) ||
    `Always follow the directions for use. Irritation or allergic reaction may occur with
    sensitive skin. Test product before each use by applying it to a small part of the area
    where hair is to be removed. Follow the directions for use and wait 24 hours. If skin
    appears normal, proceed with full application. Do not use on irritated, inflamed,
    sunburnt or broken skin. If irritation occurs during use remove the product and rinse
    area thoroughly with cold water. If irritation persists, consult your physician. Product
    can be used on head, chest, arms and legs. Do not use around eyes, in nose, in ears, on
    nipples, perianal or genital areas. Keep away from eyes. Should product touch the eyes,
    wash thoroughly with lukewarm water. Keep out of reach of children.`.trim();

  const ingredientsText =
    extractText(ingredients) ||
    `Aqua (water), Cetostearyl Alcohol, Thioglycolic Acid, Calcium Hydroxide, Ceteth-20,
     Potassium Hydroxide, Aloe Barbadensis Leaf Juice, Tetrasodium EDTA, Parfum, Citronellol,
     Geraniol.`.trim();

  return (
    <Section
      variant="default"
      className="bg-[#fafafa] text-chiskop-black py-16 md:py-24"
    >
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Important Usage Info */}
        <div className="mb-10">
          <h2 className="text-[20px] md:text-[22px] font-bold text-chiskop-red uppercase mb-3 tracking-tight">
            Important Usage Information
          </h2>
          <p className="text-[15px] md:text-[16px] text-chiskop-black leading-[1.8] max-w-[900px]">
            {usageText}
          </p>
        </div>

        {/* Ingredients */}
        <div>
          <h2 className="text-[20px] md:text-[22px] font-bold text-chiskop-red uppercase mb-3 tracking-tight">
            Ingredients
          </h2>
          <p className="text-[15px] md:text-[16px] text-chiskop-black leading-[1.8] max-w-[900px]">
            {ingredientsText}
          </p>
        </div>
      </Container>
    </Section>
  );
}
