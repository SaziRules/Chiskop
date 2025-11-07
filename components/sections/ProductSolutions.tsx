import React from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Link from "next/link";
import BuyModal from "../modals/BuyModal";

export default function ProductSolutions() {
  const atHomeProducts = [
    {
      category: "for Head & Body | 50G",
      title: "Chiskop For Men Soothing Balm & Aftershave ",
      img: "/images/soothing-balm.png",
      link: "/product", // ← for now links to main product page
    },
    {
      category: "for Head & Body | 80G",
      title: "Chisckop For Men Hair Removal Cream ",
      img: "/images/hair-removal.png",
      link: "/product",
    },
    {
      category: "for Head & Body | 200G",
      title: "Chiskop For Men Hair Removal Cream",
      img: "/images/hair-removal.png",
      link: "/product",
    },
  ];

  const salonProducts = [
    {
      category: "for Head & Body | 950G",
      title: "Chiskop For Men Hair Removal Cream ",
      img: "/images/hair-removal.png",
      link: "/product",
    },
  ];

  return (
    <Section variant="default" className="bg-white text-chiskop-black py-16 md:py-24">
      <Container className="max-w-[1200px] mx-auto px-6">
        {/* ───────────── AT-HOME SOLUTIONS ───────────── */}
        <h2 className="text-center md:text-left text-chiskop-gray text-[20px] md:text-[28px] mb-10">
          AT-HOME SOLUTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {atHomeProducts.map((p, i) => (
            <div key={i} className="bg-white overflow-hidden flex flex-col items-center relative">
             {/* ───────────── Cart Icon ───────────── */}
<div className="absolute top-4 left-4 z-10 ">
  <BuyModal standalone />  {/* 👈 Add standalone prop */}
</div>


              {/* Image */}
              <Link href={p.link} className="w-full">
                <div className="bg-chiskop-offWhite flex items-center justify-center h-[340px] md:h-[400px] p-8">
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={260}
                    height={260}
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Text */}
              <div className="px-5 pt-4 pb-6 w-full text-center md:text-left md:px-0 md:pr-5">
                <p className="uppercase text-[14px] text-chiskop-lightGray font-normal mb-1 tracking-wide">
                  {p.category}
                </p>

                <Link href={p.link}>
                  <h3 className="text-[17px] font-semibold text-chiskop-black leading-snug mb-3 hover:text-chiskop-red transition-colors">
                    {p.title}
                  </h3>
                </Link>

                {/* Rating Placeholder */}
                <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-lightGray text-[13px]">
                  <span>★★★★★</span>
                  <span className="ml-1 text-[12px]">(0)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ───────────── SALON SOLUTIONS ───────────── */}
        <h2 className="text-center mt-14 md:text-left text-chiskop-gray text-[20px] md:text-[28px] mb-10">
          SALON SOLUTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 justify-items-center">
          {salonProducts.map((p, i) => (
            <div key={i} className="bg-white overflow-hidden flex flex-col items-center relative">
              {/* Cart Icon */}
              <div className="absolute top-4 left-4 z-10 w-9 h-9 md:w-10 md:h-10">
                <Image
                  src="/images/cart.png"
                  alt="Cart"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              {/* Image */}
              <Link href={p.link} className="w-full">
                <div className="bg-chiskop-offWhite flex items-center justify-center h-[340px] md:h-[400px] p-8">
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Text */}
              <div className="px-5 pt-4 pb-6 w-full text-center md:text-left md:px-0 md:pr-5">
                <p className="uppercase text-[14px] text-chiskop-lightGray font-normal mb-1 tracking-wide">
                  {p.category}
                </p>

                <Link href={p.link}>
                  <h3 className="text-[17px] font-semibold text-chiskop-black leading-snug mb-3 hover:text-chiskop-red transition-colors">
                    {p.title}
                  </h3>
                </Link>

                {/* Rating Placeholder */}
                <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-lightGray text-[13px]">
                  <span>★★★★★</span>
                  <span className="ml-1 text-[12px]">(0)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
