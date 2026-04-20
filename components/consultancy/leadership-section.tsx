"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaConsultancyLeadershipSectionProps = Readonly<Record<string, never>>

export function BeaConsultancyLeadershipSection(
  _props: BeaConsultancyLeadershipSectionProps
) {
  const t = useTranslations("consultancy.leadership")

  return (
    <section className="bg-bea-surface-container-low px-8 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <h2 className="mb-6 font-bea-headline text-4xl font-black text-bea-primary md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-3xl font-bea-body text-xl italic text-bea-on-surface">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <TrackCard title={t("individual.title")} description={t("individual.description")} highlights={[{icon: "psychology", title: t("individual.highlight1Title"), subtitle: t("individual.highlight1Subtitle")}, {icon: "auto_graph", title: t("individual.highlight2Title"), subtitle: t("individual.highlight2Subtitle")}]} imageSrc="https://picsum.photos/seed/bea-individual/800/600" />
          <TrackCard title={t("collective.title")} description={t("collective.description")} highlights={[{icon: "hub", title: t("collective.highlight1Title"), subtitle: t("collective.highlight1Subtitle")}, {icon: "forum", title: t("collective.highlight2Title"), subtitle: t("collective.highlight2Subtitle")}]} imageSrc="https://picsum.photos/seed/bea-collective/800/600" />
        </div>
      </div>
    </section>
  )
}

function TrackCard({
  title,
  description,
  highlights,
  imageSrc,
}: {
  title: string
  description: string
  highlights: {icon: string, title: string, subtitle: string}[]
  imageSrc: string
}) {
  return (
    <div className="group overflow-hidden rounded-bea-lg bg-bea-surface-container-lowest p-2 shadow-sm">
      <div className="relative mb-8 h-64 overflow-hidden rounded-bea-lg">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="px-10 pb-12">
        <h3 className="mb-6 font-bea-headline text-3xl font-bold text-bea-primary">{title}</h3>
        <p className="mb-8 font-bea-body leading-relaxed text-bea-on-surface-variant">
          {description}
        </p>
        <div className="space-y-4">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-start gap-4">
              <BeaHugeicon name={h.icon} className="text-bea-primary" />
              <div>
                <p className="font-bea-headline font-bold text-bea-primary">{h.title}</p>
                <p className="text-sm text-bea-secondary">{h.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}