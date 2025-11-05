// sections/aboutBlock.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "aboutBlock",
  title: "About Block",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text" }),
  ],
});
