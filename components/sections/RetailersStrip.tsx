import Marquee from "react-fast-marquee";

import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Link from "next/link";

export default function RetailerStrip({ retailers }: { retailers: any[] }) {
  return (
    <Section variant="default" className="py-12 bg-white border-t border-[#f0f0f0]">
      <Container className="max-w-[1600px] overflow-hidden overflow-y-hidden!important">

        <Marquee
        className="overflow-hidden overflow-y-hidden!"
          pauseOnHover
          speed={40}
          gradient={false}
        >
          {retailers.map((r, i) => (
            <Link
              key={i}
              href={r.url || "#"}
              target="_blank"
              className="mx-10 flex items-center justify-center min-w-[200px] h-[140px]"
            >
              <Image
                src={r.logo}
                alt={r.name}
                width={200}
                height={140}
                className="object-contain"
              />
            </Link>
          ))}
        </Marquee>

      </Container>
    </Section>
  );
}
