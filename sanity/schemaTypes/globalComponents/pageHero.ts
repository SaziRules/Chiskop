import type { Rule } from "sanity";

export default {
  name: "pageHero",
  title: "Page Hero Section",
  type: "document",
  fields: [
    // ───────────── PAGE IDENTIFIER ─────────────
    {
      name: "page",
      title: "Page Identifier",
      type: "slug",
      description:
        "Used to map this hero to a page (e.g. 'products', 'salon', 'chiskop-zone', 'contact-us')",
      options: { source: "headline", maxLength: 60 },
      validation: (Rule: Rule) => Rule.required(),
    },

    // ───────────── IMAGES ─────────────
    {
      name: "desktopImage",
      title: "Desktop Banner Image",
      type: "image",
      options: { hotspot: true },
      description: "Full desktop hero banner. Recommended 1920×500px.",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "mobileImage",
      title: "Mobile Banner Image",
      type: "image",
      options: { hotspot: true },
      description: "Mobile banner (1080×1500).",
      validation: (Rule: Rule) => Rule.required(),
    },

    // ───────────── TEXT CONTENT ─────────────
    {
      name: "heading",
      title: "Small Heading",
      type: "string",
      description: "Optional smaller heading above the main headline.",
    },
    {
      name: "headline",
      title: "Main Headline",
      type: "string",
      description: "Large bold page title.",
    },
    {
      name: "subtext",
      title: "Sub-text",
      type: "string",
      description: "Supportive text under the headline.",
    },

    // ───────────── ALT TEXT ─────────────
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Accessibility alt text for the banner image.",
    },

    // ───────────── ENABLE TOGGLE ─────────────
    {
      name: "enabled",
      title: "Enable Banner",
      type: "boolean",
      initialValue: true,
    },
  ],
};
