"use client"

import { createContext, useContext, type ReactNode } from "react"

interface LocaleContextType {
  locale: string
  messages: Record<string, any>
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider")
  }
  return context
}

export function LocaleProvider({ children, locale, messages }: { children: ReactNode; locale: string; messages: Record<string, any> }) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  )
}

export async function getLocaleMessages(locale: string) {
  const messages = await import(`@/lib/messages/${locale}.ts`)
  return messages.default
}

export async function LocaleClientProvider({ children, locale }: { children: ReactNode; locale: string }) {
  const messages = await getLocaleMessages(locale)
  return <LocaleProvider locale={locale} messages={messages}>{children}</LocaleProvider>
}
