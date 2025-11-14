import React from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Link from "next/link";
import BuyModal from "@/components/modals/BuyModal";

export default function ProductRecommended() {
  const recommendedProduct = {
    title: "Soothing Balm & Aftershave",
    category: "FOR HEAD & BODY | 50G",
    img: "/images/soothing-balm.png",
    link: "/product",
  };

  return (
    <Section variant="default" className="bg-[#fafafa] text-chiskop-black py-16 md:py-24">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* ───────────── Section Heading ───────────── */}
        <h2 className="text-left text-chiskop-red text-[20px] md:text-[30px] font-semibold mb-8">
          Best used with
        </h2>

        {/* ───────────── Product Card ───────────── */}
        <div className="bg-[#fafafa] overflow-hidden flex flex-col items-start relative max-w-[360px]">
          {/* Floating Cart Icon */}
          <div className="absolute top-4 left-4 z-10">
            <BuyModal standalone />
          </div>

          {/* Image */}
          <Link href={recommendedProduct.link} className="w-full">
            <div className="bg-chiskop-offWhite flex items-center justify-center h-[340px] md:h-[360px] p-8">
              <Image
                src={recommendedProduct.img}
                alt={recommendedProduct.title}
                width={260}
                height={260}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Text */}
          <div className="pt-4 pb-6 text-left">
            <Link href={recommendedProduct.link}>
              <h3 className="text-[18px] font-semibold text-chiskop-black leading-snug mb-1 hover:text-chiskop-red transition-colors">
                {recommendedProduct.title}
              </h3>
            </Link>

            <p className="uppercase text-[14px] text-chiskop-lightGray font-normal mb-3 tracking-wide">
              {recommendedProduct.category}
            </p>

            {/* CTA */}
            <Link
              href={recommendedProduct.link}
              className="inline-block bg-chiskop-red text-white text-[14px] uppercase font-bold px-5 py-2 rounded-md hover:bg-[#7c1217] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
