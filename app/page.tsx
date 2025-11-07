import BrandInfo from "@/components/sections/BrandInfo";
import Hero from "@/components/sections/Hero";
import ImageBanner from "@/components/sections/ImageBanner";
import JoinCrew from "@/components/sections/JoinCrew";
import ProductFeatureRow from "@/components/sections/ProductFeatureRow";
import RetailersStrip from "@/components/sections/RetailersStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductFeatureRow />
      <ImageBanner />
      <RetailersStrip />
      <BrandInfo />
      <JoinCrew />
    </>
  );
}
