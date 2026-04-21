"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { LocaleSwitcher } from "./locale-switcher"
import { BeaHugeicon } from "../home/hugeicon"
import { Menu02FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const LOGO_SRC = "/bea-logo-inverted-transparent.png"

export function BeaNav() {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const locale = useLocale()
  const [open, setOpen] = useState(false)

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
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src={LOGO_SRC}
              alt="B.E.A."
              width={150}
              height={150}
              className="h-14 w-auto md:h-20"
              priority
            />
          </Link>
          <div className="hidden items-center gap-8 font-bea-headline font-semibold tracking-tight lg:flex">
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
        <div className="flex items-center gap-2 md:gap-4">
          <LocaleSwitcher />
          <Link href="/contact" className="hidden md:block">
            <Button
              size="lg"
              className="h-auto rounded-[var(--radius-bea)] bg-bea-primary px-4 py-2 lg:px-6 lg:py-2.5 font-bea-headline text-sm font-semibold lg:text-base lg:font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95"
            >
              {t("cta")}
            </Button>
          </Link>
          <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-bea-surface-container hover:text-bea-primary hover:bg-bea-surface-container rounded-md"
              >
                <HugeiconsIcon icon={Menu02FreeIcons} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-screen">
              <div className="mx-auto w-full max-w-md p-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const active = isActivePath(pathname, link.href)
                    return (
                      <DrawerClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between h-11 rounded-[var(--radius-bea)] border border-bea-outline-variant px-4 py-3 font-semibold transition-colors duration-300",
                            active
                              ? "bg-bea-primary text-bea-on-primary border-0"
                              : "text-bea-on-primary hover:bg-bea-surface-container hover:text-bea-primary"
                          )}
                        >
                          {t(link.key)}
                          <BeaHugeicon
                            name="arrow_right"
                            className="h-5 w-5 "
                          />
                        </Link>
                      </DrawerClose>
                    )
                  })}
                  <DrawerClose asChild>
                    <Link href="/contact" className="mt-2 block md:hidden">
                      <Button
                        size="lg"
                        className="w-full h-auto rounded-[var(--radius-bea)] bg-bea-primary py-3 font-bea-headline font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95"
                      >
                        {t("cta")}
                      </Button>
                    </Link>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  )
}
