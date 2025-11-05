import Section from "@/components/Section";
import Container from "@/components/Container";
import Image from "next/image";

const retailers = [
  { name: "Clicks", src: "/images/retailers/clicks.png" },
  { name: "Dis-Chem", src: "/images/retailers/dischem.png" },
  { name: "Pick n Pay", src: "/images/retailers/pnp.png" },
  { name: "Takealot", src: "/images/retailers/takealot.png" },
  { name: "Shoprite", src: "/images/retailers/shoprite.png" },
];

export default function RetailersStrip() {
  return (
    <Section variant="default" className="py-12">
      <Container>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-90">
          {retailers.map((r) => (
            <Image
              key={r.name}
              src={r.src}
              alt={r.name}
              width={120}
              height={40}
              className="grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
