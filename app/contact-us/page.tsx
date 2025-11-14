import ContactForm from "@/components/contact/ContactForm";
import ContactDetails from "@/components/contact/ContactDetails";
import FaqAccordion from "@/components/contact/FaqAccordion";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import JoinCrew from "@/components/sections/JoinCrew";

export const metadata = {
  title: "Contact Us • Chiskop For Men",
};

export default async function ContactUsPage() {
  // ⭐ Correct FAQ group for this page
  const faq = await client.fetch(
    groq`*[_type == "faqGroup" && title == "Contact Us"][0]{
      title,
      faqs[]{
        question,
        answer
      }
    }`
  );

  return (
    <main className="bg-white text-chiskop-black">
      {/* TOP SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-12">
          <ContactForm />
          <ContactDetails />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1200px] mx-auto px-6 pt-6 pb-20">
        
                  <h2 className="text-[22px] md:text-[26px] font-bold text-chiskop-red mb-6">
                    Know Your Chiskop
                  </h2>
                  <p className="text-[15px] md:text-[16px] text-chiskop-gray mb-8">
                    Frequently Asked Questions
                  </p>
        <FaqAccordion 
          title={faq?.title ?? ""}
          faqs={faq?.faqs ?? []}
        />
        
      </section>

      {/* Join Crew */}
      <JoinCrew />
    </main>
  );
}
