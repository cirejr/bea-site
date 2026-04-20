"use client"

import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LocaleSwitcher } from "./locale-switcher"

const LOGO_SRC = "/bea-logo-inverted-transparent.png"

export function BeaNav() {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const locale = useLocale()

  const navLinks = [
    { href: "/", key: "home" },
    { href: "/consultancy", key: "consultancy" },
    { href: "/training", key: "training" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
  ]

  function isActivePath(pathname: string, href: string): boolean {
    const normalizedPathname = pathname === `/${locale}` ? "/" : pathname.replace(`/${locale}`, "")
    if (href === "/") return normalizedPathname === "/"
    return normalizedPathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 shadow-sm shadow-blue-500/5 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src={LOGO_SRC}
              alt="B.E.A."
              width={150}
              height={150}
              className="h-20 w-auto"
              priority
            />
          </Link>
          <div className="hidden items-center gap-8 font-bea-headline font-semibold tracking-tight md:flex">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors duration-300",
                    active
                      ? "border-b-2 border-bea-primary pb-1 text-bea-primary"
                      : "text-bea-secondary hover:text-bea-primary"
                  )}
                >
                  {t(link.key)}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Link href="/contact">
            <Button
              size="lg"
              className="h-auto rounded-[var(--radius-bea)] bg-bea-primary px-6 py-2.5 font-bea-headline font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95"
            >
              {t("cta")}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
