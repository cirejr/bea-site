import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { TrainingChiffrePage } from "@/components/training/chiffre-page"
import { TrainingGestionRhPage } from "@/components/training/gestion-rh-page"
import { TrainingQsePage } from "@/components/training/qse-page"
import { TrainingDroitPage } from "@/components/training/droit-page"
import { TrainingSoftSkillsPage } from "@/components/training/soft-skills-page"
import { TrainingTechnologiesNumeriquesPage } from "@/components/training/technologies-numeriques-page"
import { TrainingSecteursEtMetiersPage } from "@/components/training/secteurs-et-metiers-page"
import { TrainingCertificationsAmfPage } from "@/components/training/certifications-amf-page"
import { TrainingIncontournablesPage } from "@/components/training/incontournables-page"
import { TrainingNouveautesPage } from "@/components/training/nouveautes-page"
import { TrainingQuickAccessPage } from "@/components/training/quick-access-page"
import { routing } from "@/lib/routing"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const slugConfig: Record<string, { title: string; description: string }> = {
  chiffre: {
    title: "B.E.A. | Finance & Accounting Training",
    description:
      "Master financial reporting, consolidation IFRS, tax management and more with B.E.A.'s certified training programs in partnership with Lefebvre Dalloz.",
  },
  "gestion-rh": {
    title: "B.E.A. | HR Management Training",
    description:
      "Develop HR expertise with B.E.A.'s certified training programs in HR management, labor law, payroll, and social relations, powered by Lefebvre Dalloz.",
  },
  qse: {
    title: "B.E.A. | QSE Training",
    description:
      "Build expertise in quality, safety, environment, and CSR with B.E.A.'s certified QSE training programs, powered by Lefebvre Dalloz.",
  },
  droit: {
    title: "B.E.A. | Law Training",
    description:
      "Advance your legal expertise with B.E.A.'s certified law training programs in compliance, business law, tax law, and more, powered by Lefebvre Dalloz.",
  },
  "soft-skills": {
    title: "B.E.A. | Soft Skills Training",
    description:
      "Develop essential soft skills with B.E.A.'s certified programs in management, communication, leadership, and more, powered by Lefebvre Dalloz.",
  },
  "technologies-numeriques": {
    title: "B.E.A. | Digital Technologies Training",
    description:
      "Master digital technologies with B.E.A.'s certified programs in AI, IT, digital marketing, and more, powered by Lefebvre Dalloz.",
  },
  "secteurs-et-metiers": {
    title: "B.E.A. | Sectors & Professions Training",
    description:
      "Develop specialized skills with B.E.A.'s certified training programs for social action, public sector, procurement, and more, powered by Lefebvre Dalloz.",
  },
  "certifications-amf": {
    title: "B.E.A. | AMF Certifications",
    description:
      "Prepare for AMF certification with B.E.A.'s comprehensive programs — AMF, Finance Durable, English Platform, and Sustainable Finance — powered by Lefebvre Dalloz.",
  },
  incontournables: {
    title: "B.E.A. | Must-Have Trainings",
    description: "Our most popular and essential training programs.",
  },
  nouveautes: {
    title: "B.E.A. | New Courses",
    description: "Discover our latest training offerings.",
  },
  parcours: {
    title: "B.E.A. | Learning Paths",
    description: "Structured learning paths for professional development.",
  },
  "formations-certifiantes": {
    title: "B.E.A. | Certified Training Programs",
    description: "Explore our certified training programs.",
  },
  "classes-virtuelles": {
    title: "B.E.A. | Virtual Classes",
    description: "Attend our interactive virtual classroom sessions.",
  },
  "offre-lde": {
    title: "B.E.A. | Lefebvre Dalloz Education",
    description: "Training programs powered by Lefebvre Dalloz Education.",
  },
  recherche: {
    title: "B.E.A. | All Training Courses",
    description: "Browse our complete training catalog.",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = slugConfig[slug]
  if (!meta) return { title: "Not Found" }
  return { title: meta.title, description: meta.description }
}

export default async function TrainingCategoryPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  if (slug === "chiffre") {
    return <TrainingChiffrePage />
  }

  if (slug === "gestion-rh") {
    return <TrainingGestionRhPage />
  }

  if (slug === "qse") {
    return <TrainingQsePage />
  }

  if (slug === "droit") {
    return <TrainingDroitPage />
  }

  if (slug === "soft-skills") {
    return <TrainingSoftSkillsPage />
  }

  if (slug === "technologies-numeriques") {
    return <TrainingTechnologiesNumeriquesPage />
  }

  if (slug === "secteurs-et-metiers") {
    return <TrainingSecteursEtMetiersPage />
  }

  if (slug === "certifications-amf") {
    return <TrainingCertificationsAmfPage />
  }

  if (slug === "incontournables") {
    return <TrainingIncontournablesPage />
  }

  if (slug === "nouveautes") {
    return <TrainingNouveautesPage />
  }

  if (slugConfig[slug]) {
    return <TrainingQuickAccessPage slug={slug} />
  }

  notFound()
}

const allSlugs = [
  "chiffre",
  "gestion-rh",
  "qse",
  "droit",
  "soft-skills",
  "technologies-numeriques",
  "secteurs-et-metiers",
  "certifications-amf",
  "incontournables",
  "nouveautes",
  "parcours",
  "formations-certifiantes",
  "classes-virtuelles",
  "offre-lde",
  "recherche",
]

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allSlugs.map((slug) => ({ locale, slug }))
  )
}
