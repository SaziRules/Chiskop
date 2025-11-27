"use client";

import Image from "next/image";
import Section from "@/components/Section";

export default function ImageBanner({
  data,
}: {
  data: {
    bannerImage?: { asset?: { url: string } };
    alt?: string;
  } | null;
}) {
  const imageUrl = data?.bannerImage?.asset?.url;

  if (!imageUrl) {
    return (
      <Section
        variant="default"
        className="w-full h-80 md:h-[420px] bg-gray-200 flex items-center justify-center"
      >
        <p className="text-gray-600 text-sm">No banner uploaded</p>
      </Section>
    );
  }

  return (
    <Section variant="default" className="relative w-full h-80 md:h-[520px]">
      <Image
        src={imageUrl}
        alt={data?.alt || "Promo Banner"}
        fill
        className="object-cover"
      />
    </Section>
  );
}
