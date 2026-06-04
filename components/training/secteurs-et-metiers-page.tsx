import { GraduationCap, Heart, Building2, FileText, Settings, UserCheck, Sparkles, HelpCircle } from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { BeaTrainingGridSection } from "./grid-section"

const secteurs = [
  {
    id: "action-sociale",
    title: "Action sociale",
    icon: Heart,
    description:
      "Lefebvre Dalloz Compétences propose des formations destinées aux métiers de l'action sociale et du secteur médico-social. Parmi elles, la formation Associations : technique comptable, enjeux juridiques et fiscaux transmet des connaissances actualisées sur les spécificités comptables, fiscales et juridiques du milieu associatif.",
  },
  {
    id: "secteur-public",
    title: "Secteur public",
    icon: Building2,
    description:
      "Le secteur public suit des évolutions juridiques rapides qui visent à améliorer l'efficacité et la qualité de ses services. Avec Lefebvre Dalloz Compétences, des formations sont spécialisées dans différents sous-domaines du secteur public : management, démocratie participative, relation à l'usager, gestion des emplois…",
  },
  {
    id: "marches-publics",
    title: "Marchés publics",
    icon: FileText,
    description:
      "Lefebvre Dalloz Compétences facilite l'actualisation des connaissances en matière de marchés publics avec ses formations spécialisées. Elles offrent les clés indispensables pour maîtriser les spécificités et les protocoles des marchés publics. C'est notamment le cas du parcours de formation Expert en marchés publics, qui guide les juristes, les commerciaux et les administratifs en charge de constituer des dossiers de réponse aux marchés publics.",
  },
  {
    id: "services-generaux",
    title: "Services généraux",
    icon: Settings,
    description:
      "Les services de l'environnement du travail, également appelés services généraux, assurent la prise en compte de différentes responsabilités dans la stratégie des entreprises. Lefebvre Dalloz Compétences permet aux responsables des services généraux de faire progresser leur savoir-faire à l'aide de formations expertes.",
  },
  {
    id: "assistants",
    title: "Assistant(e)s",
    icon: UserCheck,
    description:
      "La polyvalence est indispensable à l'exercice du métier d'assistant(e). Que vous soyez secrétaire, assistant(e) juridique, assistant(e) de direction, de formation ou encore assistant(e) en ressources humaines, les formations de Lefebvre Dalloz Compétences offrent l'occasion aux novices et aux experts de développer leurs compétences professionnelles et comportementales.",
  },
]

const formationsIncontournables = [
  {
    secteur: "Marchés publics",
    formations: [
      "Parcours Expert en marchés publics",
      "Marchés et contrats publics : prévenir et mesurer les risques",
      "Marché public de travaux : exécution du marché et maîtrise du nouveau CCAG-Travaux",
    ],
  },
  {
    secteur: "Action sociale",
    formations: [
      "Les Rencontres Direction[s] – Équipes de direction : face à un monde en transition(s)",
      "Maîtriser les spécificités comptables, budgétaires et financières dans les ESMS",
      "Associations : technique comptable, enjeux juridiques et fiscaux",
      "Assistants maternels et familiaux : agrément et aspects fonctionnels de l'emploi",
      "Statut et gestion des assistants familiaux",
    ],
  },
]

const profilsParSecteur = [
  {
    secteur: "Action sociale",
    profils: ["Travailleurs sociaux", "Cadres", "Directeurs du secteur social et médico-social"],
  },
  {
    secteur: "Secteur public",
    profils: ["Juristes", "Avocats", "Agents des affaires juridiques", "Agents de la fonction publique"],
  },
  {
    secteur: "Marchés publics",
    profils: ["Juristes", "Commerciaux", "Administratifs"],
  },
  {
    secteur: "Services généraux",
    profils: [
      "Professionnels du bâtiment",
      "Professionnels de l'environnement",
      "Professionnels de l'énergie",
      "Professionnels des achats",
      "Professionnels des assurances",
    ],
  },
  {
    secteur: "Assistant(e)s",
    profils: [
      "Assistant(e)s juridiques",
      "Assistant(e)s de la relation sociale",
      "Assistant(e)s des ressources humaines",
    ],
  },
]

export function TrainingSecteursEtMetiersPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<GraduationCap className="h-4 w-4" />}
          eyebrow="Univers : Secteurs et Métiers"
          title="Formation Secteurs et Métiers — Lefebvre Dalloz Compétences"
          description="Les formations destinées spécifiquement à des secteurs ou des métiers offrent l'occasion d'acquérir des compétences précises et applicables à chaque secteur d'activité. Lefebvre Dalloz Compétences propose une offre de formations dans les secteurs de l'action sociale, du secteur public, des marchés publics, des services généraux et pour le métier d'assistant(e)."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Building2 className="h-12 w-12 text-bea-primary/30" />
            </div>
          }
        />

        <section className="mb-14">
          <SectionHeader title="Comment choisir la formation qui me correspond ?" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {secteurs.map((s) => {
              const Icon = s.icon
              return (
                <InfoCard key={s.title} id={s.id} title={s.title} icon={<Icon className="h-6 w-6" />}>
                  <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                    {s.description}
                  </p>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <SectionHeader title="Avantages des formations Secteurs et Métiers" />
          <div className="space-y-4 text-sm text-bea-on-surface-variant leading-relaxed">
            <p>
              En tant qu'organisme de formation multi-spécialiste, Lefebvre Dalloz Compétences
              propose un riche catalogue de formations aux contenus régulièrement actualisés. Elles
              tiennent compte des différentes évolutions des réglementations et de la législation
              dans les secteurs de l'action sociale, des services généraux, du secteur public, des
              marchés publics ou encore du métier d'assistant(e).
            </p>
            <p>
              Les formations Secteurs et métiers de Lefebvre Dalloz Compétences suivent une méthode
              pédagogique rigoureuse et commune à l'ensemble de son offre de formations. Grâce à un
              dispositif de formation structuré autour du transfert de compétences, les formateurs
              favorisent l'acquisition de compétences par l'expérimentation.
            </p>
            <p>
              Ces praticiens experts encouragent l'engagement des participants pour assurer un
              meilleur ancrage des enseignements. Les outils et connaissances transmis sont
              applicables dès le terme de la formation dans tous les secteurs et métiers.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="À quels profils sont destinées les formations ?" />
          <div className="space-y-4">
            {profilsParSecteur.map((item) => (
              <div
                key={item.secteur}
                className="rounded-2xl border border-bea-outline-variant bg-white p-5"
              >
                <h3 className="text-sm font-bold text-bea-primary mb-3">{item.secteur}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.profils.map((profil) => (
                    <span
                      key={profil}
                      className="rounded-full bg-bea-primary/5 px-3 py-1 text-xs font-medium text-bea-on-surface"
                    >
                      {profil}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Formations incontournables" />
          <div className="space-y-6">
            {formationsIncontournables.map((item) => (
              <div key={item.secteur} className="rounded-2xl border border-bea-outline-variant bg-white p-6">
                <h3 className="text-sm font-bold text-bea-on-surface mb-3">{item.secteur}</h3>
                <ul className="space-y-2">
                  {item.formations.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-bea-on-surface-variant">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                      <span className="text-bea-on-surface">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="FAQ" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-bea-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-bea-on-surface mb-2">
                  À quels profils sont destinées les formations Secteurs et métiers ?
                </h3>
                <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                  Les formations Secteurs et métiers de Lefebvre Dalloz Compétences s'adressent aux
                  différents professionnels de l'action sociale, du secteur public, des marchés
                  publics, des services généraux, ainsi qu'aux assistant(e)s ou futur(e)s
                  assistant(e)s juridiques, de la relation sociale, des ressources humaines, etc.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos formations" />
          <BeaTrainingGridSection activeDomain="secteurs-et-metiers" />
        </section>
      </div>
    </div>
  )
}
