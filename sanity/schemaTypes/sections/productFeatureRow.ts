// sections/productFeatureRow.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "productFeatureRow",
  title: "Product Feature Row",
  type: "object",
  fields: [
    defineField({ name: "product", title: "Product", type: "reference", to: [{ type: "product" }] }),
    defineField({ name: "kicker", title: "Eyebrow", type: "string" }),
    defineField({ name: "copy", title: "Short Copy", type: "text" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
    defineField({ name: "imageSide", title: "Image Side", type: "string", options:{ list:["left","right"] }, initialValue:"left" }),
  ],
});
