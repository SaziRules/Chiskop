import { defineType, defineField } from "sanity";

export default defineType({
  name: "competition",
  title: "Chiskop Competition",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Competition Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Example: WIN WITH CHISKOP",
    }),

    defineField({
      name: "subtitle",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "A short description appearing under the title.",
    }),

    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: "This is the main competition banner image.",
    }),

    defineField({
      name: "prize",
      title: "Prize Description",
      type: "string",
      description: "Example: Win a grooming hamper worth R2000",
    }),

    defineField({
      name: "content",
      title: "Competition Details",
      type: "array",
      of: [{ type: "block" }],
      description: "Full rich-text description, rules or instructions.",
    }),

    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description: "Example: Enter Now, Learn More, etc.",
    }),

    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "url",
      description: "Where the CTA button should go.",
    }),

    defineField({
      name: "startDate",
      title: "Competition Start Date",
      type: "datetime",
    }),

    defineField({
      name: "endDate",
      title: "Competition End Date",
      type: "datetime",
    }),

    defineField({
      name: "termsPdf",
      title: "Terms & Conditions PDF",
      type: "file",
      description: "Optional: Upload a PDF for T&Cs",
      options: { accept: ".pdf" },
    }),

    defineField({
      name: "isActive",
      title: "Is Active?",
      type: "boolean",
      initialValue: true,
      description: "Set to FALSE to mark this competition as closed.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "prize",
      media: "bannerImage",
    },
  },
});
