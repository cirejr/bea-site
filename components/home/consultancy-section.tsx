"use client"

import { useTranslations } from "next-intl"

import { BeaHugeicon } from "./hugeicon"

const consultancyIcons = ["groups", "account_balance", "transform"] as const

export type BeaConsultancySectionProps = Readonly<Record<string, never>>

export function BeaConsultancySection(_props: BeaConsultancySectionProps) {
  const t = useTranslations("homeConsultancy")

  const items = [
    { titleKey: "hrTitle", descKey: "hrDescription" },
    { titleKey: "financeTitle", descKey: "financeDescription" },
    { titleKey: "transformTitle", descKey: "transformDescription" },
  ] as const

  return (
    <section className="bea-arrow-watermark bg-bea-surface-container-lowest py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20 text-center md:text-left">
          <h2 className="mb-4 font-bea-headline text-5xl font-extrabold text-bea-primary">
            {t("title")}
          </h2>
          <p className="font-bea-body max-w-2xl text-lg italic text-bea-secondary">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.titleKey}
              className="rounded-bea-lg bg-bea-surface-container-low p-8 transition-colors duration-500 hover:bg-bea-surface-container"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <BeaHugeicon name={consultancyIcons[index]} className="text-3xl text-[#E5E4E2]" />
              </div>
              <h3 className="mb-4 font-bea-headline text-2xl font-bold text-bea-primary">
                {t(item.titleKey)}
              </h3>
              <p className="leading-relaxed text-bea-on-surface-variant">
                {t(item.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
