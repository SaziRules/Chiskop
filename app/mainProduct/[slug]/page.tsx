import { use } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import Product from "@/components/MainProduct/Product";
import JoinCrew from "@/components/sections/JoinCrew";
import ProductReviewsSection from "@/components/MainProduct/ProductReviewSection";
import ProductHowToBanner from "@/components/MainProduct/ProductHowToBanner";
import ProductUsageSection from "@/components/MainProduct/ProductUsageSection";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // unwrap params (Next.js webpack)
  const { slug } = await params;

  const product = await client.fetch(
    groq`
      *[_type == "product" && slug.current == "${slug}"][0]{
        title,
        introDescription,
        variants[]{
          "img": variantImage.asset->url
        }
      }
    `
  );

  if (!product) {
    return {
      title: "Product Not Found • Chiskop For Men"
    };
  }

  const description =
    product.introDescription?.[0]?.children?.[0]?.text ??
    "Official Chiskop For Men product.";

  const ogImage = product.variants?.[0]?.img;

  return {
    title: `${product.title} • Chiskop For Men`,
    description,
    openGraph: {
      title: `${product.title} • Chiskop For Men`,
      description,
      images: ogImage ? [{ url: ogImage }] : []
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: ogImage ? [ogImage] : []
    }
  };
}


export const dynamic = "force-dynamic";       // required for Webpack dynamic params
export const dynamicParams = true;

export default function ProductPage(props: any) {
  // Unwrap the params promise (Webpack 16 issue)
  const { slug } = use(props.params) as { slug: string };

  // Fetch product on the server synchronously via React.use()
  const product = use(
    client.fetch(
      groq`
        *[_type == "product" && slug.current == $slug][0]{
          _id,
          title,
          introDescription,
          featureBadges,

          variants[]{
            sizeLabel,
            "img": variantImage.asset->url,
            variantDescription,
            variantFeatures
          },

          shopOptions{
            online[]{
              "logo": logo.asset->url,
              url
            },
            instore[]{
              "logo": logo.asset->url,
              url
            }
          },

          usageContent,
          ingredientsText,
          "video": tutorialVideo.asset->url
        }
      `,
      { slug }
    )
  );

  if (!product) {
    return (
      <main className="py-20 text-center text-red-500">
        <h1>Product not found: {slug}</h1>
      </main>
    );
  }

  return (
    <main className="bg-white text-chiskop-black">
        <ScrollToTop />
      <Product product={product} />

      <ProductHowToBanner />

      <ProductUsageSection
        usage={product.usageContent ?? []}
        ingredients={product.ingredientsText ?? []}
      />

      <ProductReviewsSection />

      <JoinCrew />
    </main>
  );
}
