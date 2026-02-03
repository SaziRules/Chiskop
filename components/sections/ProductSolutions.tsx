"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Link from "next/link";
import BuyModal from "../modals/BuyModal";
import { client } from "@/sanity/lib/client";
import ImageBanner from "./ImageBanner";
import { groq } from "next-sanity";

interface ProductItem {
  id: string;
  category: string;
  title: string;
  img: string;
  link: string;
  size: string;
  slug: string;
  variantIndex: number; // ⭐ Added to track which variant this is
}

/* ───────────── FETCH ALL PRODUCTS + FLATTEN VARIANTS ───────────── */
async function fetchProductSolutions(): Promise<{
  home: ProductItem[];
  salon: ProductItem[];
  promoBanners: any[];
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

  const { promoBanners } = await client.fetch(
    groq`
      { 
        "retailerStrip": *[_type == "retailerStrip"][3]{
          retailers[] {
            name,
            "logo": logo.asset->url,
            url
          }
        },

        // ⭐ Fetch ALL banners for the PRODUCTS page
        "promoBanners": *[_type == "promoBanner" && page == "products"]{
          "desktopImage": desktopImage.asset->url,
          "mobileImage": mobileImage.asset->url,
          alt
        }
      }
    `
  );

  /* ===================================================================================
     HOME: SHOW ALL HOME PRODUCTS EXCEPT 950G
     =================================================================================== */

  const homeProductsRaw = allProducts.filter((p: any) => p.category === "home");

  // Flatten variants and EXCLUDE 950G, track variant index
  const home: ProductItem[] = homeProductsRaw.flatMap((product: any) =>
    product.variants
      ?.map((v: any, index: number) => ({ variant: v, originalIndex: index }))
      .filter((item: any) => item.variant.sizeLabel !== "950G")
      .map((item: any) => ({
        id: product._id,
        title: product.title,
        category: `For Head & Body | ${item.variant.sizeLabel}`,
        img: item.variant.img,
        size: item.variant.sizeLabel,
        link: `/mainProduct/${product.slug.current}`,
        slug: product.slug.current,
        variantIndex: item.originalIndex, // ⭐ Store original index
      }))
  );

  /* ===================================================================================
     SALON: DO NOT TOUCH THIS SECTION (but add variantIndex)
     =================================================================================== */

  const salonProductsRaw = allProducts.filter((p: any) => p.category === "salon");

  const salon: ProductItem[] = salonProductsRaw.flatMap((product: any) =>
    product.variants?.map((v: any, index: number) => ({
      id: product._id,
      title: product.title,
      category: `For Head & Body | ${v.sizeLabel}`,
      img: v.img,
      size: v.sizeLabel,
      link: `/mainProduct/${product.slug.current}`,
      slug: product.slug.current,
      variantIndex: index, // ⭐ Track variant index
    }))
  );

  return { home, salon, promoBanners };
}

/* ───────────── FETCH RATINGS FOR SLUGS ───────────── */
async function getRatingsForSlugs(slugs: string[]) {
  const results: Record<string, { avg: number; count: number }> = {};

  await Promise.all(
    slugs.map(async (slug) => {
      try {
        const res = await fetch(`/api/reviews/${slug}`, { cache: "no-store" });
        const reviews = await res.json();

        if (Array.isArray(reviews) && reviews.length > 0) {
          const total = reviews.reduce((s, r) => s + (r.rating || 0), 0);
          const avg = total / reviews.length;

          results[slug] = {
            avg: Number(avg.toFixed(1)),
            count: reviews.length,
          };
        } else {
          results[slug] = { avg: 0, count: 0 };
        }
      } catch {
        results[slug] = { avg: 0, count: 0 };
      }
    })
  );

  return results;
}

/* ───────────── MAIN COMPONENT ───────────── */
export default function ProductSolutions() {
  const [ratings, setRatings] = useState<Record<string, { avg: number; count: number }>>({});
  const [home, setHome] = useState<ProductItem[]>([]);
  const [salon, setSalon] = useState<ProductItem[]>([]);
  const [promoBanners, setPromoBanners] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetchProductSolutions();
      setHome(res.home);
      setSalon(res.salon);
      setPromoBanners(res.promoBanners);

      // Fetch ratings for all product slugs
      const slugs = Array.from(new Set([...res.home, ...res.salon].map((p) => p.slug)));
      const ratingData = await getRatingsForSlugs(slugs);
      setRatings(ratingData);
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
                {/* ⭐ Now passing variantIndex */}
                <BuyModal 
                  standalone 
                  productId={p.id} 
                  variantIndex={p.variantIndex}
                />
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
                  <h3 className="text-[17px] font-semibold text-chiskop-black capitalize leading-snug mb-3 hover:text-chiskop-red transition-colors">
                    {p.title}
                  </h3>
                </Link>

                {/* ⭐ Dynamic Ratings */}
                {(() => {
                  const r = ratings[p.slug] || { avg: 0, count: 0 };
                  const filled = "★".repeat(Math.round(r.avg));
                  const empty = "☆".repeat(5 - Math.round(r.avg));

                  return (
                    <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-lightGray text-[13px]">
                      <span>{filled}{empty}</span>
                      <span className="ml-1 text-[12px]">({r.count})</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

      </Container>

      {promoBanners[0] && <ImageBanner data={promoBanners[0]} />}

      <Container className="max-w-[1200px] mx-auto px-6">

        {/* ───────────── SALON SOLUTIONS ───────────── */}
        <h2 className="text-center mt-14 md:text-left text-chiskop-gray text-[20px] md:text-[28px] mb-10">
          SALON SOLUTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 justify-items-center">
          {salon.map((p, i) => (
            <div key={i} className="bg-white overflow-hidden flex flex-col items-center relative">

              <div className="absolute top-4 left-4 z-10 w-9 h-9 md:w-10 md:h-10">
                {/* ⭐ Now passing variantIndex */}
                <BuyModal 
                  standalone 
                  productId={p.id}
                  variantIndex={p.variantIndex}
                />
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
                  <h3 className="text-[17px] font-semibold capitalize text-chiskop-black leading-snug mb-3 hover:text-chiskop-red transition-colors">
                    {p.title}
                  </h3>
                </Link>

                {/* ⭐ Dynamic Ratings */}
                {(() => {
                  const r = ratings[p.slug] || { avg: 0, count: 0 };
                  const filled = "★".repeat(Math.round(r.avg));
                  const empty = "☆".repeat(5 - Math.round(r.avg));

                  return (
                    <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-lightGray text-[13px]">
                      <span>{filled}{empty}</span>
                      <span className="ml-1 text-[12px]">({r.count})</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}