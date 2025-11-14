"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Link from "next/link";
import BuyModal from "../modals/BuyModal";
import { client } from "@/sanity/lib/client";

interface ProductItem {
  id: string;
  category: string;
  title: string;
  img: string;
  link: string;
  size: string;
}

/* ───────────── FETCH ALL PRODUCTS + FLATTEN VARIANTS ───────────── */
async function fetchProductSolutions(): Promise<{
  home: ProductItem[];
  salon: ProductItem[];
}> {
  const query = `
    *[_type == "product"]{
      _id,
      title,
      slug,
      category,
      variants[] {
        sizeLabel,
        "img": variantImage.asset->url
      }
    }
  `;

  const allProducts = await client.fetch(query);

  /* ===================================================================================
     HOME: SHOW ALL HOME PRODUCTS EXCEPT 950G
     =================================================================================== */

  const homeProductsRaw = allProducts.filter((p: any) => p.category === "home");

  // Flatten variants and EXCLUDE 950G
  const home: ProductItem[] = homeProductsRaw.flatMap((product: any) =>
    product.variants
      ?.filter((v: any) => v.sizeLabel !== "950G") // ← EXCLUDE 950G ONLY HERE
      .map((v: any) => ({
        id: product._id,
        title: product.title,
        category: `For Head & Body | ${v.sizeLabel}`,
        img: v.img,
        size: v.sizeLabel,
        link: `/mainProduct/${product.slug.current}`,
      }))
  );

  /* ===================================================================================
     SALON: DO NOT TOUCH THIS SECTION
     =================================================================================== */

  const salonProductsRaw = allProducts.filter((p: any) => p.category === "salon");

  const salon: ProductItem[] = salonProductsRaw.flatMap((product: any) =>
    product.variants?.map((v: any) => ({
      id: product._id,
      title: product.title,
      category: `For Head & Body | ${v.sizeLabel}`,
      img: v.img,
      size: v.sizeLabel,
      link: `/mainProduct/${product.slug.current}`,

    }))
  );

  return { home, salon };
}

/* ───────────── MAIN COMPONENT ───────────── */
export default function ProductSolutions() {
  const [home, setHome] = useState<ProductItem[]>([]);
  const [salon, setSalon] = useState<ProductItem[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetchProductSolutions();
      setHome(res.home);
      setSalon(res.salon);
    }
    load();
  }, []);

  return (
    <Section variant="default" className="bg-white text-chiskop-black py-16 md:py-24">
      <Container className="max-w-[1200px] mx-auto px-6">

        {/* ───────────── AT-HOME SOLUTIONS ───────────── */}
        <h2 className="text-center md:text-left text-chiskop-gray text-[20px] md:text-[28px] mb-10">
          AT-HOME SOLUTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {home.map((p, i) => (
            <div key={i} className="bg-white overflow-hidden flex flex-col items-center relative">

              <div className="absolute top-4 left-4 z-10">
                <BuyModal standalone productId={p.id} />
              </div>

              <Link href={p.link} className="w-full">
                <div className="bg-chiskop-offWhite flex items-center justify-center h-[340px] md:h-[400px] p-8">
                  <Image src={p.img} alt={p.title} width={260} height={260} className="object-contain" />
                </div>
              </Link>

              <div className="px-5 pt-4 pb-6 w-full text-center md:text-left md:px-0 md:pr-5">
                <p className="uppercase text-[14px] text-chiskop-lightGray mb-1 tracking-wide">
                  {p.category}
                </p>

                <Link href={p.link}>
                  <h3 className="text-[17px] font-semibold text-chiskop-black leading-snug mb-3 hover:text-chiskop-red transition-colors">
                    {p.title}
                  </h3>
                </Link>

                <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-lightGray text-[13px]">
                  <span>★★★★★</span>
                  <span className="ml-1 text-[12px]">(0)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ───────────── SALON SOLUTIONS (UNCHANGED) ───────────── */}
        <h2 className="text-center mt-14 md:text-left text-chiskop-gray text-[20px] md:text-[28px] mb-10">
          SALON SOLUTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 justify-items-center">
          {salon.map((p, i) => (
            <div key={i} className="bg-white overflow-hidden flex flex-col items-center relative">

              <div className="absolute top-4 left-4 z-10 w-9 h-9 md:w-10 md:h-10">
                <BuyModal standalone productId={p.id} />
              </div>

              <Link href={p.link} className="w-full">
                <div className="bg-chiskop-offWhite flex items-center justify-center h-[340px] md:h-[400px] p-8">
                  <Image src={p.img} alt={p.title} width={280} height={280} className="object-contain" />
                </div>
              </Link>

              <div className="px-5 pt-4 pb-6 w-full text-center md:text-left md:px-0 md:pr-5">
                <p className="uppercase text-[14px] text-chiskop-lightGray mb-1 tracking-wide">
                  {p.category}
                </p>

                <Link href={p.link}>
                  <h3 className="text-[17px] font-semibold text-chiskop-black leading-snug mb-3 hover:text-chiskop-red transition-colors">
                    {p.title}
                  </h3>
                </Link>

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
