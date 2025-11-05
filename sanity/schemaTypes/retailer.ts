import { defineType, defineField } from "sanity";

export default defineType({
  name: "retailer",
  title: "Retailers",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Retailer Name", type: "string" }),
    defineField({
      name: "logo",
      title: "Retailer Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "link",
      title: "Website Link",
      type: "url",
    }),
  ],
});
