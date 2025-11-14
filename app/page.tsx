import ProductRange from "@/components/Home/ProductRange";
import BrandInfo from "@/components/sections/BrandInfo";
import Hero from "@/components/Home/Hero";
import ImageBanner from "@/components/sections/ImageBanner";
import JoinCrew from "@/components/sections/JoinCrew";
import RetailersStrip from "@/components/sections/RetailersStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductRange />
      <ImageBanner />
      <RetailersStrip />
      <BrandInfo />
      <JoinCrew />
    </>
  );
}
