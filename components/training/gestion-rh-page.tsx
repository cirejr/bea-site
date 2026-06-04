import {
  GraduationCap,
  Scale,
  Users,
  UserCheck,
  BookOpen,
  Calculator,
  Shield,
  Monitor,
  Sparkles,
  Building2,
} from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { TrustStats } from "./trust-stats"
import { BeaTrainingGridSection } from "./grid-section"

const domaines = [
  {
    id: "droit-social",
    title: "Droit social",
    icon: Scale,
    items: [
      "Contrat de travail",
      "Droit du travail",
      "Obligations sociales",
      "Procédures disciplinaires",
      "Conformité sociale",
    ],
  },
  {
    id: "relations-sociales",
    title: "Relations sociales",
    icon: Users,
    items: [
      "Dialogue social",
      "Négociation collective",
      "Gestion du CSE",
      "Stratégie sociale",
      "Gestion des conflits sociaux",
    ],
    highlight: "Piloter les relations sociales",
  },
  {
    id: "ressources-humaines",
    title: "Ressources Humaines",
    icon: UserCheck,
    items: [
      "Recrutement",
      "Développement RH",
      "Gestion des talents",
      "Mobilité",
      "Stratégie RH",
      "Accompagnement des managers",
    ],
    highlight: "HR Business Partner",
  },
  {
    id: "gestion-formation",
    title: "Gestion de la formation",
    icon: BookOpen,
    items: [
      "Plan de développement des compétences",
      "Gestion des parcours",
      "Dispositifs de formation",
      "Financement des formations",
      "Suivi des compétences",
    ],
  },
  {
    id: "paie",
    title: "Paie",
    icon: Calculator,
    items: [
      "Charges sociales",
      "Déclarations sociales",
      "Conformité paie",
      "Calculs et obligations réglementaires",
    ],
  },
  {
    id: "cse",
    title: "CSE",
    icon: Shield,
    items: [
      "Fonctionnement du CSE",
      "Obligations légales",
      "Prévention des risques",
      "Rôle du référent harcèlement",
      "Consultations obligatoires",
    ],
  },
]

const typesFormations = [
  {
    title: "Formations inter-entreprises",
    icon: Users,
    items: [
      "Sessions ouvertes à plusieurs entreprises",
      "Disponibles en présentiel, à distance ou en format hybride",
    ],
  },
  {
    title: "Formations sur mesure",
    icon: BookOpen,
    items: [
      "Programmes personnalisés adaptés aux besoins métiers",
      "Adaptées au secteur d'activité et aux objectifs de conformité",
      "Conçues pour les enjeux RH spécifiques",
    ],
  },
  {
    title: "Conférences et actualités",
    icon: Monitor,
    items: [
      "Formats courts pour suivre les évolutions légales",
      "Comprendre les réformes RH",
      "Anticiper les changements réglementaires",
    ],
  },
  {
    title: "Digital Learning",
    icon: GraduationCap,
    items: [
      "E-learning",
      "Formations synchrones et asynchrones",
      "Captations vidéo",
      "Blended learning",
    ],
  },
]

const stats = [
  { value: "+16 000", label: "Clients RH utilisant les solutions" },
  { value: "+220", label: "Formations RH proposées" },
  { value: "+8 000", label: "Questions traitées par les experts chaque année" },
]

const formats = [
  { format: "Présentiel", description: "Sessions physiques" },
  { format: "À distance", description: "Formations en ligne" },
  { format: "Captation", description: "Sessions enregistrées" },
  { format: "Blended learning", description: "Mix digital + présentiel" },
]

const valeurMiseEnAvant = [
  "Conformité réglementaire",
  "Expertise juridique",
  "Mise à jour continue des contenus",
  "Intégration de l'IA",
  "Accompagnement métier",
  "Flexibilité pédagogique",
]

export function TrainingGestionRhPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<GraduationCap className="h-4 w-4" />}
          eyebrow="Univers : Gestion RH"
          title="Gestion RH — Lefebvre Dalloz Compétences"
          description="Le domaine Gestion RH fait partie des univers de formation proposés par Lefebvre Dalloz Compétences. Il regroupe des formations professionnelles destinées aux acteurs des ressources humaines, du droit social, de la paie et des relations sociales."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Users className="h-12 w-12 text-bea-primary/30" />
            </div>
          }
        />

        <section className="mb-14">
          <SectionHeader title="Domaines couverts" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {domaines.map((d) => {
              const Icon = d.icon
              return (
                <InfoCard key={d.title} title={d.title} id={d.id} icon={<Icon className="h-6 w-6" />}>
                  <ul className="list-disc pl-4 space-y-1">
                    {d.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {d.highlight && (
                    <p className="mt-3 pt-3 border-t border-bea-outline-variant text-bea-primary font-semibold">
                      Formation mise en avant : {d.highlight}
                    </p>
                  )}
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Types de formations proposées" />
          <div className="grid gap-4 md:grid-cols-2">
            {typesFormations.map((t) => {
              const Icon = t.icon
              return (
                <InfoCard key={t.title} title={t.title} icon={<Icon className="h-6 w-6" />}>
                  <ul className="list-disc pl-4 space-y-1">
                    {t.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Exemple de structure d'une formation" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-bea-primary font-bea-headline">
              Le juriste corporate et la fiscalité
            </h3>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Objectifs pédagogiques</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-bea-on-surface-variant">
                <li>Identifier les enjeux fiscaux liés aux choix juridiques</li>
                <li>Comprendre les impacts fiscaux des décisions d'entreprise</li>
                <li>Accompagner l'évolution de l'entreprise avec les bons choix fiscaux</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Programme</h4>
              <div className="space-y-4 text-sm text-bea-on-surface-variant">
                <div>
                  <p className="font-semibold text-bea-on-surface mb-1">
                    Identifier les enjeux fiscaux liés aux solutions juridiques
                  </p>
                  <div className="ml-4 space-y-2">
                    <div>
                      <p className="font-medium text-bea-primary">Choisir la forme juridique</p>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>Conséquences fiscales</li>
                        <li>Transparence ou opacité fiscale</li>
                        <li>Régime fiscal des apports</li>
                        <li>Acquisition de parts/actions</li>
                        <li>Holdings de rachat</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-bea-primary">Financer l'entreprise</p>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>Capital</li>
                        <li>Comptes courants</li>
                        <li>Prêts bancaires</li>
                        <li>Augmentation/réduction de capital</li>
                        <li>Incidences fiscales</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Moyens pédagogiques</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-bea-on-surface-variant">
                <li>Apprentissage collaboratif</li>
                <li>Auto-évaluation</li>
                <li>Cas pratiques</li>
                <li>Parcours progressifs</li>
                <li>Transfert de compétences opérationnelles</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Public concerné</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-bea-on-surface-variant">
                <li>Juristes</li>
                <li>DRH</li>
                <li>Responsables RH</li>
                <li>Secrétaires généraux</li>
                <li>Avocats</li>
                <li>Professionnels du droit social</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Financement</h4>
              <p className="text-sm text-bea-on-surface-variant mb-2">
                Possibilité de financement via :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-bea-on-surface-variant">
                <li>Plan de développement des compétences</li>
                <li>OPCO</li>
                <li>Dispositifs de formation de l'entreprise</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Solutions RH associées" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
              <h3 className="text-base font-bold text-bea-on-surface mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-bea-primary" />
                Édition
              </h3>
              <ul className="space-y-3">
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">Expertise RH</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Documentation dédiée aux enjeux RH opérationnels et stratégiques.
                  </p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">ELnet Social</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Documentation opérationnelle en droit social et protection sociale.
                  </p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">Navis Social</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Documentation experte en droit social.
                  </p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">actuEL RH</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Journal en ligne destiné aux professionnels RH.
                  </p>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
              <h3 className="text-base font-bold text-bea-on-surface mb-4 flex items-center gap-2">
                <Monitor className="h-5 w-5 text-bea-primary" />
                Logiciels & Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">OPPUS RH</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Automatisation et sécurisation des documents RH.
                  </p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">SMART BDESE</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Création et gestion des rapports BDESE.
                  </p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-bea-on-surface">Solution RH</p>
                  <p className="text-xs text-bea-on-surface-variant">
                    Plateforme tout-en-un comprenant documentation juridique, modèles RH, veille
                    réglementaire, outils pratiques, conventions collectives et jurisprudence.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos chiffres clés" />
          <TrustStats stats={stats} />
        </section>

        <section className="mb-14">
          <SectionHeader title="Formats disponibles" />
          <div className="overflow-hidden rounded-2xl border border-bea-outline-variant">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bea-primary/5">
                  <th className="text-left p-4 font-bold text-bea-on-surface">Format</th>
                  <th className="text-left p-4 font-bold text-bea-on-surface">Description</th>
                </tr>
              </thead>
              <tbody>
                {formats.map((fmt) => (
                  <tr
                    key={fmt.format}
                    className="border-t border-bea-outline-variant"
                  >
                    <td className="p-4 font-semibold text-bea-on-surface">{fmt.format}</td>
                    <td className="p-4 text-bea-on-surface-variant">{fmt.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <SectionHeader title="Valeur mise en avant par Lefebvre Dalloz" />
          <div className="rounded-2xl bg-bea-surface p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4 text-bea-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">Notre engagement</span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {valeurMiseEnAvant.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-bea-on-surface font-medium">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos formations" />
          <BeaTrainingGridSection activeDomain="gestion-rh" />
        </section>
      </div>
    </div>
  )
}
