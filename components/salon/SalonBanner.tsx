"use client";

import Image from "next/image";
import React from "react";

type Props = {
  /** Full-bleed background (e.g. /images/salon-banner.png) */
  bgSrc: string;
  /** Alts for a11y */
  bgAlt?: string;
  heightClass?: string; // e.g. "h-[480px] md:h-[520px]"
  /** Show white fade into page content (marble to white) */
  fadeBottom?: boolean;
  /** Optional children for overlay copy/CTAs later */
  children?: React.ReactNode;
};

export default function SalonBanner({
  bgSrc,
  bgAlt = "Salon background",
  heightClass = "h-[480px] md:h-[520px]",
  fadeBottom = true,
  children,
}: Props) {
  return (
    <section className={`relative w-width-full ${heightClass} overflow-hidden`}>
      {/* Background (full bleed) */}
      <Image
        src={bgSrc}
        alt={bgAlt}
        fill
        priority
        className="object-cover object-center select-none"
        sizes="100vw"
      />

      {/* Optional top content (e.g. headline/tagline) */}
      {children ? (
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-[1200px] w-full px-6 md:px-8">
            {children}
          </div>
        </div>
      ) : null}

      {/* Foreground product image */}
      <div
        className="
          pointer-events-none
          absolute bottom-2 md:bottom-4 right-4
          flex items-end justify-end
        "
      >
      </div>
    </section>
  );
}
