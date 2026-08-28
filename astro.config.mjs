import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: 'https://rotary-dev-fellowship.pages.dev',
  image: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "pt"],
    fallback: {
      es: "en",
      fr: "en",
      pt: "en",
    },
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en", // All urls that don't contain a locale prefix will be treated as default locale, i.e. `en`
        locales: {
          en: "en", // The `defaultLocale` value must present in `locales` keys
          es: "es-ES",
          fr: "fr",
          pt: "pt-BR",
        },
      },
    }),
    starlight({
      title: 'RotaryDEV Fellowship Docs',
      editLink: {
        baseUrl: 'https://github.com/rotary-dev-fellowship/website/edit/develop/',
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        es: { label: "Español", lang: "es" },
        pt: { label: "Português (Brasil)", lang: "pt-BR" },
        // de: { label: "Deutsch", lang: "de" },
        // fa: { label: "Persian", lang: "fa", dir: "rtl" },
        // fr: { label: "Français", lang: "fr" },
        // ja: { label: "日本語", lang: "ja" },
        // "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: "Quick Start Guides",
          translations: {
            "es": "Guías de Inicio Rápido",
            "pt-BR": "Guias de Início Rápido",
          //   de: "Schnellstartanleitungen",
          //   fa: "راهنمای شروع سریع",
          //   fr: "Guides de Démarrage Rapide",
          //   ja: "クイックスタートガイド",
          //   "zh-cn": "快速入门指南",
          },
          autogenerate: { directory: "docs/guides" },
        },
        {
          label: "Resources",
          translations: {
            "es": "Recursos",
            "pt-BR": "Recursos",
          },
          autogenerate: { directory: "docs/resources" },
        },
      ],
      social: {
        github: "https://github.com/rotary-dev-fellowship",
      },
      disable404Route: true,
      customCss: ["./src/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://rotary-dev-fellowship.pages.dev" + "/docs-social.webp"
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://rotary-dev-fellowship.pages.dev" + "/docs-social.webp"
          },
        },
      ],
      plugins: [
        starlightImageZoom(),
      ],
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
  output: "static",
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
});
