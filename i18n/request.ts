import { getRequestConfig } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  const resolvedLocale =
    !locale || !hasLocale(routing.locales, locale)
      ? routing.defaultLocale
      : locale

  const messages = (await import(`@/lib/messages/${resolvedLocale}.ts`)).default

  return {
    locale: resolvedLocale,
    messages,
  }
})
