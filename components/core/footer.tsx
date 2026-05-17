"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export type BeaFooterProps = Readonly<Record<string, never>>

export function BeaFooter(_props: BeaFooterProps) {
  const t = useTranslations("footer")

  return (
    <footer className="w-full bg-bea-primary-container">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 px-8 py-12 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Image
            src="/bea-logo-inverted-transparent.png"
            alt="B.E.A."
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <p className="font-bea-body text-sm text-white/70">
            {t("address")}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#"
              className="font-bea-body text-sm text-white/70 transition-colors hover:text-white"
            >
              {t("privacy")}
            </Link>
            <Link
              href="#"
              className="font-bea-body text-sm text-white/70 transition-colors hover:text-white"
            >
              {t("certifications")}
            </Link>
          </div>
        </div>
        <p className="font-bea-body text-sm text-white/70">
          {t("copyright")}
        </p>
      </div>
    </footer>
  )
}
