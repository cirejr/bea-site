import { useTranslations } from "next-intl"

import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaAboutValuesSectionProps = Readonly<Record<string, never>>

export function BeaAboutValuesSection(_props: BeaAboutValuesSectionProps) {
  const t = useTranslations("about.values")

  return (
    <section className="bg-bea-surface-container-high py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bea-headline text-4xl font-black tracking-tight text-bea-primary">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-bea-lg bg-bea-surface-container-lowest p-12 md:col-span-2">
            <div className="relative z-10">
              <BeaHugeicon name="lightbulb" className="mb-6 text-5xl text-bea-primary" />
              <h3 className="mb-4 font-bea-headline text-2xl font-bold text-bea-primary">
                {t("innovation.title")}
              </h3>
              <p className="max-w-md font-bea-body text-bea-on-surface-variant">
                {t("innovation.description")}
              </p>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] opacity-5 transition-transform duration-500 group-hover:scale-110">
              <BeaHugeicon name="hub" className="text-[200px]" />
            </div>
          </div>

          <div className="rounded-bea-lg bg-bea-primary-container p-12 text-bea-on-primary-container">
            <BeaHugeicon name="verified" className="mb-6 text-5xl text-bea-on-primary-container" />
            <h3 className="mb-4 font-bea-headline text-2xl font-bold">{t("integrity.title")}</h3>
            <p className="font-bea-body">{t("integrity.description")}</p>
          </div>

          <div className="flex flex-col justify-between rounded-bea-lg bg-bea-surface-container-lowest p-12">
            <div>
              <BeaHugeicon name="school" className="mb-6 text-5xl text-bea-primary" />
              <h3 className="mb-4 font-bea-headline text-2xl font-bold text-bea-primary">
                {t("academic.title")}
              </h3>
            </div>
            <p className="font-bea-body text-bea-on-surface-variant">{t("academic.description")}</p>
          </div>

          <div className="relative overflow-hidden rounded-bea-lg bg-bea-surface-container-highest p-12 md:col-span-2">
            <div className="flex h-full flex-col items-center gap-8 md:flex-row">
              <div className="w-full md:w-1/2">
                <h3 className="mb-4 font-bea-headline text-2xl font-bold text-bea-primary">
                  {t("resilience.title")}
                </h3>
                <p className="font-bea-body text-bea-on-surface-variant">{t("resilience.description")}</p>
              </div>
              <div className="flex h-40 w-full items-center justify-center rounded bg-white/50 p-4 backdrop-blur-sm md:w-1/2">
                <BeaHugeicon name="shield" className="text-6xl text-bea-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
