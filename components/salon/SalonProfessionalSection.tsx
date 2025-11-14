import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function SalonProfessionalSection() {
  return (
    <>
      {/* ───────────── PROFESSIONAL USE SECTION ───────────── */}
      <section className="relative bg-[#f9f9f9] text-chiskop-black overflow-hidden py-20 md:py-24">
        <Container className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-8 relative">
          {/* LEFT: TEXT CONTENT */}
          <div>
            <h2 className="text-[22px] md:text-[26px] font-extralight text-chiskop-red uppercase mb-6 tracking-wide">
              Designed for{" "}
              <span className="text-chiskop-red font-bold">Professional<br /></span> or{" "}
              <span className="text-chiskop-red font-bold">Semi-Professional</span>{" "}
              use
            </h2>

            <ul className="space-y-5 text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              <li>
                <span className="text-chiskop-red text-[18px] mr-2">✔</span>
                <strong>Hygienic and safer alternative</strong> – reduces the risk
                of cuts, infections, and razor irritation.
              </li>
              <li>
                <span className="text-chiskop-red text-[18px] mr-2">✔</span>
                <strong>Ideal for a smooth finish</strong> – perfect for clients
                who struggle with razor bumps and ingrown hairs.
              </li>
              <li>
                <span className="text-chiskop-red text-[18px] mr-2">✔</span>
                <strong>Consistent, even results</strong> – no patchy spots or
                uneven shaving when applied according to instructions.
              </li>
              <li>
                <span className="text-chiskop-red text-[18px] mr-2">✔</span>
                <strong>Convenient for professionals</strong> – easy to apply,
                quick to work, and simple to wipe off, allowing barbers to serve
                more clients efficiently.
              </li>
            </ul>
          </div>

          {/* RIGHT: PRODUCT IMAGE (VISIBLE ONLY ON DESKTOP) */}
          <div className="relative hidden md:flex justify-end items-center">
            <div className="relative w-full h-[420px] flex justify-end items-center">
              <Image
                src="/images/salon.png"
                alt="Chiskop Hair Removal Cream 950g"
                width={800}
                height={800}
                priority
                className="object-contain w-[580px] lg:w-[720px] translate-y-[95px] -mr-10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── CONTACT CTA SECTION ───────────── */}
      <Section variant="default" className="bg-white text-left py-20 md:py-24">
        <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-[22px] md:text-[26px] font-bold text-chiskop-red mb-4 uppercase">
            Want to offer Chiskop in your salon?
          </h2>
          <p className="text-[15px] md:text-[17px] text-chiskop-gray mb-8 leading-relaxed">
            Join the growing number of salons using Chiskop as their go-to men’s
            grooming solution. Get in touch with our team for salon signage,
            training and usage guides, and information on where to purchase the
            950g pack.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-chiskop-red text-white text-[15px] font-bold px-8 py-2.5 rounded-md hover:bg-[#7c1217] transition-colors"
          >
            Contact Us
          </Link>
        </Container>
      </Section>
    </>
  );
}
