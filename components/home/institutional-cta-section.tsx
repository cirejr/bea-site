"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export type BeaInstitutionalCtaSectionProps = Readonly<Record<string, never>>

export function BeaInstitutionalCtaSection(
  _props: BeaInstitutionalCtaSectionProps
) {
  const t = useTranslations("homeCta")

  return (
    <section className="relative overflow-hidden bg-bea-on-primary-fixed-variant py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-8 text-center">
        <h2 className="mb-8 font-bea-headline text-4xl font-black text-white md:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl font-bea-body text-lg text-bea-primary-fixed italic">
          {t("description")}
        </p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link href="/contact">
            <Button className="h-auto rounded-full bg-white px-10 py-4 font-bea-headline text-base font-extrabold text-bea-primary shadow-xl hover:scale-105 hover:bg-white">
              {t("ctaPrimary")}
            </Button>
          </Link>
          <Link href="/catalogues">
            <Button
              variant="ghost"
              className="h-auto rounded-full border-2 border-bea-primary-fixed bg-transparent px-10 py-4 font-bea-headline text-base font-extrabold text-bea-primary-fixed hover:bg-bea-primary-fixed/10"
            >
              {t("ctaSecondary")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
