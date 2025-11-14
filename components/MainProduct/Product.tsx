"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import FeatureBadge from "../ui/FeatureBadge";
import ShopNowButton from "../ui/ShopNowButton";

interface ProductProps {
  product: {
    _id: string;   // ← ADD THIS
    title: string;
    introDescription?: any[];
    featureBadges?: string[];
    variants: {
      sizeLabel: string;
      img: string;
      variantDescription?: any[];
      variantFeatures?: string[];
    }[];
  };
}


export default function Product({ product }: ProductProps) {
  const { title, introDescription, featureBadges, variants } = product;

  // Active selected variant (default = first one)
  const [active, setActive] = useState(0);

  const current = variants[active];

  const currentDescription =
    current?.variantDescription?.[0]?.children?.[0]?.text ??
    introDescription?.[0]?.children?.[0]?.text ??
    "";

  const currentFeatures = current?.variantFeatures?.length
    ? current.variantFeatures
    : featureBadges ?? [];

  return (
    <Section
      variant="default"
      className="bg-white text-chiskop-black py-12 md:py-24"
    >
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* ───────────── Top Two-Column Layout ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
          {/* LEFT — Product Image */}
<div className="flex justify-center md:justify-left bg-[#f7f7f7] py-2">
  <div
    key={current.img} // IMPORTANT: forces animation per image change
    className="transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
  >
    <Image
      src={
        current?.img ||
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
      }
      alt={title || "Chiskop Product"}
      width={500}
      height={500}
      className="object-contain w-auto h-[400px] md:h-[460px]"
    />
  </div>
</div>



          {/* RIGHT — Product Info */}
          <div className="flex flex-col justify-center space-y-5 max-w-[500px] mx-auto md:mx-0">
            {/* Product Title */}
            <h1 className="text-[24px] md:text-[34px] font-semibold leading-tight text-chiskop-black text-left">
              {title}
            </h1>

            {/* Variants */}
            <div className="flex items-center justify-start gap-3">
              {variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`text-[15px] md:text-[16px] font-semibold px-4 py-2 rounded-[10px] border-2 transition-colors ${
                    i === active
                      ? "bg-chiskop-red text-white border-chiskop-red"
                      : "border-chiskop-red text-chiskop-red hover:bg-chiskop-red hover:text-white"
                  }`}
                >
                  {v.sizeLabel}
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="max-w-[400px] text-left">
              <p className="text-[14px] md:text-[16px] text-chiskop-gray leading-[1.65]">
                {currentDescription}
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-start">
              <ShopNowButton productId={product._id} />

            </div>
          </div>
        </div>

        {/* ───────────── Feature Badges Row ───────────── */}
        <div className="flex flex-wrap justify-start gap-3 md:gap-5 mt-8 md:mt-14">
          {currentFeatures.map((feature, i) => (
            <div key={i} className="min-w-fit">
              <FeatureBadge label={feature} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
