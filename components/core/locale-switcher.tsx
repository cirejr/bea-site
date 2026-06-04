"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleLocaleChange(value: string | null) {
    if (value) {
      console.log("value", value)
      router.push(pathname, { locale: value })
    }
  }

  return (
    <Select
      value={locale}
      onValueChange={handleLocaleChange}
      items={{ en: "English 🇺🇸", fr: "Français 🇫🇷" }}
    >
      <SelectTrigger className="font-bea-headline text-sm font-semibold uppercase tracking-wider  border-none hover:text-bea-primary focus:ring-0 w-min">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="">
        <SelectItem value="en" className="font-bea-headline">English 🇺🇸</SelectItem>
        <SelectItem value="fr" className="font-bea-headline">Français 🇫🇷</SelectItem>
      </SelectContent>
    </Select>
  )
}
