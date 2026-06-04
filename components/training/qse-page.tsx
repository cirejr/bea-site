import {
  GraduationCap,
  CheckCircle,
  Shield,
  Leaf,
  Heart,
  Globe,
  Users,
  Monitor,
  Sparkles,
  Building2,
  MapPin,
  Award,
  Calendar,
} from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { TrustStats } from "./trust-stats"
import { BeaTrainingGridSection } from "./grid-section"

const domaines = [
  {
    id: "qualite",
    title: "Qualité",
    icon: CheckCircle,
    items: [
      "Management de la qualité",
      "Amélioration continue",
      "Audits qualité",
      "Conformité réglementaire",
      "Systèmes de management qualité",
    ],
  },
  {
    id: "sante-securite",
    title: "Santé – Sécurité",
    icon: Shield,
    items: [
      "Prévention des risques professionnels",
      "Sécurité au travail",
      "Obligations réglementaires",
      "Gestion des accidents",
      "Prévention santé sécurité",
    ],
  },
  {
    id: "environnement",
    title: "Environnement",
    icon: Leaf,
    items: [
      "Gestion environnementale",
      "Conformité environnementale",
      "Réduction des impacts",
      "Réglementation environnementale",
      "Transition écologique",
    ],
  },
  {
    id: "qvt",
    title: "QVT – Qualité de Vie au Travail",
    icon: Heart,
    items: [
      "Bien-être au travail",
      "Prévention des risques psychosociaux",
      "Engagement des collaborateurs",
      "Amélioration des conditions de travail",
      "Organisation du travail",
    ],
  },
  {
    id: "rse",
    title: "RSE – Développement durable",
    icon: Globe,
    items: [
      "Stratégie RSE",
      "Gouvernance durable",
      "Reporting extra-financier",
      "Transition durable",
      "Responsabilité sociétale",
    ],
    highlight: "RSE (niveau 1) : maîtriser les fondamentaux – Blended learning",
  },
]

const typesFormations = [
  {
    title: "Formations inter-entreprises",
    icon: Users,
    items: [
      "Sessions réunissant des professionnels de plusieurs entreprises",
      "Disponibles en présentiel, à distance, en captation ou en format hybride",
    ],
  },
  {
    title: "Formations intra-entreprise",
    icon: Building2,
    items: [
      "Formations réalisées directement dans l'entreprise",
      "Répondre à des besoins spécifiques",
      "Adapter les contenus aux enjeux métiers",
      "Renforcer les compétences opérationnelles",
    ],
  },
  {
    title: "Formations sur-mesure",
    icon: CheckCircle,
    items: [
      "Programmes personnalisés adaptés au contexte professionnel",
      "Construction de parcours ciblés",
      "Accompagnement stratégique des équipes",
    ],
  },
  {
    title: "Digital Learning",
    icon: Monitor,
    items: [
      "E-learning",
      "Classes virtuelles",
      "Captations vidéo",
      "Blended learning",
      "Parcours à distance",
    ],
  },
]

const pedagogieItems = [
  "Apprentissage collaboratif",
  "Cas pratiques",
  "Mises en situation",
  "Auto-évaluation",
  "Transfert des compétences",
  "Accompagnement pédagogique progressif",
]

const publicConcerne = [
  "Responsables QSE",
  "Responsables qualité",
  "Responsables sécurité",
  "Responsables environnement",
  "Responsables RSE",
  "Managers",
  "Directions RH",
  "Consultants",
  "Auditeurs internes",
]

const formats = [
  { format: "Présentiel", description: "Sessions physiques" },
  { format: "À distance", description: "Formations en ligne" },
  { format: "Captation", description: "Sessions enregistrées" },
  { format: "Blended learning", description: "Mix digital + présentiel" },
]

const pourquoiSections = [
  {
    title: "Expertise métier",
    icon: Award,
    items: [
      "Des intervenants experts et praticiens au fait des réglementations",
      "Au fait des enjeux opérationnels",
      "Des évolutions métiers",
    ],
  },
  {
    title: "Flexibilité des formations",
    icon: Monitor,
    items: [
      "En présentiel, à distance ou en blended learning",
      "En intra-entreprise",
      "Sur mesure",
    ],
  },
  {
    title: "Accompagnement stratégique",
    icon: Users,
    items: [
      "Analyse des besoins",
      "Développement des compétences",
      "Accompagnement des transformations organisationnelles",
    ],
  },
]

const stats = [
  { value: "+1 500", label: "Formations au catalogue" },
  { value: "+100", label: "Parcours de formation" },
  { value: "+120", label: "Formations d'actualité" },
  { value: "+2 000", label: "Intervenants experts" },
  { value: "4,7/5", label: "Note client moyenne" },
]

const valeurAjoutee = [
  "Expertise réglementaire",
  "Accompagnement opérationnel",
  "Flexibilité pédagogique",
  "Formations adaptées aux enjeux métiers",
  "Innovation pédagogique",
  "Dispositifs à distance et hybrides",
]

export function TrainingQsePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<Shield className="h-4 w-4" />}
          eyebrow="Univers : QSE"
          title="QSE — Lefebvre Dalloz Compétences"
          description="Le domaine QSE proposé par Lefebvre Dalloz Compétences regroupe des formations dédiées à la qualité, à la santé et sécurité au travail, à l'environnement, à la qualité de vie au travail et à la responsabilité sociétale des entreprises."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Shield className="h-12 w-12 text-bea-primary/30" />
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
          <SectionHeader title="Exemple de formation mise en avant" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-bea-primary font-bea-headline">
              RSE (niveau 1) : maîtriser les fondamentaux – Blended learning
            </h3>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Objectifs pédagogiques</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-bea-on-surface-variant">
                <li>Comprendre les fondamentaux de la RSE</li>
                <li>Identifier les enjeux du développement durable</li>
                <li>Mettre en place une démarche RSE adaptée à l'entreprise</li>
                <li>Intégrer les enjeux sociétaux et environnementaux dans la stratégie</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-bea-on-surface mb-3">Programme</h4>
              <div className="space-y-4 text-sm text-bea-on-surface-variant">
                <div>
                  <p className="font-semibold text-bea-on-surface mb-1">
                    Comprendre les fondamentaux de la RSE
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Définition de la RSE</li>
                    <li>Principes du développement durable</li>
                    <li>Enjeux réglementaires</li>
                    <li>Impacts organisationnels</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-bea-on-surface mb-1">
                    Mettre en œuvre une démarche RSE
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Diagnostic</li>
                    <li>Gouvernance</li>
                    <li>Pilotage des actions</li>
                    <li>Indicateurs de suivi</li>
                    <li>Communication responsable</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-bea-on-surface mb-1">
                    Intégrer les enjeux environnementaux et sociaux
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Transition écologique</li>
                    <li>Qualité de vie au travail</li>
                    <li>Engagement des parties prenantes</li>
                    <li>Responsabilité sociale</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Moyens pédagogiques" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <p className="text-sm text-bea-on-surface-variant mb-4">
              Les formations reposent sur :
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {pedagogieItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-bea-on-surface font-medium">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Public concerné" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <p className="text-sm text-bea-on-surface-variant mb-4">
              Les formations QSE s'adressent notamment :
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publicConcerne.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-bea-on-surface font-medium">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
                  <tr key={fmt.format} className="border-t border-bea-outline-variant">
                    <td className="p-4 font-semibold text-bea-on-surface">{fmt.format}</td>
                    <td className="p-4 text-bea-on-surface-variant">{fmt.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <SectionHeader title="Formez-vous partout en France" />
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-bea-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                Lefebvre Dalloz Compétences propose des sessions dans plus de 16 villes françaises,
                des formations à distance et des dispositifs flexibles adaptés aux besoins des
                entreprises.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Pourquoi Lefebvre Dalloz Compétences" />
          <div className="grid gap-4 md:grid-cols-3">
            {pourquoiSections.map((s) => {
              const Icon = s.icon
              return (
                <InfoCard key={s.title} title={s.title} icon={<Icon className="h-6 w-6" />}>
                  <ul className="list-disc pl-4 space-y-1">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Évènements et actualités liés au QSE" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-bea-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-bea-on-surface mb-2">
                  Webinars et conférences
                </h3>
                <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                  Évènements proposés autour de la conformité, des réglementations, de
                  l'intelligence artificielle, de la RSE et des enjeux QSE actuels.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos chiffres clés" />
          <TrustStats stats={stats} columns={5} />
        </section>

        <section>
          <SectionHeader title="Valeur ajoutée mise en avant" />
          <div className="rounded-2xl bg-bea-surface p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4 text-bea-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">Notre engagement</span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {valeurAjoutee.map((item) => (
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
          <BeaTrainingGridSection activeDomain="qse" />
        </section>
      </div>
    </div>
  )
}
