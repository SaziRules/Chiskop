// sections/newsletterBlock.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "newsletterBlock",
  title: "Newsletter Block",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subcopy", title: "Subcopy", type: "text" }),
    // optional artwork image for the left stack (as in your mock)
    defineField({ name: "image", title: "Side Image", type: "image", options:{hotspot:true} }),
  ],
});
