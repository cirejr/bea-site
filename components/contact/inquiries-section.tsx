"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export type BeaContactInquiriesSectionProps = Readonly<Record<string, never>>

export function BeaContactInquiriesSection(
  _props: BeaContactInquiriesSectionProps
) {
  const t = useTranslations("contact.inquiries")

  return (
    <section className="bg-bea-surface px-8 py-24">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-12 text-center font-bea-headline text-3xl font-black tracking-tight text-bea-primary">
          {t("title")}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Link
            href={t("consultancy.href")}
            className="group flex items-start gap-6 rounded-[var(--radius-bea)] bg-bea-surface-container p-8 transition-all duration-300 hover:bg-bea-primary"
          >
            <div className="bea-material-symbols flex h-14 w-14 items-center justify-center rounded-lg bg-white/20 group-hover:bg-white/10">
              <span
                className="text-4xl text-bea-primary group-hover:text-white"
                style={{ fontSize: "40px" }}
              >
                {t("consultancy.icon")}
              </span>
            </div>
            <div>
              <h4 className="mb-2 font-bea-headline text-xl font-bold text-bea-primary group-hover:text-white">
                {t("consultancy.title")}
              </h4>
              <p className="font-bea-body text-bea-secondary group-hover:text-white/80">
                {t("consultancy.description")}
              </p>
            </div>
          </Link>
          <Link
            href={t("training.href")}
            className="group flex items-start gap-6 rounded-[var(--radius-bea)] bg-bea-surface-container p-8 transition-all duration-300 hover:bg-bea-primary"
          >
            <div className="bea-material-symbols flex h-14 w-14 items-center justify-center rounded-lg bg-white/20 group-hover:bg-white/10">
              <span
                className="text-4xl text-bea-primary group-hover:text-white"
                style={{ fontSize: "40px" }}
              >
                {t("training.icon")}
              </span>
            </div>
            <div>
              <h4 className="mb-2 font-bea-headline text-xl font-bold text-bea-primary group-hover:text-white">
                {t("training.title")}
              </h4>
              <p className="font-bea-body text-bea-secondary group-hover:text-white/80">
                {t("training.description")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
