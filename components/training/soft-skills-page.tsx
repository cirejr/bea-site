import {
  GraduationCap,
  Users,
  Target,
  MessageCircle,
  Zap,
  Sparkles,
  TrendingUp,
  BookOpen,
  Award,
  Euro,
} from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { BeaTrainingGridSection } from "./grid-section"

const domaines = [
  {
    title: "Management",
    id: "management",
    icon: Users,
    items: [
      "Management d'équipe",
      "Leadership",
      "Conduite du changement",
      "Management transversal",
      "Motivation des collaborateurs",
      "Gestion des conflits",
      "Communication managériale",
    ],
  },
  {
    title: "Gestion de projet",
    id: "gestion-projet",
    icon: Target,
    items: [
      "Définir les objectifs",
      "Planifier les étapes",
      "Coordonner les équipes",
      "Gérer les risques",
      "Suivre les indicateurs de performance",
      "Accompagner le changement",
    ],
  },
  {
    title: "Communication",
    id: "communication",
    icon: MessageCircle,
    items: [
      "Prise de parole en public",
      "Communication interpersonnelle",
      "Communication écrite",
      "Techniques de présentation",
      "Écoute active",
      "Communication assertive",
    ],
  },
  {
    title: "Efficacité professionnelle",
    id: "efficacite-professionnelle",
    icon: Zap,
    items: [
      "Gestion du temps",
      "Gestion des priorités",
      "Organisation du travail",
      "Gestion du stress",
      "Productivité",
      "Efficacité personnelle",
    ],
  },
  {
    title: "Développement personnel",
    id: "developpement-personnel",
    icon: Sparkles,
    items: [
      "Intelligence émotionnelle",
      "Confiance en soi",
      "Gestion des émotions",
      "Affirmation de soi",
      "Adaptabilité",
      "Posture professionnelle",
    ],
  },
  {
    title: "Relation client – Commercial",
    id: "relation-client",
    icon: TrendingUp,
    items: [
      "Techniques de vente",
      "Négociation",
      "Fidélisation client",
      "Gestion de la relation client",
      "Communication commerciale",
      "Expérience client",
    ],
  },
  {
    title: "Pédagogie – Formation de formateurs",
    id: "pedagogie",
    icon: BookOpen,
    items: [
      "Concevoir une formation",
      "Animer un groupe",
      "Utiliser des techniques pédagogiques adaptées",
      "Favoriser l'engagement des apprenants",
      "Évaluer les acquis",
    ],
  },
]

const profilsCibles = [
  "Managers",
  "Responsables d'équipe",
  "Chefs de projet",
  "Collaborateurs RH",
  "Commerciaux",
  "Formateurs",
  "Consultants",
  "Assistants",
  "Dirigeants",
]

export function TrainingSoftSkillsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<GraduationCap className="h-4 w-4" />}
          eyebrow="Univers : Soft Skills"
          title="Formation Soft Skills — Lefebvre Dalloz Compétences"
          description="Les formations soft skills proposées par Lefebvre Dalloz Compétences permettent aux professionnels de développer leurs compétences comportementales et relationnelles afin d'améliorer leur efficacité professionnelle et leur capacité à évoluer dans des environnements de travail complexes."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-bea-primary/30" />
            </div>
          }
        />

        <section className="mb-14">
          <SectionHeader title="Pourquoi suivre une formation soft skills ?" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8 space-y-4 text-sm text-bea-on-surface-variant leading-relaxed">
            <p>
              Les soft skills regroupent un ensemble de compétences transverses essentielles au
              monde professionnel : communication, management, leadership, gestion du temps, gestion
              des conflits, prise de parole, intelligence émotionnelle, négociation ou encore
              gestion de projet.
            </p>
            <p>
              Le développement des compétences comportementales est devenu un enjeu majeur pour les
              entreprises. Les organisations recherchent désormais des collaborateurs capables de
              s'adapter rapidement, de travailler en équipe, de gérer des situations complexes et
              de communiquer efficacement.
            </p>
            <p>
              Ainsi, suivre une formation soft skills permet de renforcer ses aptitudes
              professionnelles, son impact relationnel et sa performance individuelle et collective.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Comment choisir la formation soft skills qui correspond à mon profil ?" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8">
            <p className="text-sm text-bea-on-surface-variant leading-relaxed">
              Lefebvre Dalloz Compétences propose des formations adaptées à différents profils
              professionnels : managers, responsables d'équipe, chefs de projet, commerciaux,
              formateurs, collaborateurs RH, assistants, consultants ou encore dirigeants. Les
              formations sont accessibles à différents niveaux afin de répondre aussi bien aux
              besoins d'acquisition des fondamentaux qu'aux objectifs de perfectionnement.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Domaines de formation" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {domaines.map((d) => {
              const Icon = d.icon
              return (
                <InfoCard key={d.title} id={d.id} title={d.title} icon={<Icon className="h-6 w-6" />}>
                  <ul className="list-disc pl-4 space-y-1">
                    {d.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <SectionHeader title="Avantages des formations soft skills" />
          <div className="space-y-4 text-sm text-bea-on-surface-variant leading-relaxed">
            <p>
              Les formations soft skills proposées par Lefebvre Dalloz Compétences sont animées par
              des intervenants experts et praticiens, disposant d'une expérience opérationnelle des
              problématiques rencontrées par les participants.
            </p>
            <p>
              Les formations privilégient une approche pratique reposant sur des mises en situation,
              des cas concrets, des exercices collaboratifs, des échanges d'expériences et des
              outils opérationnels directement applicables.
            </p>
            <p>
              Les dispositifs pédagogiques sont conçus pour favoriser l'engagement des participants
              et faciliter le transfert des compétences dans leur environnement professionnel.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Profils cibles" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <p className="text-sm text-bea-on-surface-variant mb-4">
              Les formations soft skills s'adressent à un large public professionnel :
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profilsCibles.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-bea-on-surface font-medium">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Formations certifiantes" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Award className="h-6 w-6 text-bea-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                  Certaines formations soft skills proposées par Lefebvre Dalloz Compétences
                  donnent lieu à une évaluation des compétences et à la délivrance d'un certificat
                  en cas de réussite à l'évaluation finale.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader title="Financement" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Euro className="h-6 w-6 text-bea-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                  Les formations Lefebvre Dalloz Compétences peuvent être financées par le plan de
                  développement des compétences de votre entreprise, par votre OPCO, ou par d'autres
                  dispositifs de formation professionnelle. Renseignez-vous auprès de votre
                  conseiller formation pour connaître les modalités de financement adaptées à votre
                  situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos formations" />
          <BeaTrainingGridSection activeDomain="soft-skills" />
        </section>
      </div>
    </div>
  )
}
