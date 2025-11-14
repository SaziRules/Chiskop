import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqGroup",
  title: "FAQ Group",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "FAQ Group Title",
      type: "string",
      description: "Example: Contact Us, Chiskop Zone",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
