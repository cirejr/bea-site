"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

export type BeaContactHeroSectionProps = Readonly<Record<string, never>>

export function BeaContactHeroSection(_props: BeaContactHeroSectionProps) {
  const t = useTranslations("contact.hero")

  return (
    <section className="bea-arrow-watermark relative mx-auto max-w-screen-2xl overflow-hidden px-8 py-20 pt-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <span className="font-bea-headline text-xs font-bold tracking-widest text-bea-primary uppercase">
            {t("eyebrow")}
          </span>
          <h1 className="font-bea-headline text-5xl font-black tracking-tighter text-bea-primary lg:text-7xl">
            {t("title")}
          </h1>
          <p className="max-w-md font-bea-body text-lg leading-relaxed text-bea-secondary">
            {t("subtitle")}
          </p>
        </div>
        <div className="bea-glass-panel relative overflow-hidden rounded-lg shadow-2xl">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="https://picsum.photos/seed/bea-contact/800/600"
              alt="Contact"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 flex items-end bg-gradient-to-tr from-bea-primary/40 to-transparent p-8">
            <div className="text-white">
              <p className="font-bea-headline text-2xl font-bold">B.E.A.</p>
              <p className="font-bea-body text-sm italic opacity-90">
                Architecting Intellectual Success
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
