export const languages = {
  en: "English",
  es: "Español",
  pt: "Português",
} as const;

export type Locale = keyof typeof languages;

export const locales = Object.keys(languages) as Locale[];
