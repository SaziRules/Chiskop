"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";

interface Banner {
  _id: string;
  desktopImage: string;
  mobileImage: string;
  alt?: string;
  hotspot?: { x: number; y: number };
}

export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // ───────────── Fetch from Sanity ─────────────
  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await client.fetch(
          `*[_type == "heroBanner"] | order(_createdAt desc)[0...3]{
            _id,
            "desktopImage": desktopImage.asset->url,
            "mobileImage": mobileImage.asset->url,
            "hotspot": desktopImage.hotspot,
            alt
          }`
        );
        setBanners(data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    }
    fetchBanners();
  }, []);

  // ───────────── Auto Slide ─────────────
  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  // ───────────── Placeholder ─────────────
  const placeholders = [
    {
      _id: "placeholder",
      desktopImage: "",
      mobileImage: "",
      alt: "Placeholder Banner",
      hotspot: { x: 0.5, y: 0.5 },
    },
  ];

  const slides = banners.length ? banners : placeholders;
  const hotspot = slides[current]?.hotspot || { x: 0.5, y: 0.5 };
  const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;

  // ───────────── Improved Slide Animation (Push-Style) ─────────────
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 1, ease: "easeInOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 1, ease: "easeInOut" },
      },
    }),
  };

  return (
    <section
      className="
        relative w-full overflow-hidden flex items-center justify-center
        bg-section-gradient text-center
        aspect-4/5 sm:aspect-4/3 md:aspect-16/8 lg:aspect-16/7 xl:aspect-16/6
      "
    >
      {/* ───────────── Slides ───────────── */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={slides[current]._id}
          variants={variants as any}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Desktop Image */}
          {slides[current].desktopImage ? (
            <Image
              src={slides[current].desktopImage}
              alt={slides[current].alt || "Chiskop Banner"}
              fill
              priority
              className="hidden md:block object-cover"
              style={{ objectPosition }}
            />
          ) : (
            <div className="hidden md:block w-full h-full bg-section-gradient" />
          )}

          {/* Mobile Image (portrait ratio fix) */}
          {slides[current].mobileImage ? (
            <Image
              src={slides[current].mobileImage}
              alt={slides[current].alt || "Chiskop Banner"}
              fill
              priority
              className="block md:hidden object-cover object-center"
              style={{
                objectPosition,
                aspectRatio: "9/16",
              }}
            />
          ) : (
            <div className="block md:hidden w-full h-full bg-section-gradient" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ───────────── Overlay ───────────── */}
      <div className="absolute inset-0 bg-black/10 z-1" />

      {/* ───────────── Placeholder Text ───────────── */}
      {!banners.length && (
        <div className="relative z-2">
          <h1 className="uppercase tracking-[0.35em] font-semibold text-[24px] md:text-[32px] text-white">
            BANNER IMAGE
          </h1>
        </div>
      )}

      {/* ───────────── Pagination Dots ───────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
