import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default function ProductFeatures() {
  return (
    <Section
      variant="default"
      className="min-h-screen flex flex-col justify-center py-16 overflow-hidden"
    >
      {/* ───────────── Desktop Layout ───────────── */}
      <Container className="hidden md:flex flex-col justify-center max-w-[1100px]">
        {/* ───────────── 1. Hair Removal Cream ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-10 md:gap-10 h-[60vh]">
          <div className="flex justify-center">
            <div className="bg-[#f6f6f6] w-[520px] h-[500px] p-8 flex items-center justify-center">
              <Image
                src="/images/hair-removal.png"
                alt="Hair Removal Cream"
                width={320}
                height={420}
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-left md:pl-6">
            <h2 className="uppercase text-chiskop-black font-extrabold text-[38px] leading-[1.05] tracking-tight mb-2 max-w-60 wrap-break-word">
              Hair Removal Cream
            </h2>

            <div className="relative h-2] w-[100px] mb-3">
              <div className="absolute inset-0 bg-linear-to-r from-chiskop-black to-transparent" />
              <div className="absolute bottom-0 left-0 w-[100px] h-2 bg-white/40 blur-[1px]" />
            </div>

            <p className="text-b2 text-chiskop-black leading-relaxed mb-5 max-w-[340px]">
              Quick, easy &amp; pain-free hair<br /> removal in 7 minutes
            </p>

            <button className="btn rounded-lg text-b2 font-extrabold uppercase">
              Shop Now
            </button>
          </div>
        </div>

        {/* ───────────── 2. Soothing Balm & Aftershave ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-10 md:gap-10 h-[50vh] mt-12">
          <div className="order-2 md:order-1 text-right md:pr-6">
            <div className="md:ml-auto md:w-fit">
              <h2 className="uppercase text-chiskop-black font-extrabold text-[36px] leading-[1.05] tracking-tight mb-2 max-w-[280px] wrap-break-word">
                Soothing Balm &amp; Aftershave
              </h2>

              <div className="relative h-2 w-[110px] mb-3 md:ml-auto">
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-chiskop-black" />
                <div className="absolute bottom-0 left-0 w-[180px] h-2 bg-white/40 blur-[1px]" />
              </div>

              <p className="text-b2 text-chiskop-black leading-relaxed mb-5 max-w-[360px]">
                For post depilation and<br /> after shaving
              </p>

              <div className="md:ml-auto md:w-fit">
                <button className="btn rounded-lg uppercase text-b2 font-extrabold">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-end">
            <div className="bg-[#f6f6f6] w-[520px] h-[500px] p-8 flex items-center justify-center">
              <Image
                src="/images/soothing-balm.png"
                alt="Soothing Balm & Aftershave"
                width={420}
                height={520}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ───────────── Mobile Swipe Section ───────────── */}
      <div className="md:hidden overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 px-4 scroll-smooth pb-6">
          {/* Card 1 */}
          <div className="shrink-0 w-[85%] snap-start bg-white flex flex-col items-start">
            <div className="bg-[#f6f6f6] w-full aspect-[1/1.2] p-6 flex items-center justify-center mb-5">
              <Image
                src="/images/hair-removal.png"
                alt="Hair Removal Cream"
                width={280}
                height={380}
                className="object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="w-full px-1">
              <h2 className="uppercase text-chiskop-black font-extrabold text-[18px] leading-[1.1] tracking-tight mb-2 text-left">
                Hair Removal Cream
              </h2>

              <div className="relative h-[1.5px] w-[70px] mb-2">
                <div className="absolute inset-0 bg-linear-to-r from-chiskop-black to-transparent" />
                <div className="absolute bottom-0 left-0 w-[70px] h-[1.5px] bg-white/40 blur-[0.5px]" />
              </div>

              <p className="text-[13px] text-chiskop-black leading-snug mb-4 text-left">
                Quick, easy &amp; pain-free hair removal in 7 minutes
              </p>

              <button className="btn rounded-md text-[12px] px-4 py-2 font-extrabold uppercase">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="shrink-0 w-[85%] snap-start bg-white flex flex-col items-start">
            <div className="bg-[#f6f6f6] w-full aspect-[1/1.2] p-6 flex items-center justify-center mb-5">
              <Image
                src="/images/soothing-balm.png"
                alt="Soothing Balm & Aftershave"
                width={280}
                height={380}
                className="object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="w-full px-1">
              <h2 className="uppercase text-chiskop-black font-extrabold text-[18px] leading-[1.1] tracking-tight mb-2 text-left">
                Soothing Balm &amp; Aftershave
              </h2>

              <div className="relative h-[1.5px] w-[70px] mb-2">
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-chiskop-black" />
                <div className="absolute bottom-0 left-0 w-[70px] h-[1.5px] bg-white/40 blur-[0.5px]" />
              </div>

              <p className="text-[13px] text-chiskop-black leading-snug mb-4 text-left">
                For post depilation and after shaving
              </p>

              <button className="btn rounded-md text-[12px] px-4 py-2 font-extrabold uppercase">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
