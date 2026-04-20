import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A locale can only be `locale` (e.g., 'fr' or 'en')
  locales: ["fr", "en"],

  // Default locale when no locale matches
  defaultLocale: "fr",

  // Use locale prefix only for non-default locales
  localePrefix: "as-needed",
})
