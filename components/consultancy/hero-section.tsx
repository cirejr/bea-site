"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export type BeaConsultancyHeroSectionProps = Readonly< Record<string, never>>

export function BeaConsultancyHeroSection(_props: BeaConsultancyHeroSectionProps) {
  const t = useTranslations("consultancy.hero")

  return (
    <section className="relative flex min-h-[870px] items-center overflow-hidden px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/bea-consultancy/1920/1080"
          alt="Strategic excellence"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bea-primary/40 to-bea-primary-container/80 mix-blend-multiply" />
      </div>
      <div className="z-10 mx-auto max-w-4xl text-center md:ml-20 md:text-left">
        <div className="bea-glass-effect rounded-bea-lg border border-white/20 bg-white/10 p-12 shadow-2xl">
          <h1 className="mb-4 md:mb-6 font-bea-headline text-3xl leading-tight font-black tracking-tighter text-white md:text-5xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mb-6 md:mb-10 max-w-2xl font-bea-body text-base md:text-xl leading-relaxed text-white/90 lg:text-2xl">
            {t("description")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/training">
              <Button className="h-auto rounded-full bg-bea-primary-container px-8 py-4 font-bea-headline text-base font-bold text-white hover:bg-bea-primary">
                {t("ctaPrimary")}
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="h-auto rounded-full border border-white/30 bg-white/20 px-8 py-4 font-bea-headline text-base font-bold text-white backdrop-blur-md hover:bg-white/30"
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-20 right-10 h-64 w-64 bg-white opacity-10 bea-arrow-motif" />
    </section>
  )
}
