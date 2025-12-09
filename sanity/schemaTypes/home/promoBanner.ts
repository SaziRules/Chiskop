import { defineType, defineField } from "sanity";

export default defineType({
  name: "promoBanner",
  title: "Promo Banner",
  type: "document",

  fields: [
    defineField({
      name: "page",
      title: "Page Identifier",
      type: "string",
      description: "Example: home, chiskop-zone, salon, products",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "desktopImage",
      title: "Desktop Banner Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "mobileImage",
      title: "Mobile Banner Image",
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
