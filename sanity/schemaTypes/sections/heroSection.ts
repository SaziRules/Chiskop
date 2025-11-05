// sanity/schemaTypes/sections/heroSection.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Hero Image", type: "image", options:{hotspot:true} }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subcopy", title: "Subcopy", type: "text" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
    defineField({ name: "theme", title: "Theme", type: "string", options:{list:["dark","light","gradient"]}, initialValue:"gradient" }),
  ],
});
