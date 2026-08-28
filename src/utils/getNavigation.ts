import enStrings from "@utils/navigation.ts";
import frStrings from "@utils/fr/navigation.ts";
import esStrings from "@utils/es/navigation.ts";
import ptStrings from "@utils/pt/navigation.ts";
import type { Locale } from "@utils/ui";

const navigationByLocale: Record<Locale, typeof enStrings> = {
  en: enStrings,
  fr: frStrings,
  es: esStrings,
  pt: ptStrings,
};

export function getNavigation(locale: string | undefined) {
  const key = (locale ?? "en") as Locale;
  return navigationByLocale[key] ?? enStrings;
}

export function getHomeUrl(locale: string | undefined): string {
  const key = locale ?? "en";
  return key === "en" ? "/" : `/${key}`;
}
