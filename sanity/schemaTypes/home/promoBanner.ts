import { defineType, defineField } from "sanity";

export default defineType({
  name: "promoBanner",
  title: "CTA Section",
  type: "document",

  fields: [
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
  ],
});
