"use client";

import Image from "next/image";
import Section from "@/components/Section";

export default function ImageBanner({
  data,
}: {
  data: {
    desktopImage?: string;
    mobileImage?: string;
    alt?: string;
  } | null;
}) {
  const desktopUrl = data?.desktopImage || null;
  const mobileUrl = data?.mobileImage || null;
  const alt = data?.alt || "Promo Banner";

  // ⭐ Case 1: No images at all
  if (!desktopUrl && !mobileUrl) {
    return (
      <Section className="w-full bg-gray-200 flex items-center justify-center py-20">
        <p className="text-gray-600 text-sm">No banner uploaded</p>
      </Section>
    );
  }

  // ⭐ Case 2: Only desktop image
  if (desktopUrl && !mobileUrl) {
    return (
      <Section className="relative w-full">
        <Image
          src={desktopUrl}
          alt={alt}
          width={2000}
          height={700}
          className="w-full h-auto object-cover"
          priority
        />
      </Section>
    );
  }

  // ⭐ Case 3: Only mobile image
  if (!desktopUrl && mobileUrl) {
    return (
      <Section className="relative w-full">
        <Image
          src={mobileUrl}
          alt={alt}
          width={1080}
          height={1600}
          className="w-full h-auto object-cover"
          priority
        />
      </Section>
    );
  }

  // ⭐ Case 4: Both exist
  return (
    <Section className="relative w-full">
      {/* Desktop */}
      <Image
        src={desktopUrl as string}
        alt={alt}
        width={2000}
        height={700}
        className="hidden md:block w-full h-auto object-cover"
        priority
      />

      {/* Mobile */}
      <Image
        src={mobileUrl as string}
        alt={alt}
        width={1080}
        height={1600}
        className="block md:hidden w-full h-auto object-cover"
        priority
      />
    </Section>
  );
}
