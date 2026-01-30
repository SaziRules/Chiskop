export default {
  name: "heroBanner",
  title: "Home Hero Section",
  type: "document",
  fields: [
    // ───────────── IMAGES ─────────────
    {
      name: "desktopImage",
      title: "Desktop Banner Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "mobileImage",
      title: "Mobile Banner Image",
      type: "image",
      options: { hotspot: true },
    },

    // ───────────── ALT TEXT ─────────────
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
    },
   

  ],
};
