// sections/retailersStrip.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "retailersStrip",
  title: "Retailers Strip",
  type: "object",
  fields: [
    defineField({
      name: "retailers",
      title: "Retailers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "retailer" }] }],
    }),
  ],
});
