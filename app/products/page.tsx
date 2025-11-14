"use client";

import GlobalBanner from "@/components/sections/GlobalBanner";
import JoinCrew from "@/components/sections/JoinCrew";
import ProductSolutions from "@/components/sections/ProductSolutions";
import SmoothChiskopSection from "@/components/sections/SmoothChiskopSection";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      title: "Hair Removal Cream",
      subtitle: "FOR HEAD & BODY | 80G",
      img: "/images/products/cream-80g.png",
      link: "#",
    },
    {
      title: "Soothing Balm & Aftershave",
      subtitle: "FOR HEAD & BODY | 50G",
      img: "/images/products/balm-50g.png",
      link: "#",
    },
    {
      title: "Hair Removal Cream",
      subtitle: "FOR HEAD & BODY | 200G",
      img: "/images/products/cream-200g.png",
      link: "#",
    },
  ];

  const salonProducts = [
    {
      title: "Salon Size Hair Removal Cream",
      subtitle: "FOR HEAD & BODY | 950G",
      img: "/images/products/cream-950g.png",
      link: "#",
    },
  ];

  return (
    <main className="bg-[#f9f7f6] text-chiskop-black">
      {/* ───────────── Banner ───────────── */}
      <GlobalBanner
        title="Our Products"
        height="h-[400px] md:h-[500px]"
      />

        {/* ───────────── Products ───────────── */}
        <ProductSolutions />
      {/* ───────────── Info Section ───────────── */}
      <SmoothChiskopSection />

      {/* ───────────── Signup Section ───────────── */}
      <JoinCrew />
    </main>
  );
}
