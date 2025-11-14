import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Chiskop Product",
  type: "document",
  fields: [
    // ───────────── BASE PRODUCT ─────────────
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Home Solution", value: "home" },
          { title: "Salon Solution", value: "salon" },
          { title: "Best Seller", value: "best" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "introDescription",
      title: "General Description",
      type: "array",
      of: [{ type: "block" }],
      description: "General text that applies to all variants, unless overridden.",
    }),

    defineField({
      name: "featureBadges",
      title: "Default Feature Badges",
      type: "array",
      of: [{ type: "string" }],
      description: "Displayed unless overridden at variant level.",
    }),

    // ───────────── VARIANTS ARRAY ─────────────
    defineField({
      name: "variants",
      title: "Product Variants (80G / 200G / 950G)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "sizeLabel",
              title: "Size Label",
              type: "string",
              options: {
                list: [
                  { title: "50G", value: "50G" },  
                  { title: "80G", value: "80G" },
                  { title: "200G", value: "200G" },
                  { title: "950G", value: "950G" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "variantImage",
              title: "Variant Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "variantDescription",
              title: "Variant Description (optional override)",
              type: "array",
              of: [{ type: "block" }],
            }),

            defineField({
              name: "variantFeatures",
              title: "Variant Feature Badges (optional override)",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: {
              title: "sizeLabel",
              media: "variantImage",
            },
          },
        },
      ],
    }),

    // ───────────── BUY OPTIONS ─────────────
    defineField({
      name: "shopOptions",
      title: "Shop Options",
      type: "object",
      fields: [
        defineField({
          name: "online",
          title: "Online Stores",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Store Name", type: "string" }),
                defineField({ name: "logo", title: "Store Logo", type: "image", options: { hotspot: true } }),
                defineField({ name: "url", title: "Store Link", type: "url" }),
              ],
            },
          ],
        }),
        defineField({
          name: "instore",
          title: "In-Store Retailers",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Store Name", type: "string" }),
                defineField({ name: "logo", title: "Store Logo", type: "image", options: { hotspot: true } }),
                defineField({ name: "url", title: "Store Link", type: "url" }),
              ],
            },
          ],
        }),
      ],
    }),

    // ───────────── USAGE / INGREDIENTS / VIDEO ─────────────
    defineField({
      name: "usageContent",
      title: "Usage Instructions",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ingredientsText",
      title: "Ingredients",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "tutorialVideo",
      title: "Tutorial Video (Self Hosted)",
      type: "file",
      options: { accept: "video/*" },
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "variants.0.variantImage",
      subtitle: "category",
    },
  },
});
