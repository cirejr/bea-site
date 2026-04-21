import Image from "next/image"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaAboutHeroSectionProps = Readonly<Record<string, never>>

export function BeaAboutHeroSection(_props: BeaAboutHeroSectionProps) {
  const t = useTranslations("about.hero")

  return (
    <section className="relative mb-24 flex min-h-[716px] items-center overflow-hidden px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="z-10">
          <span className="mb-4 inline-block font-bea-headline text-xs font-bold tracking-widest text-bea-primary uppercase">
            {t("eyebrow")}
          </span>
          <h1 className="mb-4 md:mb-8 font-bea-headline text-3xl leading-tight font-black tracking-tighter text-bea-primary md:text-5xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="max-w-lg font-bea-body text-base md:text-lg leading-relaxed italic text-bea-on-surface-variant lg:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="relative h-[500px] overflow-hidden rounded-bea-lg bg-bea-surface-container-low shadow-2xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwytnxJS8Z3yKUNT7vjucbeVp4xE5UConlmrTEx__jmAELgfem-G6jbM_8vX6rMSprPcqEVtphTJw9-a_REk9uhY1fVmb6c5dfxjNOVFJsmeuJnC2AxwxN6xYN3NSytOEGxJwoyM4JQHW4SdlRJ0Q_yjsxYzTvWmueiT0xTi2LruTymDoFVXvA0NX3vnpYvI3VnDKhyARSrK9EWsnonyA4CFDbZKamgKyJsgC-DXd-sZjGWklChsyfO9WFNlYyquIODZjeDdlA0g"
            alt={t("title")}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-bea-primary/20 to-transparent" />
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 scale-150 opacity-5">
        <BeaHugeicon name="architecture" className="text-[400px] text-bea-primary-container" />
      </div>
    </section>
  )
}
