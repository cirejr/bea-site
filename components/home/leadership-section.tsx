"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "./hugeicon"

export type BeaLeadershipSectionProps = Readonly<Record<string, never>>

export function BeaLeadershipSection(_props: BeaLeadershipSectionProps) {
  const t = useTranslations("homeLeadership")

  return (
    <section className="relative bg-bea-surface-container-low py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Image
            src="/mentor-leadership.jpg"
            alt="Leadership team collaboration"
            width={1200}
            height={800}
            className="h-auto w-full rounded-xl shadow-2xl"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="mb-8 font-bea-headline text-5xl font-extrabold text-bea-primary">
            {t("title")}
          </h2>
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="shrink-0">
                <BeaHugeicon
                  name="person_pin"
                  className="text-4xl text-bea-primary"
                />
              </div>
              <div>
                <h4 className="mb-2 font-bea-headline text-xl font-bold text-bea-primary">
                  {t("individualTitle")}
                </h4>
                <p className="font-bea-body leading-relaxed text-bea-on-surface-variant">
                  {t("individualDescription")}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0">
                <BeaHugeicon
                  name="diversity_3"
                  className="text-4xl text-bea-primary"
                />
              </div>
              <div>
                <h4 className="mb-2 font-bea-headline text-xl font-bold text-bea-primary">
                  {t("collectiveTitle")}
                </h4>
                <p className="font-bea-body leading-relaxed text-bea-on-surface-variant">
                  {t("collectiveDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
