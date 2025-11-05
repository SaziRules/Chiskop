import { groq } from "next-sanity";

export const HOMEPAGE_SECTIONS_QUERY = groq`
  *[_type == "homePage"][0]{
    sections[]{
      _key,
      _type,
      // hero
      headline,
      subcopy,
      ctaLabel,
      ctaHref,
      theme,
      image,
      // product feature
      kicker,
      copy,
      ctaLabel,
      ctaHref,
      imageSide,
      product->{
        _id,
        title,
        description,
        image
      },
      // retailers
      retailers[]->{
        _id,
        name,
        link,
        logo
      },
      // image banner
      alt,
      // about
      body,
      // newsletter
      headline,
      subcopy
    }
  }
`;
