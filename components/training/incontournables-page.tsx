import { GraduationCap, Target, BookOpen, Users, Award, Laptop, Shield, Building, Sparkles, Monitor } from "lucide-react"
import { QuickAccessHero } from "./quick-access-hero"
import { TwoColSection } from "./two-col-section"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { TrustStats } from "./trust-stats"
import { UniversAccordion } from "./univers-accordion"

const pourquoiItems = [
  "Renforcer ses compétences métier",
  "Actualiser ses connaissances face aux évolutions réglementaires",
  "Sécuriser ses pratiques professionnelles",
  "Gagner en efficacité opérationnelle",
  "Répondre aux exigences des entreprises et du marché",
]

const universList = [
  {
    title: "Droit des affaires",
    description:
      "Formations pour maîtriser les enjeux juridiques et fiscaux des entreprises, comprendre les réformes et sécuriser les décisions stratégiques.",
    subCategories: ["Compliance, audit et risques", "Droit des affaires"],
    domainSlug: "droit",
    subCategorySlug: "droit-affaires",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Droit des particuliers",
    description:
      "Formations dédiées aux problématiques juridiques liées aux personnes physiques : famille, patrimoine, successions, responsabilité.",
    subCategories: ["Droit des particuliers"],
    domainSlug: "droit",
    subCategorySlug: "droit-particuliers",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Droit fiscal",
    description:
      "Formations pour comprendre et appliquer les règles fiscales, optimiser la gestion fiscale et anticiper les risques.",
    subCategories: ["Droit fiscal"],
    domainSlug: "droit",
    subCategorySlug: "droit-fiscal",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Contentieux – Procédures",
    description:
      "Formations pour maîtriser les mécanismes de gestion des litiges, les procédures judiciaires et les stratégies de défense.",
    subCategories: ["Contentieux – Procédures"],
    domainSlug: "droit",
    subCategorySlug: "contentieux",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Soft skills Droit",
    description:
      "Formations pour développer les compétences comportementales appliquées aux métiers du droit : communication, management, efficacité professionnelle.",
    subCategories: ["Compétences transverses"],
    domainSlug: "droit",
    subCategorySlug: "competences-transverses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Immobilier",
    description:
      "Formations pour sécuriser les pratiques juridiques et techniques dans les métiers de l'immobilier.",
    subCategories: ["Droit immobilier"],
    domainSlug: "droit",
    subCategorySlug: "droit-immobilier",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Urbanisme – Construction",
    description:
      "Formations pour comprendre la réglementation, sécuriser les opérations et gérer les projets d'aménagement et de construction.",
    subCategories: ["Urbanisme – Construction"],
    domainSlug: "droit",
    subCategorySlug: "urbanisme-construction",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Gestion RH",
    description:
      "Formations pour maîtriser les ressources humaines et les fonctions associées.",
    subCategories: [
      "Droit social",
      "Relations sociales",
      "Ressources Humaines",
      "Gestion de la formation",
      "Paie",
      "CSE",
    ],
    domainSlug: "gestion-rh",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Soft skills",
    description:
      "Formations pour développer les compétences comportementales.",
    subCategories: [
      "Management",
      "Gestion de projet",
      "Communication",
      "Efficacité professionnelle",
      "Développement personnel",
      "Relation client – Commercial",
      "Pédagogie – Formation de formateurs",
    ],
    domainSlug: "soft-skills",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Technologies numériques",
    description:
      "Formations pour développer les compétences digitales et technologiques.",
    subCategories: [
      "Bureautique",
      "IA – Intelligence artificielle",
      "IA Secteur public",
      "Informatique",
      "Marketing digital",
    ],
    domainSlug: "technologies-numeriques",
    icon: <Monitor className="h-5 w-5" />,
  },
  {
    title: "QSE",
    description:
      "Formations liées à la qualité et aux conditions de travail.",
    subCategories: [
      "Qualité",
      "Santé – Sécurité",
      "Environnement",
      "QVT – Qualité de Vie au Travail",
      "RSE – Développement durable",
    ],
    domainSlug: "qse",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Secteurs et métiers",
    description:
      "Formations adaptées à des secteurs spécifiques.",
    subCategories: [
      "Action sociale",
      "Secteur public",
      "Marchés publics",
      "Services généraux",
      "Assistant(e)s",
    ],
    domainSlug: "secteurs-et-metiers",
    icon: <Building className="h-5 w-5" />,
  },
]

const pourquoiStats = [
  { value: "60+", label: "Ans d'expertise Lefebvre Dalloz" },
  { value: "44", label: "Formations phares" },
  { value: "7", label: "Univers de formation" },
  { value: "4.7/5", label: "Satisfaction moyenne" },
]

const modalitesItems = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Présentiel",
    description: "Formations animées en salle pour un apprentissage collaboratif et des échanges directs avec le formateur.",
  },
  {
    icon: <Laptop className="h-6 w-6" />,
    title: "À distance",
    description: "Classes virtuelles interactives accessibles depuis n'importe où, pour une flexibilité maximale.",
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Captation",
    description: "Replay des sessions pour réviser à votre rythme, idéal pour concilier formation et contraintes d'agenda.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Blended learning",
    description: "Parcours mixtes alliant digital et présentiel pour une montée en compétences progressive et personnalisée.",
  },
]

const accompagnementItems = [
  "Des parcours adaptés aux besoins des entreprises",
  "Des formations personnalisées",
  "Un accompagnement dans la montée en compétences",
  "Des solutions flexibles pour les apprenants",
]

const accessibiliteItems = [
  "Une adaptation aux contraintes professionnelles",
  "Une montée en compétences progressive",
  "Un accès facilité aux contenus pédagogiques",
  "Une flexibilité entre présentiel et distanciel",
]

export function TrainingIncontournablesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <QuickAccessHero
          icon={<GraduationCap className="h-4 w-4" />}
          title="Formations professionnelles incontournables"
          description="Découvrez les formations incontournables Lefebvre Dalloz Compétences pour développer vos compétences et répondre aux évolutions de votre métier."
        />

        <section className="mb-14">
          <SectionHeader title="Pourquoi suivre nos formations incontournables ?" />
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-4">
            Les formations professionnelles incontournables permettent de :
          </p>
          <ul className="space-y-2">
            {pourquoiItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-bea-on-surface">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <UniversAccordion universList={universList} />

        <section className="mt-14 mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-6 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-bea-primary shrink-0" />
            Pourquoi choisir Lefebvre Dalloz Compétences ?
          </h2>
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-6">
            Lefebvre Dalloz Compétences accompagne les professionnels dans le développement de leurs
            compétences grâce à :
          </p>
          <TrustStats stats={pourquoiStats} columns={4} />
        </section>

        <section className="mb-14">
          <SectionHeader title="Modalités de formation" />
          <div className="grid gap-4 sm:grid-cols-2">
            {modalitesItems.map((m) => (
              <InfoCard key={m.title} title={m.title} icon={m.icon}>
                <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                  {m.description}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        <TwoColSection
          title="Accompagnement et personnalisation"
          image={
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Target className="h-16 w-16 text-bea-primary/30" />
            </div>
          }
        >
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-4">
            Lefebvre Dalloz Compétences propose des solutions sur mesure pour répondre aux besoins
            spécifiques de chaque professionnel et entreprise.
          </p>
          <ul className="space-y-2">
            {accompagnementItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-bea-on-surface">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-accent" />
                {item}
              </li>
            ))}
          </ul>
        </TwoColSection>

        <TwoColSection
          title="Accessibilité et flexibilité"
          reversed
          image={
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-bea-accent/10 to-bea-primary/5 flex items-center justify-center">
              <Award className="h-16 w-16 text-bea-accent/30" />
            </div>
          }
        >
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-4">
            Les formations sont conçues pour permettre une adaptation optimale aux contraintes
            professionnelles :
          </p>
          <ul className="space-y-2">
            {accessibiliteItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-bea-on-surface">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                {item}
              </li>
            ))}
          </ul>
        </TwoColSection>
      </div>
    </div>
  )
}
