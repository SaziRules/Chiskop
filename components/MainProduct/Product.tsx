import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import FeatureBadge from "../ui/FeatureBadge";
import ShopNowButton from "../ui/ShopNowButton"; // ← import reusable modal button

export default function Product() {
  return (
    <Section variant="default" className="bg-white text-chiskop-black py-12 md:py-24">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* ───────────── Top Two-Column Layout ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
          {/* Left: Product Image */}
          <div className="flex justify-center md:justify-left bg-[#f7f7f7] py-2">
            <Image
              src="/images/hair-removal.png"
              alt="Chiskop Hair Removal Cream"
              width={500}
              height={500}
              className="object-contain w-auto h-[400px] md:h-[460px]"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center space-y-5 max-w-[500px] mx-auto md:mx-0">
            {/* Product Title */}
            <h1 className="text-[24px] md:text-[34px] font-semibold leading-tight text-chiskop-black text-left">
              Hair Removal Cream
            </h1>

            {/* Variants */}
            <div className="flex items-center justify-start gap-3">
              {["80G", "200G", "950G"].map((variant, i) => (
                <button
                  key={i}
                  className={`text-[15px] md:text-[16px] font-semibold px-4 py-2 rounded-[10px] border-2 transition-colors ${
                    variant === "80G"
                      ? "bg-chiskop-red text-white border-chiskop-red"
                      : "border-chiskop-red text-chiskop-red hover:bg-chiskop-red hover:text-white"
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="max-w-[400px] text-left">
              <p className="text-[14px] md:text-[16px] text-chiskop-gray leading-[1.65]">
                Suitable for both the head and body, Chiskop leaves skin smoother
                for longer! With no razor rash, no bumps, and no prickly regrowth.
                Simply apply, leave, and rinse off for clean, touchable skin in
                just 7 minutes.
              </p>
            </div>

            {/* CTA (Reusable Shop Now Button) */}
            <div className="flex justify-start">
              <ShopNowButton /> {/* 👈 Replaces static Link */}
            </div>
          </div>
        </div>

        {/* ───────────── Feature Badges Row ───────────── */}
        <div className="flex flex-wrap justify-start gap-3 md:gap-5 mt-8 md:mt-14">
          {[
            "NO RAZOR RASH",
            "NO BUMPS",
            "ALOE VERA",
            "NO PRICKLY REGROWTH",
            "WORKS IN 7 MINUTES",
          ].map((feature, i) => (
            <div key={i} className="min-w-fit">
              <FeatureBadge label={feature} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
