import SalonBanner from "@/components/salon/SalonBanner";
import SalonIntro from "@/components/salon/SalonIntro";
import SalonProfessionalSection from "@/components/salon/SalonProfessionalSection";
import SalonVideoSection from "@/components/salon/SanoVideoSection";
import JoinCrew from "@/components/sections/JoinCrew";

export default function SalonPortalPage() {
  return (
    <main className="bg-white text-chiskop-black">
      <SalonBanner
        bgSrc="/images/salon-banner.png"
        fgSrc="/images/salon.png"
        heightClass="h-[480px] md:h-[520px]"
      />
      <SalonIntro />
      <SalonVideoSection />
      <SalonProfessionalSection />
      {/* next sections... */}
      <JoinCrew />
    </main>
  );
}
