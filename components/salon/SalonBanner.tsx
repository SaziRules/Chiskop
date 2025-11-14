"use client";

import Image from "next/image";
import React from "react";

type Props = {
  /** Full-bleed background (e.g. /images/salon-banner.png) */
  bgSrc: string;
  /** Foreground product cut-out (e.g. /images/salon.png) */
  fgSrc: string;
  /** Alts for a11y */
  bgAlt?: string;
  fgAlt?: string;
  /** Control overall banner height via Tailwind classes */
  heightClass?: string; // e.g. "h-[480px] md:h-[520px]"
  /** Show white fade into page content (marble to white) */
  fadeBottom?: boolean;
  /** Optional children for overlay copy/CTAs later */
  children?: React.ReactNode;
};

export default function SalonBanner({
  bgSrc,
  fgSrc,
  bgAlt = "Salon background",
  fgAlt = "Chiskop product",
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
        <Image
          src={fgSrc}
          alt={fgAlt}
          width={560}
          height={560}
          priority
          className="
            w-[220px] sm:w-[300px] md:w-[420px] lg:w-[520px]
            h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]
            select-none
          "
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 300px, 220px"
        />
      </div>

      {/* Gentle white fade into page content */}
      {fadeBottom && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-white/95 to-transparent" />
      )}
    </section>
  );
}
