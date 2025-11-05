// sections/imageBanner.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "imageBanner",
  title: "Image Banner",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Banner Image", type: "image", options:{hotspot:true} }),
    defineField({ name: "alt", title: "Alt Text", type: "string" }),
  ],
});
