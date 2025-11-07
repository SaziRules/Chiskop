import Section from "@/components/Section";
import Container from "@/components/Container";

export default function BrandInfo() {
  return (
    <Section
      variant="default"
      className="bg-white text-center py-20 md:py-24"
    >
      <Container className="max-w-[800px] mx-auto px-6">
        {/* Bold Red Tagline */}
        <h2 className="text-chiskop-red font-extrabold italic uppercase text-[34px] md:text-[52px] leading-[1.15] tracking-tight mb-6">
          Ukhanda lihle, <br className="hidden md:block" />
          uy’chiskop.
        </h2>

        {/* Body Copy */}
        <p className="text-chiskop-black text-[17px] leading-relaxed mb-4">
          Chiskop for Men is a proudly home-grown brand! Created for the modern
          man who values a clean, confident look. We’re all about keeping
          grooming simple, effective, and accessible.
        </p>

        {/* Signature Line */}
        <p className="text-chiskop-black text-[17px] leading-relaxed font-semibold italic">
          Chiskop for Men; made for the Chiskop Man.
        </p>
      </Container>
    </Section>
  );
}
