import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default function RetailerStrip() {
  return (
    <Section variant="default" className="py-12 bg-white border-t border-[#f0f0f0]">
      <Container className="max-w-[1000px] flex items-center justify-center flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
        {/* Clicks */}
        <Image
          src="/images/logos/clicks.png"
          alt="Clicks"
          width={90}
          height={40}
          className="object-contain"
        />

        {/* Dis-Chem */}
        <Image
          src="/images/logos/dischem.png"
          alt="Dis-Chem"
          width={100}
          height={40}
          className="object-contain"
        />

        {/* Pick n Pay */}
        <Image
          src="/images/logos/picknpay.png"
          alt="Pick n Pay"
          width={110}
          height={40}
          className="object-contain"
        />

        {/* Takealot */}
        <Image
          src="/images/logos/takealot.png"
          alt="Takealot"
          width={100}
          height={40}
          className="object-contain"
        />

        {/* Shoprite */}
        <Image
          src="/images/logos/shoprite.png"
          alt="Shoprite"
          width={110}
          height={40}
          className="object-contain"
        />
      </Container>
    </Section>
  );
}
