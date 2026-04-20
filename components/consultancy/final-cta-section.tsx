"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export type BeaConsultancyFinalCtaSectionProps = Readonly<Record<string, never>>

export function BeaConsultancyFinalCtaSection(_props: BeaConsultancyFinalCtaSectionProps) {
  const t = useTranslations("consultancy.finalCta")

  return (
    <section className="relative overflow-hidden bg-bea-primary px-8 py-32">
      <div className="absolute inset-0 bg-white/20 opacity-10 bea-arrow-motif" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-8 font-bea-headline text-5xl font-black tracking-tighter text-white md:text-7xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl font-bea-body text-2xl italic text-white/80">
          {t("description")}
        </p>
        <Link href="/contact">
          <Button className="h-auto rounded-full bg-white px-12 py-5 font-bea-headline text-xl font-black text-bea-primary shadow-xl hover:bg-bea-primary-fixed">
            {t("button")}
          </Button>
        </Link>
      </div>
    </section>
  )
}
