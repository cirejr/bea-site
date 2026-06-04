import {
  GraduationCap,
  Monitor,
  Brain,
  Building2,
  Code2,
  Megaphone,
  Sparkles,
  Laptop,
  HelpCircle,
} from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { BeaTrainingGridSection } from "./grid-section"

const domaines = [
  {
    id: "bureautique",
    title: "Bureautique",
    icon: Monitor,
    description:
      "Pilier essentiel pour toute entreprise, le domaine de la bureautique englobe une variété de compétences fondamentales pour le traitement de l'information et la communication professionnelle. Lefebvre Dalloz Compétences propose des formations spécialisées abordant les compétences clés en traitement de texte, tableur, présentation et création graphique, tout en offrant une exploration des logiciels de collaboration et de productivité modernes pour optimiser votre efficacité professionnelle.",
  },
  {
    id: "ia",
    title: "IA – Intelligence artificielle",
    icon: Brain,
    description:
      "L'intelligence artificielle est un domaine en constante évolution qui révolutionne les méthodes de travail, transforme la manière dont les entreprises optimisent leurs processus et stimulent l'innovation. Les formations de Lefebvre Dalloz Compétences plongent les professionnels au cœur des applications et modèles d'IA, leur permettant de se familiariser avec les outils d'intelligence artificielle appliqués au management, à la gestion de projet, à la communication et bien d'autres domaines.",
  },
  {
    id: "ia-secteur-public",
    title: "IA Secteur public",
    icon: Building2,
    description:
      "L'intégration de l'intelligence artificielle dans le secteur public marque une transformation profonde des services et de l'administration. Les formations de Lefebvre Dalloz Compétences en IA destinées au secteur public sont élaborées pour vous tenir informé des dernières évolutions, faciliter l'acculturation aux technologies émergentes, soutenir l'accompagnement au changement, ou encore pour vous spécialiser en data science et big data.",
  },
  {
    id: "informatique",
    title: "Informatique",
    icon: Code2,
    description:
      "L'informatique, avec ses spécificités et ses exigences, est au cœur de la performance opérationnelle des entreprises. Les formations de Lefebvre Dalloz Compétences fournissent les clés essentielles pour maîtriser les principes de la gestion de projet informatique et adopter les méthodes agiles, permettant ainsi une mise en œuvre efficace des projets informatiques et l'automatisation de processus.",
  },
  {
    id: "marketing-digital",
    title: "Marketing digital",
    icon: Megaphone,
    description:
      "Le marketing digital est un pilier fondamental pour la visibilité et le succès des entreprises dans l'univers connecté d'aujourd'hui, ouvrant la porte à de nouveaux métiers et spécialisations. Les formations de Lefebvre Dalloz Compétences couvrent les bases et les tendances avancées du marketing en ligne, de l'utilisation des outils digitaux à la mise en œuvre de stratégies marketing opérationnelles et stratégiques.",
  },
]

const faqItems = [
  {
    question: "À qui sont destinées les formations en technologie numérique ?",
    answer:
      "Les formations en technologie numérique de Lefebvre Dalloz Compétences sont destinées à un large éventail de professionnels souhaitant développer ou mettre à jour leurs compétences dans le domaine du numérique. Elles s'adressent aux débutants qui veulent acquérir les bases, aux utilisateurs intermédiaires cherchant à approfondir leurs connaissances, ainsi qu'aux personnes avancées désireuses de se tenir informées des dernières tendances.",
  },
  {
    question: "Proposez-vous des formations à distance ou en présentiel ?",
    answer:
      "Lefebvre Dalloz Compétences offre une grande souplesse dans le format de ses formations, disponibles en présentiel pour une expérience physique immersive, ainsi qu'en ligne avec des options de formation à distance ou des modules d'e-learning.",
  },
  {
    question: "Comment financer ma formation ?",
    answer:
      "Les formations en technologies numériques de Lefebvre Dalloz Compétences peuvent être financées grâce au plan de développement des compétences de votre entreprise, une opportunité ouverte à tous les salariés. Pour connaître les options de financement disponibles, n'hésitez pas à vous rapprocher de votre service RH ou de formation.",
  },
]

export function TrainingTechnologiesNumeriquesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<GraduationCap className="h-4 w-4" />}
          eyebrow="Univers : Technologies Numériques"
          title="Formation Technologies Numériques — Lefebvre Dalloz Compétences"
          description="L'ère du numérique transforme radicalement nos méthodes de travail et de communication. Lefebvre Dalloz Compétences vous offre des programmes de formation animés par des formateurs experts en innovation et en solutions digitales pour vous maintenir à la pointe des tendances numériques."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Monitor className="h-12 w-12 text-bea-primary/30" />
            </div>
          }
        />

        <section className="mb-14">
          <SectionHeader title="Pourquoi se former aux technologies numériques ?" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-bea-on-surface mb-2">
                Qu'est-ce que les technologies numériques ?
              </h3>
              <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                Les technologies numériques englobent de multiples outils utilisés pour créer,
                manipuler, stocker, échanger et analyser des informations dans un format numérique.
                Elles couvrent un spectre varié d'éléments, allant des logiciels de bureautique
                comme Excel et des solutions de Business Intelligence aux outils de conception
                graphique, en passant par des domaines plus avancés tels que l'intelligence
                artificielle, l'informatique, la gestion de projet, ainsi que le marketing digital.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-bea-on-surface mb-2">
                Quelles sont les métiers qui utilisent les technologies numériques ?
              </h3>
              <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                Ces technologies sont devenues fondamentales pour toutes les secteurs d'activités.
                Tous les services au sein des entreprises, des plus techniques aux plus créatifs,
                utilisent à des degrés divers les technologies numériques. Que ce soit pour la
                gestion de projets, la communication, les ressources humaines, la comptabilité, le
                marketing ou encore le développement de produits, chaque département s'appuie sur
                des outils numériques pour optimiser ses opérations et stratégies.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-bea-on-surface mb-2">
                Pourquoi se former aux outils numériques ?
              </h3>
              <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                Face à l'essor de la digitalisation des entreprises et des services en ligne, la
                formation aux technologies et applications numériques est devenue cruciale. Cette
                accélération a renforcé la dépendance envers les outils en ligne et a rendu
                indispensable une utilisation optimale de ces technologies pour gagner en
                productivité. Ainsi, investir dans une formation aux technologies numériques
                constitue une démarche stratégique, permettant de rester compétent, innovant et en
                sécurité dans un paysage commercial en constante mutation.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Domaines de formation" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {domaines.map((d) => {
              const Icon = d.icon
              return (
                <InfoCard key={d.title} id={d.id} title={d.title} icon={<Icon className="h-6 w-6" />}>
                  <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                    {d.description}
                  </p>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <SectionHeader title="Avantages des formations en technologies numériques" />
          <div className="space-y-4 text-sm text-bea-on-surface-variant leading-relaxed">
            <p>
              Les formations en technologies numériques proposées par Lefebvre Dalloz Compétences
              offrent de nombreux avantages. Elles sont dispensées par des experts dans leur
              domaine, assurant un enseignement à la fois théorique et pratique. Cette approche
              garantit que les participants puissent non seulement comprendre les dernières
              tendances et outils numériques, mais aussi les appliquer concrètement dans leur
              environnement de travail.
            </p>
            <p>
              Grâce à une pédagogie interactive, les formations favorisent un apprentissage
              collaboratif et dynamique, avec des ateliers pratiques, des études de cas et des
              discussions qui enrichissent l'expérience d'apprentissage. Les contenus des formations
              sont régulièrement mis à jour pour refléter les dernières innovations et changements
              dans le domaine des technologies numériques, assurant ainsi aux participants de rester
              compétitifs.
            </p>
            <p>
              Que vous souhaitiez consolider vos compétences actuelles ou développer de nouvelles
              expertises, les formations de Lefebvre Dalloz Compétences sont conçues pour répondre à
              différents niveaux de maîtrise et pour intégrer les compétences numériques les plus
              pertinentes et les plus demandées sur le marché.
            </p>
          </div>
        </section>

        <section>
          <SectionHeader title="FAQ" />
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-bea-outline-variant bg-white p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-bea-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-bea-on-surface mb-2">
                      {item.question}
                    </h3>
                    <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos formations" />
          <BeaTrainingGridSection activeDomain="technologies-numeriques" />
        </section>
      </div>
    </div>
  )
}
