"use client"

import { useTranslations } from "next-intl"
import { GraduationCap } from "lucide-react"

const slugToKey: Record<string, string> = {
  "certifications-amf": "training_qa_amf",
  incontournables: "training_qa_incontournables",
  nouveautes: "training_qa_nouveautes",
  parcours: "training_qa_parcours",
  "formations-certifiantes": "training_qa_certifiantes",
  "classes-virtuelles": "training_qa_classes_virtuelles",
  "offre-bea": "training_qa_offre_lde",
  recherche: "training_qa_recherche",
}

export function TrainingQuickAccessPage({ slug }: { slug: string }) {
  const t = useTranslations("nav")

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <header className="mb-10 max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-bea-primary font-medium mb-3">
            <GraduationCap className="h-4 w-4" />
            <span>Formations</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-bea-primary font-bea-headline tracking-tighter mb-4">
            {t(slugToKey[slug])}
          </h1>
          <p className="text-base md:text-lg text-bea-on-surface-variant font-bea-body leading-relaxed max-w-3xl">
            Explorez nos programmes de formation dans cette catégorie.
          </p>
        </header>

        <div className="rounded-2xl border border-bea-outline-variant bg-white p-8 md:p-12 text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-bea-primary/40 mb-4" />
          <h2 className="text-lg font-semibold text-bea-on-surface mb-2">
            Contenu à venir
          </h2>
          <p className="text-sm text-bea-on-surface-variant max-w-md mx-auto">
            Les détails de cette section seront bientôt disponibles. Revenez
            prochainement pour découvrir l&apos;ensemble de nos formations.
          </p>
        </div>
      </div>
    </div>
  )
}
