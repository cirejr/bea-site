"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

export type BeaConsultancyMethodologySectionProps = Readonly<
  Record<string, never>
>

export function BeaConsultancyMethodologySection(
  _props: BeaConsultancyMethodologySectionProps
) {
  const t = useTranslations("consultancy.methodology")

  return (
    <section className="border-y border-bea-primary/5 bg-bea-surface-container-high px-8 py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="md:w-1/2">
          <Image
            src="/architect-academic.jpg"
            alt="Academic methodology"
            width={960}
            height={720}
            className="rounded-bea-lg shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="md:w-1/2">
          <span className="mb-6 block font-bea-headline font-bold tracking-[0.2em] text-bea-primary uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="mb-8 font-bea-headline text-4xl leading-tight font-black text-bea-primary md:text-5xl">
            {t("title")}
          </h2>
          <p className="mb-8 font-bea-body text-xl leading-relaxed text-bea-on-surface-variant">
            {t("body")}
          </p>
          <div className="rounded-bea-lg border-l-4 border-bea-primary bg-bea-surface-container-lowest p-8">
            <p className="font-bea-body text-lg text-bea-primary italic">
              &ldquo;{t("quote")}&rdquo;
            </p>
            <p className="mt-4 font-bea-headline font-bold text-bea-secondary">
              {t("attribution")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
