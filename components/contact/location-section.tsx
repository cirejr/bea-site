import Image from "next/image"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaContactLocationSectionProps = Readonly<Record<string, never>>

export function BeaContactLocationSection(
  _props: BeaContactLocationSectionProps
) {
  const t = useTranslations("contact.location")

  return (
    <div className="space-y-12">
      <div className="rounded-[var(--radius-bea)] border-t-4 border-bea-primary bg-bea-surface-container-lowest p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bea-primary text-white">
            <BeaHugeicon name="location_on" className="text-2xl" />
          </div>
          <div>
            <h3 className="font-bea-headline text-xl font-bold text-bea-primary">
              {t("title")}
            </h3>
            <p className="font-bea-label text-sm text-bea-secondary">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <p className="mb-6 font-bea-body leading-relaxed text-bea-secondary">
          {t("address")}
          <br />
          {t("subAddress")}
        </p>
        <div className="space-y-4 border-t border-bea-surface-container pt-6">
          <div className="flex items-center gap-3 font-bea-label text-sm text-bea-on-surface">
            <BeaHugeicon name="email" className="text-lg" />
            {t("email")}
          </div>
          <div className="flex items-center gap-3 font-bea-label text-sm text-bea-on-surface">
            <BeaHugeicon name="phone" className="text-lg" />
            {t("phone")}
          </div>
        </div>
      </div>
      <div className="relative h-64 overflow-hidden rounded-lg grayscale transition-all duration-700 hover:grayscale-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6I04oU0uo1LyeCuVeHBcEIp1NeB94C-eFN5xcVagrya-BDh8ca5y6i6BZsW2Ryo18y6X7h53lP7LJnawNnbR_KfsEBhtGwND2Ptc3wZ_Wyl3h39e_6HC3QBTFBeuhz6X3wPlBNJNWfPGH0B4e9rsfpxGCgOcOEgIyy1WilaICEc45XiTsjx6YUvLnbWIbqVffK21VHd__OmIrCflsxjdEryHW3nxjlXmB4Aej_T7N-ekp6V35-iwQ9V5_eQHn0q_bZCD1c2lJlg"
          alt={t("title")}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-bea-primary">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
