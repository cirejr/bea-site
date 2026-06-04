import {
  Building2,
  Calculator,
  type LucideIcon,
  Monitor,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

export type DomainVisual = {
  src: string
  alt: { fr: string; en: string }
  icon: LucideIcon
}

export const domainVisuals: Record<string, DomainVisual> = {
  chiffre: {
    src: "/domaines/chiffre.jpg",
    alt: { fr: "Domaine Chiffre", en: "Finance domain" },
    icon: Calculator,
  },
  "gestion-rh": {
    src: "/domaines/hr.jpg",
    alt: { fr: "Domaine Gestion RH", en: "HR domain" },
    icon: Users,
  },
  qse: {
    src: "/domaines/qse.jpg",
    alt: { fr: "Domaine QSE", en: "QSE domain" },
    icon: ShieldCheck,
  },
  droit: {
    src: "/domaines/droit.jpg",
    alt: { fr: "Domaine Droit", en: "Law domain" },
    icon: Scale,
  },
  "soft-skills": {
    src: "/domaines/soft-skills.jpg",
    alt: { fr: "Domaine Soft Skills", en: "Soft Skills domain" },
    icon: Sparkles,
  },
  "technologies-numeriques": {
    src: "/domaines/technologies-numeriques.jpg",
    alt: { fr: "Domaine Technologies Numériques", en: "Tech domain" },
    icon: Monitor,
  },
  "secteurs-et-metiers": {
    src: "/domaines/secteurs-et-metiers.jpg",
    alt: { fr: "Secteurs & Métiers", en: "Sectors & Industries" },
    icon: Building2,
  },
}

export function getDomainVisual(slug: string): DomainVisual | null {
  return domainVisuals[slug] ?? null
}
