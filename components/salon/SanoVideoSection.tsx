import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default function SalonVideoSection() {
  return (
    <Section
      variant="default"
      className="bg-white text-chiskop-black py-20 md:py-24 text-center"
    >
      <Container className="max-w-[1800px] mx-auto px-6 md:px-8">
        {/* ───────────── Intro Text ───────────── */}
        <p className="text-[15px] md:text-[19px] text-chiskop-black font-bold leading-relaxed mb-10">
          Watch how easy it is to create a smooth, professional chiskop<br /> using our
          Hair Removal Cream and Soothing Balm.
        </p>

        {/* ───────────── Video Placeholder ───────────── */}
        <div className="w-full bg-linear-to-r from-chiskop-black to-chiskop-gray text-white py-40 md:py-52 rounded-none ">
          <p className="uppercase font-semibold text-[13px] tracking-wide">
            VIDEO TUTORIAL (PC)
          </p>
          <p className="uppercase text-[12px] tracking-wide mt-2 opacity-80">
            IMAGE BANNER (MOBILE) WITH LINK TO VIDEO
          </p>
        </div>
      </Container>
    </Section>
  );
}
