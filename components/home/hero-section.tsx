"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import { BeaHugeicon } from "./hugeicon"

export function BeaHeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex h-[921px] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/bea-hero/1920/1080"
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bea-primary/80 to-bea-on-primary-fixed-variant/90 mix-blend-multiply" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
        <div className="max-w-3xl">
          <h1 className="mb-6 font-bea-headline text-6xl leading-tight font-black text-white md:text-7xl">
            {t("title")}
            <span className="text-bea-primary-fixed">
              {" "}
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="mb-10 max-w-xl font-bea-body text-xl text-bea-on-primary-container/80 italic">
            {t("description")}
          </p>
          <div className="flex gap-4">
            <Link href="/training">
              <Button className="h-auto rounded-bea-lg bg-bea-primary-container px-8 py-4 font-bea-headline text-lg font-bold text-white hover:brightness-110">
                {t("ctaPrimary")}
              </Button>
            </Link>
            <Link href="/consultancy">
              <Button
                variant="ghost"
                className="bea-glass-panel h-auto rounded-bea-lg border border-white/20 bg-transparent px-8 py-4 font-bea-headline text-lg font-bold text-white hover:bg-white/10"
              >
                {t("ctaSecondary")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-8 bottom-0 hidden translate-y-1/2 xl:block">
          <div className="bea-glass-panel max-w-md rounded-bea-lg border border-white/30 p-8 shadow-2xl">
            <div className="mb-4 flex items-center gap-4">
              <BeaHugeicon
                name="architecture"
                className="text-4xl text-bea-primary"
              />
              <h3 className="font-bea-headline text-xl font-bold text-bea-primary">
                {t("titleHighlight")}
              </h3>
            </div>
            <p className="font-bea-body text-bea-on-surface-variant">
              {t("description")}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-bea-primary/10 pt-6">
              <span className="font-bea-label text-sm font-bold tracking-widest text-bea-primary uppercase">
                {t("titleHighlight")}
              </span>
              <BeaHugeicon name="verified" className="text-bea-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
