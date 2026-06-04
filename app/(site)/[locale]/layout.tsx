import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"

import { inter, stackSans } from "@/app/fonts"

import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { BeaMarketingShell } from "@/components/core/marketing-shell"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}>) {
  const { locale } = await params
  console.log("locale :", locale)

  if (!locale || !hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="scroll-smooth antialiased"
    >
      <body className={cn(inter.variable, stackSans.variable, "font-sans")}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <BeaMarketingShell>{children}</BeaMarketingShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
