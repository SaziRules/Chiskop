import { client } from "./client";
import { PRODUCT_RANGE_QUERY } from "../queries/getProductRange";

export async function getProductRange() {
  const data = await client.fetch(PRODUCT_RANGE_QUERY);

  // Split into home + salon (same shape as before)
  return {
    home: data
      .filter((p: any) => p.category === "home")
      .map((p: any) => ({
        title: p.title,
        category: `For Head & Body | ${p.firstVariant?.sizeLabel ?? ""}`,
        img: p.img,
        link: `/product/${p.slug.current}`,
      })),

    salon: data
      .filter((p: any) => p.category === "salon")
      .map((p: any) => ({
        title: p.title,
        category: `For Head & Body | ${p.firstVariant?.sizeLabel ?? ""}`,
        img: p.img,
        link: `/product/${p.slug.current}`,
      })),
  };
}
