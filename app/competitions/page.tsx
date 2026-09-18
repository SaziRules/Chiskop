import Section from "@/components/Section";
import Container from "@/components/Container";
import JoinCrew from "@/components/sections/JoinCrew";
import Link from "next/link";

export const metadata = {
  title: "Competitions • Chiskop For Men",
};

export default function CompetitionsPage() {
  return (
    <main className="bg-white text-chiskop-black">

      <Section className="py-24 md:py-36">
        <Container className="max-w-[720px] mx-auto px-6 md:px-8 text-center">

          <p className="text-[11px] font-extrabold tracking-[.22em] uppercase text-chiskop-red mb-6">
            Competitions
          </p>

          <h1 className="text-[32px] md:text-[44px] font-extrabold uppercase leading-tight text-chiskop-black mb-6">
            No Active<br className="hidden md:block" /> Competitions Right Now
          </h1>

          <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed max-w-[520px] mx-auto mb-10">
            We run competitions regularly — from product giveaways to exclusive brand collabs.
            Follow us on TikTok and Instagram so you never miss the next one.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.tiktok.com/@chiskop"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Follow on TikTok
            </a>
            <a
              href="https://www.instagram.com/chiskop"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-chiskop-red text-chiskop-red text-[16px] font-bold px-6 py-3 rounded-[10px] hover:bg-chiskop-red hover:text-white transition-colors"
            >
              Follow on Instagram
            </a>
          </div>

          <div className="mt-16 pt-10 border-t border-[#e5e5e5]">
            <p className="text-[13px] text-chiskop-gray">
              Have a question?{" "}
              <Link href="/contact-us" className="underline hover:text-chiskop-red transition-colors">
                Contact us
              </Link>
            </p>
          </div>

        </Container>
      </Section>

      <JoinCrew />

    </main>
  );
}
