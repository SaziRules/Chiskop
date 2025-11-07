import Section from "@/components/Section";

interface GlobalBannerProps {
  /** Optional overlay title text (default: “Image Banner”) */
  title?: string;
  /** Optional background image (e.g. fetched from Sanity later) */
  imageUrl?: string;
  /** Optional height control (default: smaller global height) */
  heightClass?: string;
  /** Optional gradient override */
  gradientClass?: string;
}

/**
 * GlobalBanner — a reusable site-wide banner section.
 * Shorter than the Home banner, with flexible props for
 * title, image background, gradient overlay, and height.
 */
export default function GlobalBanner({
  title = "Image Banner",
  imageUrl,
  heightClass = "h-64 md:h-[340px]",
  gradientClass = "bg-gradient-to-r from-chiskop-black via-chiskop-gray to-chiskop-offWhite",
}: GlobalBannerProps) {
  return (
    <Section
      variant="default"
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden`}
    >
      {/* ───── Background image (optional) ───── */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* ───── Gradient overlay ───── */}
      <div className={`absolute inset-0 ${gradientClass} opacity-90`} />

      {/* ───── Title / Overlay Text ───── */}
      <div className="relative z-10 text-center">
        <h2 className="text-white uppercase tracking-[0.3em] text-[14px] md:text-[16px] font-medium">
          {title}
        </h2>
      </div>
    </Section>
  );
}
