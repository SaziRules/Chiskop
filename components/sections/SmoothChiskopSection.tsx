import Image from "next/image";

interface SmoothChiskopSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string; // sanity later
}

export default function SmoothChiskopSection({
  title = "FOR A SMOOTH CHISKOP EVERY TIME",
  description = `The Chiskop range is your complete at-home solution for a clean, smooth finish in just 7 minutes.
Formulated with Vitamin E and Aloe Vera, it's designed to care for your skin while removing hair effortlessly.
Start with the Hair Removal Cream for a smooth chiskop, then finish with the Soothing Balm to cool, calm, and protect your skin.`,
  imageUrl = "/images/right-bg.jpg", // ⭐ Default to local image
}: SmoothChiskopSectionProps) {
  return (
    <section className="relative w-full bg-white">
      {/* ───────────── RIGHT SIDE (desktop only) ───────────── */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden md:block w-1/2">
        <Image
          src={imageUrl}
          alt="Chiskop visual"
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>

      {/* ───────────── LEFT SIDE (matches ProductSolutions width) ───────────── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[420px] md:min-h-[520px]">
          {/* ───────────── Text column ───────────── */}
          <div className="py-12 md:py-20 flex items-center">
            <div className="max-w-[480px] space-y-4 md:space-y-5">
              <h2 className="uppercase font-extrabold leading-tight text-chiskop-red text-[20px] text-center sm:text-left sm:text-[21px] md:text-[33px]">
                {title}
              </h2>
              <p className="text-[15px] sm:text-[16px] md:text-[19px] leading-relaxed text-chiskop-black text-center sm:text-left">
                {description}
              </p>
            </div>
          </div>

          {/* Mobile image hidden - desktop only */}
        </div>
      </div>
    </section>
  );
}