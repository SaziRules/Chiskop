// sanity/schemaTypes/homePage.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "productFeatureRow" },
        { type: "retailersStrip" },
        { type: "imageBanner" },
        { type: "aboutBlock" },
        { type: "newsletterBlock" },
      ],
    }),
  ],
});
