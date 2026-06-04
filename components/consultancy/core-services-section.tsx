"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaConsultancyCoreServicesSectionProps = Readonly<
  Record<string, never>
>

export function BeaConsultancyCoreServicesSection(
  _props: BeaConsultancyCoreServicesSectionProps
) {
  const t = useTranslations("consultancy")

  return (
    <section className="bg-bea-surface px-8 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <span className="mb-4 block font-bea-headline font-bold tracking-widest text-bea-primary uppercase">
              {t("coreIntro.eyebrow")}
            </span>
            <h2 className="font-bea-headline text-4xl leading-none font-black tracking-tight text-bea-primary md:text-6xl">
              {t("coreIntro.title")}
            </h2>
          </div>
          <p className="max-w-md font-bea-body text-lg text-bea-on-surface-variant italic">
            {t("coreIntro.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="group flex flex-col gap-8 rounded-bea-lg bg-bea-surface-container-lowest p-10 transition-all duration-500 hover:shadow-xl md:col-span-8 md:flex-row">
            <div className="flex-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-bea-primary-fixed text-bea-primary">
                <BeaHugeicon name="groups" filled className="text-2xl" />
              </div>
              <h3 className="mb-4 font-bea-headline text-2xl font-bold text-bea-primary">
                {t("hrBlock.title")}
              </h3>
              <p className="mb-6 font-bea-body leading-relaxed text-bea-on-surface-variant">
                {t("hrBlock.description")}
              </p>
              <ul className="space-y-3 font-bea-headline text-sm font-semibold text-bea-primary">
                <li className="flex items-center gap-2">
                  <BeaHugeicon name="north_east" className="text-xs" />
                  {t("hrBlock.bullets.talent")}
                </li>
                <li className="flex items-center gap-2">
                  <BeaHugeicon name="north_east" className="text-xs" />
                  {t("hrBlock.bullets.performance")}
                </li>
                <li className="flex items-center gap-2">
                  <BeaHugeicon name="north_east" className="text-xs" />
                  {t("hrBlock.bullets.orgDesign")}
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] min-h-[200px] w-full min-w-0 flex-1 overflow-hidden rounded-xl">
              <Image
                src="/rh.jpg"
                alt="HR Strategy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="group rounded-bea-lg bg-bea-surface-container-low p-10 transition-all duration-500 hover:bg-bea-surface-container-lowest md:col-span-4">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-bea-primary-fixed text-bea-primary">
              <BeaHugeicon name="account_balance" filled className="text-2xl" />
            </div>
            <h3 className="mb-4 font-bea-headline text-2xl font-bold text-bea-primary">
              {t("auditBlock.title")}
            </h3>
            <p className="mb-8 font-bea-body leading-relaxed text-bea-on-surface-variant">
              {t("auditBlock.description")}
            </p>
            <div className="border-t border-bea-primary/10 pt-6">
              <span className="mb-2 block font-bea-headline text-lg font-bold text-bea-primary">
                {t("auditBlock.calloutTitle")}
              </span>
              <p className="font-bea-label text-sm text-bea-secondary">
                {t("auditBlock.calloutSubtitle")}
              </p>
            </div>
          </div>
          <div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-bea-lg bg-bea-primary-container p-12 text-white md:col-span-12 md:flex-row">
            <div className="bea-arrow-motif absolute top-0 right-0 h-96 w-96 rotate-12 bg-white opacity-5" />
            <div className="z-10 md:w-3/5">
              <h3 className="mb-6 font-bea-headline text-3xl font-black md:text-5xl">
                {t("transformBlock.title")}
              </h3>
              <p className="max-w-2xl font-bea-body text-lg leading-relaxed opacity-90 md:text-xl">
                {t("transformBlock.description")}
              </p>
            </div>
            <div className="z-10 flex flex-wrap gap-4 md:w-2/5">
              <div className="min-w-[200px] flex-1 rounded-bea-lg bg-white/10 p-6 backdrop-blur-md">
                <span className="mb-2 block font-bea-headline text-4xl font-bold">
                  45%
                </span>
                <span className="font-bea-label text-sm opacity-80">
                  {t("transformBlock.stats.efficiency")}
                </span>
              </div>
              <div className="min-w-[200px] flex-1 rounded-bea-lg bg-white/10 p-6 backdrop-blur-md">
                <span className="mb-2 block font-bea-headline text-4xl font-bold">
                  98%
                </span>
                <span className="font-bea-label text-sm opacity-80">
                  {t("transformBlock.stats.retention")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
