import GlobalBanner from "@/components/sections/GlobalBanner";
import JoinCrew from "@/components/sections/JoinCrew";
import ProductSolutions from "@/components/sections/ProductSolutions";
import SmoothChiskopSection from "@/components/sections/SmoothChiskopSection";
import { getPageHero } from "@/lib/sanity/pageHero"

export default async function ProductsPage() {
  const hero = await getPageHero("products");

  return (
    <main className="bg-[#f9f7f6] text-chiskop-black">
      
      {/* ───────────── Banner (from Sanity) ───────────── */}
      {hero && (
        <GlobalBanner
          desktopImage={hero.desktopImage}
          mobileImage={hero.mobileImage}
        />
      )}

      {/* ───────────── Products ───────────── */}
      <ProductSolutions />

      {/* ───────────── Info Section ───────────── */}
      <SmoothChiskopSection />

      {/* ───────────── Signup Section ───────────── */}
      <JoinCrew />
    </main>
  );
}
