import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaAboutInstitutionSectionProps = Readonly<Record<string, never>>

export function BeaAboutInstitutionSection(_props: BeaAboutInstitutionSectionProps) {
  const t = useTranslations("about.institution")

  return (
    <section className="relative mx-8 mb-24 overflow-hidden rounded-bea-lg bg-bea-primary-container py-24 text-bea-on-primary-container">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-8 font-bea-headline text-3xl font-black">
          {t("title")}
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="text-center">
            <p className="mb-2 text-4xl font-black">50M</p>
            <p className="font-bea-headline text-sm tracking-widest uppercase">{t("capital")}</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-4xl font-black">{t("location")}</p>
            <p className="font-bea-headline text-sm tracking-widest uppercase">Base</p>
          </div>
        </div>
        <div className="mt-12">
          <Button className="h-auto rounded-[var(--radius-bea)] bg-bea-surface px-10 py-4 font-bea-headline font-bold text-bea-primary hover:bg-bea-surface-container-low">
            {t("button")}
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 grid grid-cols-6 gap-4 p-8 opacity-10">
        <BeaHugeicon name="architecture" className="text-8xl" />
        <BeaHugeicon name="business" className="text-8xl" />
        <BeaHugeicon name="school" className="text-8xl" />
        <BeaHugeicon name="verified" className="text-8xl" />
        <BeaHugeicon name="account_balance" className="text-8xl" />
        <BeaHugeicon name="hub" className="text-8xl" />
      </div>
    </section>
  )
}
