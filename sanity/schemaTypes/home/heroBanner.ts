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

    // ───────────── ALT TEXT ─────────────
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
    },

    // ───────────── TEXT COLOR THEME ─────────────
    {
      name: "theme",
      title: "Text Color Theme",
      type: "string",
      options: {
        list: [
          { title: "Light Text (For Dark Background)", value: "light" },
          { title: "Dark Text (For Light Background)", value: "dark" },
          { title: "Red Text (Chiskop Red)", value: "red" }
        ],
          layout: "radio"
          },
            initialValue: "light"
          },


    // ───────────── HERO TEXT CONTENT ─────────────
    {
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Large bold text. Example: 'Zithembe, ube’nesbindi'",
    },
    {
      name: "subheadline",
      title: "Sub-headline",
      type: "string",
      description: "Line below headline. Example: 'nje nge CHISKOP®'",
    },

    // ───────────── BUTTON ─────────────
    {
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
      description: "Example: 'Shop Now'",
    },
    {
      name: "buttonLink",
      title: "Button Link",
      type: "url",
      description: "Where should the button navigate?",
    },

    // ───────────── ALIGNMENT OPTIONS (OPTIONAL) ─────────────
    {
      name: "textPosition",
      title: "Text Position",
      type: "string",
      description: "Controls horizontal position of text block.",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    },
  ],
};
