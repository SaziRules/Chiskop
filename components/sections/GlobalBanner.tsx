import Image from "next/image";

interface GlobalBannerProps {
  desktopImage?: string;
  mobileImage?: string;
  alt?: string;

  heading?: string;
  headline?: string;
  subtext?: string;

  height?: string; // ✅ added
}

export default function GlobalBanner({
  desktopImage = "",
  mobileImage = "",
  alt = "Banner Image",
  height = "", // ✅ added
}: GlobalBannerProps) {
  return (
    <div className={`relative w-full ${height}`}>
      {/* Desktop Background */}
      {desktopImage && (
        <Image
          src={desktopImage}
          alt={alt || "Page hero banner image"}
          width={2000}
          height={700}
          className="hidden md:block w-full h-auto object-cover"
          priority
        />
      )}

      {/* Mobile Background */}
      {mobileImage && (
        <Image
          src={mobileImage}
          alt={alt || "Page hero mobile banner image"}
          width={1080}
          height={1600}
          className="block md:hidden w-full h-auto object-cover"
          priority
        />
      )}
    </div>
  );
}
