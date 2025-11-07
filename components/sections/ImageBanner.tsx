import Section from "@/components/Section";

export default function ImageBanner() {
  return (
    <Section
      variant="default"
      className="w-full bg-linear-to-r from-chiskop-black via-chiskop-gray to-chiskop-offWhite h-80 md:h-[420px] flex items-center justify-center"
    >
      <h2 className="text-white uppercase tracking-[0.3em] text-[14px] md:text-[16px] font-medium">
        Image Banner
      </h2>
    </Section>
  );
}
