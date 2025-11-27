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
  theme?: "light" | "dark" | "red";
  hotspot?: { x: number; y: number };
  headline?: string;
  subheadline?: string;
  buttonLabel?: string;
  buttonLink?: string;
  textPosition?: "left" | "center" | "right";
}

export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hasLoaded, setHasLoaded] = useState(false);

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
            alt,
            theme,
            headline,
            subheadline,
            buttonLabel,
            buttonLink,
            textPosition
          }`
        );
        setBanners(data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    }
    fetchBanners();
  }, []);

  // ───────────── Set Loaded State ─────────────
  useEffect(() => {
    if (banners.length) setHasLoaded(true);
  }, [banners]);

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
  const placeholders: Banner[] = [
  {
    _id: "placeholder",
    desktopImage: "",
    mobileImage: "",
    alt: "Placeholder Banner",
    hotspot: { x: 0.5, y: 0.5 },

    // NEW FIELDS (avoid TS errors)
    headline: "",
    subheadline: "",
    buttonLabel: "",
    buttonLink: "",
    textPosition: "left",
  },
];


  const slides = banners.length ? banners : placeholders;
  const hotspot = slides[current]?.hotspot || { x: 0.5, y: 0.5 };
  const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;

  // ───────────── Improved Slide Animation ─────────────
  const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "tween", duration: 0.9, ease: "easeInOut" },
      opacity: { duration: 0.5 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      x: { type: "tween", duration: 0.9, ease: "easeInOut" },
      opacity: { duration: 0.4 },
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
      <AnimatePresence custom={direction} mode="sync">

  <motion.div
    key={slides[current]._id}
    variants={variants as any}
    custom={direction}
    initial={hasLoaded ? "enter" : "center"}
    animate="center"
    exit="exit"
    className="absolute inset-0 w-full h-full"
  >
    {/* BACKGROUND IMAGE */}
    {slides[current].desktopImage ? (
      <Image
        src={slides[current].desktopImage}
        alt={slides[current].alt || "Chiskop Banner"}
        fill
        priority
        className="hidden md:block object-cover object-right"
        style={{ objectPosition }}
      />
    ) : (
      <div className="hidden md:block w-full h-full bg-section-gradient" />
    )}

    {slides[current].mobileImage ? (
      <Image
        src={slides[current].mobileImage}
        alt={slides[current].alt || "Chiskop Banner"}
        fill
        priority
        className="block md:hidden object-cover object-center"
        style={{ objectPosition }}
      />
    ) : (
      <div className="block md:hidden w-full h-full bg-section-gradient" />
    )}

    {/* TEXT CONTENT - NOW INSIDE THE MOTION DIV */}
    <div
      className={`
        absolute top-1/2 -translate-y-1/2
        z-20
        px-6 md:px-12
        max-w-[620px]
        flex flex-col gap-6
        ${slides[current].textPosition === "center" ? "left-1/2 -translate-x-1/2 text-center"
          : "left-6 md:left-16 text-left"}
      `}
    >
      {/* HEADLINE */}
      {slides[current].headline && (
        <h1
  className={`
    font-extrabold uppercase tracking-tight leading-none
    text-[46px] md:text-[76px]
    ${slides[current].theme === "red" ? "text-chiskop-red" : ""}
    ${slides[current].theme === "dark" ? "text-black" : ""}
    ${slides[current].theme === "light" ? "chrome-text" : ""}
  `}
>
  {slides[current].headline}
</h1>

      )}

      {/* SUBHEADLINE */}
      {slides[current].subheadline && (
        <p
          className="
            text-white/90 font-medium uppercase leading-tight
            text-[22px] md:text-[32px]
            drop-shadow-xl
          "
        >
          {slides[current].subheadline}
        </p>
      )}

      {/* BUTTON */}
      {slides[current].buttonLabel && slides[current].buttonLink && (
        <a
  href={slides[current].buttonLink}
  className={`
    mt-2 inline-block font-bold uppercase
    px-8 py-4 rounded-lg text-[16px] md:text-[18px]
    shadow-lg transition-all w-fit

    ${
      slides[current].theme === "light"
        ? "bg-white text-chiskop-red hover:bg-red-200"
        : ""
    }

    ${
      slides[current].theme === "red"
        ? "bg-chiskop-red text-white hover:bg-red-700"
        : ""
    }

    ${
      slides[current].theme === "dark"
        ? "bg-black text-white hover:bg-gray-800"
        : ""
    }
  `}
>
  {slides[current].buttonLabel}
</a>

      )}
    </div>

  </motion.div>
</AnimatePresence>


      {/* ───────────── Overlay ───────────── */}
      <div className="absolute inset-0 bg-black/10 z-1" />

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
