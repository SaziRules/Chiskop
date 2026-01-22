import Section from "@/components/Section";
import Container from "@/components/Container";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-chiskop-black">

      {/* ───────────── HERO ───────────── */}
      <Section className="py-20 text-center border-b border-[#e5e5e5]">
        <Container className="max-w-[900px] mx-auto px-6 md:px-8">
          <h1 className="text-[32px] md:text-[56px] font-extrabold italic text-chiskop-red uppercase mb-4">
            Privacy Policy
          </h1>
          <p className="text-[15px] md:text-[18px] text-chiskop-gray leading-relaxed">
            This Privacy Policy explains how Chiskop collects, uses, and protects
            your personal information when you interact with our website, products,
            and services.
          </p>
        </Container>
      </Section>

      {/* ───────────── CONTENT ───────────── */}
      <Section className="py-16 md:py-24">
        <Container className="max-w-[900px] mx-auto px-6 md:px-8 space-y-12">

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              1. Information We Collect
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              We may collect personal information such as your name, email address,
              contact details, and any information you voluntarily provide when signing
              up for newsletters, competitions, or contacting us directly.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              2. How We Use Your Information
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Your information is used to operate, maintain, and improve our services,
              communicate with you, administer promotions, and send relevant updates
              related to Chiskop.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              3. Cookies & Tracking
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Our website may use cookies or similar technologies to enhance your browsing
              experience, analyze site traffic, and understand user behavior. You can
              disable cookies through your browser settings if you prefer.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              4. Sharing of Information
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Chiskop does not sell or rent your personal information to third parties.
              Information may be shared with trusted service providers only when necessary
              to operate our website or fulfill services on our behalf.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              5. Data Security
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              We take reasonable technical and organizational measures to protect your
              personal information from unauthorized access, loss, misuse, or disclosure.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              6. Your Rights
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              You have the right to request access to, correction of, or deletion of your
              personal data, subject to applicable laws. You may also opt out of marketing
              communications at any time.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              7. Third-Party Links
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Our website may contain links to third-party websites. Chiskop is not
              responsible for the privacy practices or content of those external sites.
            </p>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black">
              8. Changes to This Policy
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              This Privacy Policy may be updated from time to time. Any changes will be
              posted on this page, and continued use of the website indicates acceptance
              of the revised policy.
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
