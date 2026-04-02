import Image from "next/image";

type Props = {
  desktopImage: string | null;
  mobileImage?: string | null;
};

export default function ProductHowToBanner({ desktopImage, mobileImage }: Props) {
  if (!desktopImage) return null;

  return (
    <section className="w-full">
      {/* Mobile image — natural dimensions, no cropping */}
      {mobileImage && (
        <div className="block md:hidden w-full">
          <Image
            src={mobileImage}
            alt="How to use"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Desktop image */}
      <div className={`${mobileImage ? "hidden md:block" : "block"} w-full relative aspect-16/5`}>
        <Image
          src={desktopImage}
          alt="How to use"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}