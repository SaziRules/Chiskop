import React from "react";
import Section from "@/components/Section";

export interface GlobalBannerProps {
  title?: string;
  height?: string; // ✅ added height prop
}

export default function GlobalBanner({
  title = "BANNER IMAGE",
  height = "md:h-[420px]", // ✅ default height (can be overridden)
}: GlobalBannerProps) {
  return (
    <Section
      variant="default"
      className={`w-full bg-linear-to-r from-chiskop-black via-chiskop-gray to-chiskop-offWhite h-80 ${height} flex items-center justify-center`}
    >
      <h2 className="text-white uppercase tracking-[0.3em] text-[14px] md:text-[16px] font-medium">
        {title}
      </h2>
    </Section>
  );
}
