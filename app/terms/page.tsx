import Section from "@/components/Section";
import Container from "@/components/Container";

export default function TermsPage() {
  return (
    <main className="bg-white text-chiskop-black">

      {/* ───────────── HERO ───────────── */}
      <Section className="py-20 text-center border-b border-[#e5e5e5]">
        <Container className="max-w-[900px] mx-auto px-6 md:px-8">
          <h1 className="text-[32px] md:text-[56px] font-extrabold italic text-chiskop-red uppercase mb-4">
            Terms & Conditions
          </h1>
          <p className="text-[15px] md:text-[18px] text-chiskop-gray leading-relaxed">
            Please read these terms and conditions carefully before using the Chiskop website,
            products, or participating in promotions.
          </p>
        </Container>
      </Section>

      {/* ───────────── CONTENT ───────────── */}
      <Section className="py-16 md:py-24">
        <Container className="max-w-[900px] mx-auto px-6 md:px-8 space-y-12">

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              1. Introduction
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              These Terms & Conditions govern your use of the Chiskop website, products,
              services, and any competitions or promotions run by Chiskop. By accessing
              or using our platforms, you agree to be bound by these terms.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              2. Eligibility
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              You must be at least 18 years old to participate in any Chiskop competitions,
              promotions, or giveaways unless stated otherwise. Participation is void where
              prohibited by law.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              3. Products & Usage
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Chiskop products are intended for external use only. Always follow the usage
              instructions provided on product packaging. Results may vary depending on
              individual hair and skin type.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              4. Competitions & Promotions
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              All competitions are subject to specific rules, entry requirements, and closing
              dates as outlined in the competition details. Chiskop reserves the right to
              amend, suspend, or cancel any competition at its discretion.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Winners will be contacted via the details provided during entry. Failure to respond
              within the specified timeframe may result in forfeiture of the prize.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              5. Intellectual Property
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              All content on this website, including text, images, logos, graphics, and designs,
              is the property of Chiskop and may not be copied, reproduced, or distributed without
              prior written consent.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              6. Limitation of Liability
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Chiskop shall not be liable for any indirect, incidental, or consequential damages
              arising from the use of our products, website, or participation in promotions,
              to the extent permitted by law.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              7. Privacy
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Your privacy is important to us. Any personal information collected will be handled
              in accordance with our Privacy Policy and applicable data protection laws.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              8. Changes to These Terms
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Chiskop reserves the right to update or modify these Terms & Conditions at any time.
              Continued use of the website after changes have been made constitutes acceptance
              of the revised terms.
            </p>
          </div>

          {/* Footer Note */}
          <div className="pt-10 border-t border-[#e5e5e5]">
            <p className="text-[14px] text-chiskop-gray">
              Last updated: <strong>January 2026</strong>
            </p>
          </div>

        </Container>
      </Section>
    </main>
  );
}
