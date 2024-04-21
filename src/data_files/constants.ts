import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "RotaryDEV Fellowship",
  tagline: "Together, We Code for a Cause",
  description: "The community where tech innovators of Rotary International come together to turn ideas into tangible solutions that enhance our communities and the world. Start collaborating or join us in our next virtual meet-up.",
  description_short: "The community where tech innovators of Rotary International come together to turn ideas into tangible solutions that enhance our communities and the world.",
  url: "https://rotary-dev-fellowship.pages.dev",
  author: "Ricardo Tribaldos",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: ${SITE.tagline}`,
  description: SITE.description,
  image: ogImageSrc,
};
