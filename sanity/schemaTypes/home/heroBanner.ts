export default {
  name: "heroBanner",
  title: "Hero Banners",
  type: "document",
  fields: [
    {
      name: "desktopImage",
      title: "Desktop Banner Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Recommended size: 1920×665px. Keep key visuals inside 150px safe margins.",
    },
    {
      name: "mobileImage",
      title: "Mobile Banner Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Recommended size: 1080×1920px. Center main visuals for best crop.",
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
    },
  ],
};
