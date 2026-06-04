import { GraduationCap, BookOpen, Users, Shield, Building, Sparkles, Monitor, Calculator, Phone, Mail, FileText } from "lucide-react"
import { QuickAccessHero } from "./quick-access-hero"
import { SectionHeader } from "./section-header"
import { CtaCard } from "./cta-card"
import { BeaTrainingGridSection } from "./grid-section"

const descriptionContent = {
  tagline: "COLLER À L'ACTUALITÉ DE VOS MÉTIERS",
  paragraphs: [
    "Notre priorité est de vous offrir chaque année de nouvelles formations, au plus près de votre métier et de l'actualité, afin de renforcer vos compétences et vos pratiques professionnelles.",
    "Nous mettons à jour en permanence nos programmes pédagogiques, nos cas pratiques et nos supports de formation, suite à la prise en compte de vos remarques et de l'évolution de vos métiers.",
    "Retrouvez ci-dessous les dernières nouveautés Lefebvre Dalloz Compétences. Vous pouvez les sélectionner par thème.",
  ],
  inscription: {
    title: "Vous souhaitez participer à l'une de nos nouvelles formations ? Rien de plus simple ! Pour vous inscrire, vous pouvez :",
    steps: [
      "Sur notre site, compléter le formulaire d'inscription dans la formation sélectionnée",
      "Contacter notre service client pour obtenir davantage d'informations",
      "Demander une mise en relation immédiate",
    ],
    intra: {
      label: "Nos équipes de conseillers peuvent également vous accompagner dans vos projets de formations Intra et sur mesure.",
      email: "src-formation@lefebvre-dalloz.fr",
      phone: "01 83 10 10 10",
    },
  },
}

type DomainGroup = {
  label: string
  href: string
  icon: React.ReactNode
  categories: string[]
}

const domainGroups: DomainGroup[] = [
  {
    label: "Chiffre",
    href: "/formations/chiffre",
    icon: <Calculator className="h-5 w-5" />,
    categories: [
      "Comptabilité",
      "Consolidation – Normes IFRS",
      "Gestion – Finance",
      "Fiscalité",
      "Gestion de patrimoine",
      "Banque – Assurance",
    ],
  },
  {
    label: "Droit",
    href: "/formations/droit",
    icon: <BookOpen className="h-5 w-5" />,
    categories: [
      "Compliance, audit et risques",
      "Droit des affaires",
      "Droit des particuliers",
      "Droit fiscal",
      "Contentieux – Procédures",
      "Soft skills Droit",
      "Immobilier",
      "Urbanisme – Construction",
    ],
  },
  {
    label: "Gestion RH",
    href: "/formations/gestion-rh",
    icon: <Users className="h-5 w-5" />,
    categories: [
      "Droit social",
      "Relations sociales",
      "Ressources Humaines",
      "Gestion de la formation",
      "Paie",
      "CSE",
    ],
  },
  {
    label: "QSE",
    href: "/formations/qse",
    icon: <Shield className="h-5 w-5" />,
    categories: [
      "Qualité",
      "Santé – Sécurité",
      "Environnement",
      "QVT – Qualité de vie au travail",
      "RSE – Développement durable",
    ],
  },
  {
    label: "Soft skills",
    href: "/formations/soft-skills",
    icon: <Sparkles className="h-5 w-5" />,
    categories: [
      "Management",
      "Gestion de projet",
      "Communication",
      "Efficacité professionnelle",
      "Développement personnel",
      "Relation client – Commercial",
      "Pédagogie – Formation de formateurs",
    ],
  },
  {
    label: "Technologies numériques",
    href: "/formations/technologies-numeriques",
    icon: <Monitor className="h-5 w-5" />,
    categories: [
      "Bureautique",
      "IA – Intelligence artificielle",
      "IA Secteur public",
      "Informatique",
      "Marketing digital",
    ],
  },
  {
    label: "Secteurs & Métiers",
    href: "/formations/secteurs-et-metiers",
    icon: <Building className="h-5 w-5" />,
    categories: [
      "Action sociale",
      "Secteur public",
      "Marchés publics",
      "Services généraux",
      "Assistant(e)s",
    ],
  },
]

export function TrainingNouveautesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <QuickAccessHero
          icon={<GraduationCap className="h-4 w-4" />}
          title="Les nouveautés"
          description={descriptionContent.tagline}
        />

        <section className="mb-6">
          <SectionHeader title="COLLER À L'ACTUALITÉ DE VOS MÉTIERS" />
          {descriptionContent.paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-bea-on-surface-variant leading-relaxed mb-3">
              {p}
            </p>
          ))}
        </section>

        <section className="mb-14 rounded-2xl border border-bea-outline-variant bg-bea-surface/30 p-6 md:p-8">
          <h3 className="text-base font-bold text-bea-on-surface font-bea-headline mb-3 flex items-center gap-2">
            <FileText className="size-4 text-bea-primary" />
            {descriptionContent.inscription.title}
          </h3>
          <ul className="space-y-2 mb-4">
            {descriptionContent.inscription.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-bea-on-surface">
                <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-bea-primary text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
          <p className="text-sm text-bea-on-surface-variant leading-relaxed">
            {descriptionContent.inscription.intra.label}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <a
              href={`mailto:${descriptionContent.inscription.intra.email}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-bea-primary hover:underline"
            >
              <Mail className="size-3.5" />
              {descriptionContent.inscription.intra.email}
            </a>
            <a
              href={`tel:${descriptionContent.inscription.intra.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-bea-primary hover:underline"
            >
              <Phone className="size-3.5" />
              {descriptionContent.inscription.intra.phone}
            </a>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Rechercher une formation" />
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-6">
            Utilisez les filtres ci-dessous pour trouver les formations qui correspondent à vos
            besoins. Vous pouvez rechercher par mot-clé, domaine, sous-catégorie ou modalité.
          </p>
          <BeaTrainingGridSection activeDomain={null} />
        </section>

        <section className="mb-14">
          <SectionHeader title="Tous les thèmes de formation" />
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-6">
            Explorez l&apos;ensemble de nos domaines et sous-catégories de formation. Cliquez sur un
            domaine pour découvrir toutes les formations associées.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {domainGroups.map((group) => (
              <a
                key={group.label}
                href={group.href}
                className="block rounded-2xl border border-bea-outline-variant bg-white p-5 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-bea-primary/10 text-bea-primary">
                    {group.icon}
                  </div>
                  <h3 className="text-sm font-bold text-bea-on-surface font-bea-headline">
                    {group.label}
                  </h3>
                </div>
                <ul className="space-y-1">
                  {group.categories.map((cat) => (
                    <li key={cat} className="flex items-start gap-2 text-xs text-bea-on-surface-variant">
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-bea-outline-variant" />
                      {cat}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-2">
          <CtaCard
            icon={<Phone className="h-6 w-6" />}
            title="Contactez notre service client"
            description="Pour obtenir davantage d'informations sur nos formations, notre équipe est à votre écoute."
            href="/contact"
            ctaLabel="Nous contacter"
          />
          <CtaCard
            icon={<Building className="h-6 w-6" />}
            title="Formations Intra & Sur-mesure"
            description="Nos équipes de conseillers peuvent vous accompagner dans vos projets de formations Intra et sur mesure."
            href="#"
            ctaLabel="Demander un devis"
          />
        </section>
      </div>
    </div>
  )
}
