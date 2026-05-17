import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"

import { routing } from "@/lib/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { BeaMarketingShell } from "@/components/core/marketing-shell"
import { notFound } from "next/navigation"

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}>) {
  const { locale } = await params

  if (!locale || !hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <BeaMarketingShell>
          {children}
        </BeaMarketingShell>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
