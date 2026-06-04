"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "./hugeicon"

const trainingPrograms = [
  {
    category: " SAGE & SYSCOHADA Mastery",
    description:
      "Advanced financial reporting and accounting compliance under the revised OHADA accounting system.",
    progress: 85,
  },
  {
    category: "Strategic Human Capital",
    description:
      "Navigating labor laws, fiscal optimization, and payroll management in regional ecosystems.",
    progress: 42,
  },
  {
    category: "QuickBooks & SYCEBNL",
    description:
      "Dedicated training for non-profits on resource tracking and institutional governance standards.",
    progress: 12,
  },
  {
    category: "Business Plan Architect",
    description:
      "From concept to capital: Crafting investable business models within OHADA legal frameworks.",
    progress: 0,
  },
] as const

export type BeaTrainingCatalogSectionProps = Readonly<Record<string, never>>

export function BeaTrainingCatalogSection(
  _props: BeaTrainingCatalogSectionProps
) {
  const t = useTranslations("homeTraining")

  return (
    <section className="bg-bea-background py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-4 font-bea-headline text-5xl font-extrabold text-bea-primary">
              {t("title")}
            </h2>
            <p className="font-bea-body text-lg text-bea-secondary italic">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/formations"
            className="group flex items-center gap-2 font-bea-label font-bold text-bea-primary"
          >
            {t("viewAll")}
            <BeaHugeicon
              name="arrow_forward"
              className="transition-transform group-hover:translate-x-2"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {trainingPrograms.map((course, index) => (
            <div
              key={index}
              className="group rounded-bea-lg bg-bea-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex items-start justify-between">
                <BeaHugeicon
                  name={
                    [
                      "account_balance_wallet",
                      "badge",
                      "diversity_3",
                      "rocket_launch",
                    ][index]
                  }
                  className="text-4xl text-bea-primary"
                />
                <span className="rounded-full bg-bea-secondary-container px-3 py-1 font-bea-label text-xs font-black tracking-widest text-bea-secondary uppercase">
                  {course.category}
                </span>
              </div>
              <h3 className="mb-4 min-h-[3.5rem] font-bea-headline text-xl font-bold text-bea-primary">
                {t(
                  `programs.${["finance", "hr", "ngo", "entrepreneur"][index]}.title`
                )}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-bea-on-surface-variant">
                {t(
                  `programs.${["finance", "hr", "ngo", "entrepreneur"][index]}.description`
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
