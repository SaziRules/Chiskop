import { defineType, defineField } from "sanity";

export default defineType({
  name: "brandInfo",
  title: "Brand Info",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
