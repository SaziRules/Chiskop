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
              name: "useModal",
              title: "Open in Modal?",
              type: "boolean",
              description: "If enabled, clicking this FAQ will open a modal instead of showing inline answer",
              initialValue: false,
            }),

            // ⭐ OLD FIELD: Keep this for existing data (don't delete!)
            defineField({
              name: "answer",
              title: "Simple Answer (Plain Text)",
              type: "text",
              description: "⚠️ Legacy field - Use 'Rich Answer' below for new FAQs with links",
              hidden: ({ parent }) => parent?.useModal === true || parent?.richAnswer,
            }),

            // ⭐ NEW FIELD: Rich text with links (doesn't break old data)
            defineField({
              name: "richAnswer",
              title: "Rich Answer (With Links & Formatting)",
              type: "array",
              of: [
                {
                  type: "block",
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                            validation: (Rule) =>
                              Rule.uri({
                                allowRelative: true,
                                scheme: ["http", "https", "mailto", "tel"],
                              }),
                          },
                          {
                            name: "openInNewTab",
                            type: "boolean",
                            title: "Open in new tab",
                            initialValue: false,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              description: "✨ Use this for new FAQs that need links. Leave 'Simple Answer' empty if using this.",
              hidden: ({ parent }) => parent?.useModal === true,
            }),

            // Modal content
            defineField({
              name: "modalContent",
              title: "Modal Content",
              type: "object",
              description: "Content to display in modal popup",
              hidden: ({ parent }) => parent?.useModal !== true,
              fields: [
                defineField({
                  name: "title",
                  title: "Modal Title",
                  type: "string",
                }),
                defineField({
                  name: "content",
                  title: "Modal Content",
                  type: "array",
                  of: [
                    {
                      type: "block",
                      styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                      ],
                      lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                      ],
                      marks: {
                        decorators: [
                          { title: "Strong", value: "strong" },
                          { title: "Emphasis", value: "em" },
                          { title: "Underline", value: "underline" },
                        ],
                        annotations: [
                          {
                            name: "link",
                            type: "object",
                            title: "External Link",
                            fields: [
                              {
                                name: "href",
                                type: "url",
                                title: "URL",
                                validation: (Rule) =>
                                  Rule.uri({
                                    allowRelative: true,
                                    scheme: ["http", "https", "mailto", "tel"],
                                  }),
                              },
                              {
                                name: "openInNewTab",
                                type: "boolean",
                                title: "Open in new tab",
                                initialValue: true,
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                  description: "Rich text content with links for the modal",
                }),
                defineField({
                  name: "image",
                  title: "Modal Image (optional)",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "ctaText",
                  title: "CTA Button Text (optional)",
                  type: "string",
                  description: "Example: Learn More, Contact Us",
                }),
                defineField({
                  name: "ctaLink",
                  title: "CTA Link (optional)",
                  type: "url",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "question",
              useModal: "useModal",
            },
            prepare({ title, useModal }) {
              return {
                title,
                subtitle: useModal ? "🔲 Opens Modal" : "📝 Inline Answer",
              };
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