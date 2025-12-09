"use client";

import { useState, useEffect } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { client } from "@/sanity/lib/client";

type TabKey = "home" | "salon";

interface ProductItem {
  category: string;
  title: string;
  img: string;
  link: string;
  slug: string; // ⭐ ADDED
}

/* ───────────── FETCH FROM SANITY ───────────── */
async function fetchProductRange(): Promise<{ home: ProductItem[]; salon: ProductItem[] }> {
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

  /* ---- HOME SOLUTIONS (only show 80g, 200g, 50g) ---- */
  const homeProductsRaw = allProducts.filter((p: any) => p.category === "home");

  let home: ProductItem[] = [];

  for (const product of homeProductsRaw) {
    product.variants.forEach((v: any) => {
      if (!v?.sizeLabel) return;

      const size = v.sizeLabel.trim().toLowerCase();
      const allowedSizes = ["80g", "200g", "50g"];
      if (!allowedSizes.includes(size)) return;

      home.push({
        title: product.title,
        category: `For Head & Body | ${v.sizeLabel}`,
        img: v.img,
        link: `/mainProduct/${product.slug.current}`,
        slug: product.slug.current, // ⭐ ADDED
      });
    });
  }

  /* ---- SALON SOLUTIONS (unchanged) ---- */
  const salon = allProducts
    .filter((p: any) => p.category === "salon")
    .map((p: any) => ({
      title: p.title,
      category: `For Head & Body | ${p.variants[0].sizeLabel}`,
      img: p.variants[0].img,
      link: `/mainProduct/${p.slug.current}`,
      slug: p.slug.current, // ⭐ ADDED
    }));

  return { home, salon };
}

/* ───────────── FETCH RATINGS USING EXISTING API ───────────── */
async function getRatings(slugs: string[]) {
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
export default function ProductRange() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const [products, setProducts] = useState<{ home: ProductItem[]; salon: ProductItem[] }>({
    home: [],
    salon: [],
  });

  const [ratings, setRatings] = useState<Record<string, { avg: number; count: number }>>({});

  /* Fetch real data (NO BREAKING CHANGES) */
  useEffect(() => {
    async function load() {
      const res = await fetchProductRange();
      setProducts(res);

      // ⭐ Collect slugs
      const slugs = Array.from(new Set([...res.home, ...res.salon].map((p) => p.slug)));

      // ⭐ Fetch ratings
      const ratingData = await getRatings(slugs);
      setRatings(ratingData);
    }
    load();
  }, []);

  const tabs = [
    { id: "home", label: "Home Solutions" },
    { id: "salon", label: "Salon Solutions" },
  ];

  return (
    <Section variant="default" className="bg-white text-chiskop-black py-20 md:py-28">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8 text-center">

        {/* ───────────── Section Heading ───────────── */}
        <h2 className="text-[22px] md:text-[42px] italic font-extrabold text-chiskop-red mb-10 tracking-tight uppercase leading-tight">
          <span className="block">Awu, S’bon’ iSmoothness</span>
          <span className="block">It’s Chiskop!</span>
        </h2>

        {/* ───────────── Tabs ───────────── */}
        <div className="relative w-full max-w-[400px] mx-auto mb-10">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ddd]" />

          <div className="flex justify-center items-center gap-10 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={clsx(
                  "relative pb-4 text-[15px] md:text-[16px] font-bold uppercase tracking-wide transition-colors cursor-pointer",
                  activeTab === tab.id
                    ? "text-chiskop-red"
                    : "text-chiskop-gray hover:text-chiskop-black"
                )}
              >
                {tab.label}
              </button>
            ))}

            <span
              className={clsx(
                "absolute bottom-0 h-[3px] bg-chiskop-red transition-all duration-500 ease-in-out",
                activeTab === "home" ? "left-0 w-[50%]" : "left-[50%] w-[50%]"
              )}
            />
          </div>
        </div>

        {/* ───────────── Animated Product Transition ───────────── */}
        <div className="relative overflow-hidden min-h-[500px]">
          <div
            className={clsx(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              activeTab === "home"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            <ProductGrid products={products.home} ratings={ratings} />
          </div>

          <div
            className={clsx(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              activeTab === "salon"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            <ProductGrid products={products.salon} ratings={ratings} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── Grid & Mobile Swipe Component ───────────── */
function ProductGrid({ products, ratings }: { products: ProductItem[]; ratings: any }) {
  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 justify-items-center">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} rating={ratings[p.slug]} />
        ))}
      </div>

      {/* Mobile Swipe */}
      <div className="md:hidden overflow-x-auto flex gap-5 snap-x snap-mandatory scroll-smooth px-1 pb-5">
        {products.map((p, i) => (
          <div key={i} className="snap-start shrink-0 w-[82%]">
            <ProductCard {...p} rating={ratings[p.slug]} />
          </div>
        ))}
      </div>
    </>
  );
}

/* ───────────── Individual Product Card ───────────── */
function ProductCard({
  category,
  title,
  img,
  link,
  rating,
}: ProductItem & { rating?: { avg: number; count: number } }) {
  const r = rating || { avg: 0, count: 0 };
  const filled = "★".repeat(Math.round(r.avg));
  const empty = "☆".repeat(5 - Math.round(r.avg));

  return (
    <div className="bg-white overflow-hidden flex flex-col items-center relative w-full max-w-[350px] transition-all duration-300">
      <Link href={link} className="w-full">
        <div className="bg-chiskop-offWhite flex items-center justify-center h-[340px] md:h-[400px] p-8">
          <Image src={img} alt={title} width={260} height={260} className="object-contain" />
        </div>
      </Link>

      <div className="px-5 pt-4 pb-6 w-full text-center md:text-left md:px-0 md:pr-5">
        <p className="uppercase text-[14px] text-chiskop-lightGray font-normal mb-1 tracking-wide">
          {category}
        </p>

        <Link href={link}>
          <h3 className="text-[17px] capitalize font-semibold text-chiskop-black leading-snug mb-3 hover:text-chiskop-red transition-colors">
            {title}
          </h3>
        </Link>

        {/* ⭐ Dynamic Ratings */}
        <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-lightGray text-[13px]">
          <span>{filled}{empty}</span>
          <span className="ml-1 text-[12px]">({r.count})</span>
        </div>
      </div>
    </div>
  );
}
