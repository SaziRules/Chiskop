import Image from "next/image";
import Section from "@/components/Section";

interface GlobalBannerProps {
  desktopImage?: string;
  mobileImage?: string;
  alt?: string;

  heading?: string;
  headline?: string;
  subtext?: string;

  height?: string; // optional override
}

export default function GlobalBanner({
  desktopImage = "",
  mobileImage = "",
  alt = "Banner Image",

  heading = "",
  headline = "",
  subtext = "",

  height = "md:h-[520px]",
}: GlobalBannerProps) {
  return (
    <Section
      variant="default"
      className={`
        relative w-full overflow-hidden
        flex items-center justify-start
        px-6 md:px-16
        ${height}
      `}
    >
      {/* Desktop Background */}
      {desktopImage && (
        <Image
          src={desktopImage}
          alt={alt || "Page hero banner image"}

          fill
          className="hidden md:block absolute inset-0 object-cover z-0"
        />
      )}

      {/* Mobile Background */}
      {mobileImage && (
        <Image
          src={mobileImage}
          alt={alt || "Page hero mobile banner image"}
          fill
          className="block md:hidden absolute inset-0 object-cover z-0"
        />
      )}

      {/* TEXT OVERLAY */}
      <div className="relative z-10 max-w-[780px] flex flex-col gap-4 py-10">

        {/* Small Heading */}
        {heading && (
          <h5 className="uppercase tracking-wide text-white text-[14px] md:text-[18px] font-medium">
            {heading}
          </h5>
        )}

        {/* Main Headline */}
        {headline && (
          <h1 className="
            text-white font-extrabold uppercase
            leading-[1.1]
            text-[32px] md:text-[64px]
          ">
            {headline}
          </h1>
        )}

        {/* Subtext */}
        {subtext && (
          <p className="
            text-white/90 text-[16px] md:text-[24px]
            max-w-[590px] leading-snug
          ">
            {subtext}
          </p>
        )}
      </div>
    </Section>
  );
}
