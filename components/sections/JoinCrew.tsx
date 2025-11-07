import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default function JoinCrew() {
  return (
    <Section
      variant="default"
      className="relative w-full bg-[url('/images/bg-subscribe.jpg')] bg-cover bg-center bg-no-repeat py-16 md:py-16 overflow-hidden"
    >
      <Container className="relative z-10 max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
        {/* ───────────── Product Image (desktop only) ───────────── */}
        <div className="hidden md:flex justify-start items-center w-[48%]">
          <Image
            src="/images/join-products.png"
            alt="Chiskop Products"
            width={820}
            height={1000}
            priority
            className="object-contain scale-110 md:scale-125"
          />
        </div>

        {/* ───────────── Form Section ───────────── */}
        <div className="w-full md:w-[48%] flex flex-col items-center md:items-end text-center md:text-right">
          {/* Heading */}
          <h2 className="uppercase text-chiskop-red font-extrabold text-[26px] md:text-[46px] leading-[1.05] mb-2 tracking-tight md:ml-auto max-w-none">
            Join the Chiskop Crew
          </h2>

          {/* Subtext */}
          <p className="text-chiskop-black text-[15px] md:text-[18px] leading-[1.45] mt-1 md:mt-2 mb-8 max-w-[580px] md:ml-auto">
            Be the first to know about new drops, competitions, and Chiskop
            specials. Join now and keep your game sharp.
          </p>

          {/* Form */}
          <form className="w-full flex flex-col gap-3 max-w-[520px]">
            {/* Row 1: Name + Phone */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 md:w-[270px] border-2 border-chiskop-lightGray rounded-[10px] px-4 py-3 text-[15px] md:text-[16px] text-chiskop-black placeholder:text-[#999] focus:outline-none focus:ring-1 focus:ring-chiskop-red"
              />
              <input
                type="text"
                placeholder="+27"
                className="flex-1 md:w-[230px] border-2 border-chiskop-lightGray rounded-[10px] px-4 py-3 text-[15px] md:text-[16px] text-chiskop-black placeholder:text-[#999] focus:outline-none focus:ring-1 focus:ring-chiskop-red"
              />
            </div>

            {/* Row 2: Desktop vs Mobile Separation */}
            {/* Desktop Row */}
            <div className="hidden md:flex md:flex-row md:justify-end gap-3 md:gap-4 md:items-end">
              <button
                type="submit"
                className="btn bg-chiskop-red rounded-md text-white font-extrabold uppercase text-[15px] px-10 py-3"
              >
                Submit
              </button>

              <input
                type="email"
                placeholder="Email"
                className="flex-1 md:w-[420px] border-2 border-chiskop-lightGray rounded-[10px] px-4 py-3 text-[16px] text-chiskop-black placeholder:text-[#999] focus:outline-none focus:ring-1 focus:ring-chiskop-red"
              />
            </div>

            {/* Mobile Row */}
            <div className="flex flex-col md:hidden gap-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full border-2 border-chiskop-lightGray rounded-[10px] px-4 py-3 text-[15px] text-chiskop-black placeholder:text-[#999] focus:outline-none focus:ring-1 focus:ring-chiskop-red"
              />
              <button
                type="submit"
                className="btn bg-chiskop-red rounded-md text-white font-extrabold uppercase text-[13px] px-8 py-3 w-full"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Terms Link */}
          <a
            href="#"
            className="text-[12px] md:text-[12.5px] text-chiskop-gray underline mt-3 hover:text-chiskop-red transition-colors md:self-end"
          >
            Terms &amp; Conditions
          </a>
        </div>
      </Container>
    </Section>
  );
}
