import { defineField, defineType } from "sanity";

export default defineType({
  name: "retailerStrip",
  title: "Retailer Strip",
  type: "document",

  fields: [
    defineField({
      name: "retailers",
      title: "Retailers",
      type: "array",
      of: [
        {
          type: "object",
          name: "retailer",
          title: "Retailer",
          fields: [
            defineField({
              name: "name",
              title: "Retailer Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Retailer Logo",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Retailer Link",
              type: "url",
              description: "Where should this logo link to?",
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "retailers.0.name",
      subtitle: "retailers.length",
    },
    prepare({ title, subtitle }) {
      return {
        title: "Retailer Strip",
        subtitle: `${subtitle || 0} retailers`,
      };
    },
  },
});
