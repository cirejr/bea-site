import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { Inter, Noto_Serif } from "next/font/google"

import { routing } from "@/lib/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { BeaMarketingShell } from "@/components/core/marketing-shell"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
})

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
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
      )}
    >
      <body className={cn(
        inter.variable,
        notoSerif.variable,
        "font-sans"
      )}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <BeaMarketingShell>
              {children}
            </BeaMarketingShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
