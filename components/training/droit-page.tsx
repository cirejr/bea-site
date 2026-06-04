import {
  GraduationCap,
  Scale,
  Shield,
  Briefcase,
  Users,
  Landmark,
  Gavel,
  Building2,
  Home,
  Sparkles,
  Award,
  Euro,
} from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { BeaTrainingGridSection } from "./grid-section"

const domaines = [
  {
    title: "Compliance, audit et risques",
    id: "compliance",
    icon: Shield,
    description:
      "Pour répondre aux nouveaux besoins des entreprises en termes de contrôle et de gestion des risques, Lefebvre Dalloz Compétences propose une série de formations Compliance, audit et risques. Parmi elles, le parcours de formation Compliance Officer se destine aux juristes, aux compliance officers, aux responsables juridiques, et à toutes les personnes impliquées dans la mise en place d'un programme anti-corruption au sein de sa structure. Ce parcours de formation certifiant repose sur un apprentissage complet et une approche opérationnelle permettant aux participants de développer leurs compétences professionnelles.",
  },
  {
    title: "Droit des affaires",
    id: "droit-affaires",
    icon: Briefcase,
    description:
      "Ces dernières années, le droit des affaires s'est vu transformé par de multiples réformes comme la loi Sapin 2, la loi Pacte et le gouvernement RGPD. Pour être au fait des dernières actualités et des subtilités des réformes, Lefebvre Dalloz Compétences vous propose des formations en droit des affaires, actualisées selon les réformes les plus récentes. Elles accompagnent les participants et leur permettent d'anticiper, de décrypter et d'intégrer de nouvelles dispositions au cœur de leurs pratiques. Le parcours de formation Initiation en droit des sociétés offre la possibilité d'approfondir ses connaissances en droit des sociétés et d'obtenir une Certification Lefebvre Dalloz.",
  },
  {
    title: "Droit des particuliers",
    id: "droit-particuliers",
    icon: Users,
    description:
      "Articulé autour du droit de la famille, du droit des successions et de la réparation de préjudice corporel, le droit des particuliers s'adresse aux professionnels du droit dont l'activité consiste à défendre les intérêts des particuliers. Les formations en droit des particuliers proposent à leurs participants d'actualiser leurs connaissances pour être au fait des dernières évolutions des réglementations en vigueur dans diverses branches du droit : droit du divorce, droit international de la famille, droit des successions, transmission de patrimoine…",
  },
  {
    title: "Droit fiscal",
    id: "droit-fiscal",
    icon: Landmark,
    description:
      "Comprendre les principes et les évolutions du droit fiscal est essentiel pour garantir la conformité aux lois fiscales en constante évolution et pour optimiser la gestion financière des entreprises. En se formant en droit fiscal, les participants acquièrent une expertise qui leur permet de prendre des décisions financières éclairées, de minimiser les risques de litiges fiscaux et d'optimiser la planification fiscale, assurant ainsi la viabilité économique et juridique des activités professionnelles.",
  },
  {
    title: "Contentieux – Procédures",
    id: "contentieux",
    icon: Gavel,
    description:
      "La gestion des litiges est une nécessité pour les entreprises, qui souhaitent mieux appréhender les risques et mieux réagir en cas de contentieux. De ce fait, les entreprises s'attachent de plus en plus à développer leurs services contentieux. En suivant une formation aux contentieux, les participants obtiennent un bagage juridique leur permettant de maîtriser les procédures applicables et de gérer une situation de litiges en minimisant les conséquences néfastes pour l'entreprise.",
  },
  {
    title: "Compétences transverses",
    id: "competences-transverses",
    icon: Award,
    description:
      "Le domaine de formation aux compétences transverses du droit propose des formations spécifiquement destinées aux professionnels du droit. Directeurs juridiques, juristes, responsables juridiques, avocats, contracts managers, assistants de cabinet d'avocats et notaires peuvent participer aux formations. Différentes compétences transverses y sont enseignées : gestion de projet juridique ou de cabinet d'avocat, maîtrise de l'anglais juridique, négociation, médiation notariale, prise de parole en public, management d'équipe, recrutement et fidélisation de ses collaborateurs, pilotage ou digitalisation de fonction juridique.",
  },
  {
    title: "Droit immobilier",
    id: "droit-immobilier",
    icon: Home,
    description:
      "Les professionnels de l'immobilier ont également besoin de connaissances juridiques pour mener à bien leurs missions. La loi ALUR leur demande par ailleurs de suivre 14 heures de formation annuelle pour obtenir le renouvellement de leur carte professionnelle. Lefebvre Dalloz Compétences propose des formations répondant à la fois à cette obligation et aux besoins de montée en compétences des professionnels de l'immobilier. Ils peuvent ainsi perfectionner et sécuriser leurs pratiques.",
  },
  {
    title: "Droit de l'urbanisme et de la construction",
    id: "urbanisme-construction",
    icon: Building2,
    description:
      "Les domaines de l'urbanisme et de la construction sont soumis à une réglementation particulièrement complexe et évolutive. Pour permettre aux professionnels de l'urbanisme et de la construction d'exercer plus efficacement leur activité, Lefebvre Dalloz Compétences leur propose des formations animées par des consultants expérimentés. À l'issue de ces formations adaptées à tout public, les participants sont en mesure d'assurer le montage et le suivi d'opérations de construction conformément aux réglementations actuelles.",
  },
]

const profilsCibles = [
  "Magistrats",
  "Avocats",
  "Juristes",
  "Compliance officers",
  "Responsables juridiques",
  "Professionnels de l'immobilier",
  "Géomètres",
  "Urbanistes",
  "Agents de collectivités territoriales",
]

export function TrainingDroitPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<Scale className="h-4 w-4" />}
          eyebrow="Univers : Droit"
          title="Formation Droit — Lefebvre Dalloz Compétences"
          description="Les formations en droit proposées par Lefebvre Dalloz Compétences permettent à leurs participants de monter en compétences, d'approfondir et d'actualiser leurs connaissances dans plusieurs secteurs d'activité ayant recours au droit."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Scale className="h-12 w-12 text-bea-primary/30" />
            </div>
          }
        />

        <section className="mb-14">
          <SectionHeader title="Pourquoi suivre une formation en droit ?" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8">
            <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-4">
              Les professionnels de la compliance juridique s'approprient davantage les techniques
              de contrôle et de gestion des risques. Les professionnels du droit des affaires ou du
              droit des particuliers approfondissent leurs connaissances de la législation en
              vigueur pour appliquer leurs procédures et proposer un meilleur accompagnement aux
              particuliers. Les formations en contentieux et procédures permettent quant à elles de
              mieux appréhender les situations de litiges en entreprise.
            </p>
            <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-4">
              D'autres formations, comme celles du secteur de l'immobilier ou de l'urbanisme et de
              la construction, s'adressent à un public ciblé qui nécessite de connaître les bonnes
              pratiques et la réglementation de ces domaines spécifiques. Par le biais de
              compétences transverses, les professionnels du droit ont également la possibilité de
              valoriser leurs aptitudes professionnelles.
            </p>
            <p className="text-sm text-bea-on-surface-variant leading-relaxed">
              Ainsi, suivre une formation en droit permet de compléter et d'actualiser ses
              connaissances à travers une formation spécialisée et adaptée aux besoins de son
              activité professionnelle.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Comment choisir la formation en droit qui correspond à mon profil ?" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-8">
            <p className="text-sm text-bea-on-surface-variant leading-relaxed">
              Lefebvre Dalloz Compétences propose des formations diverses, adaptées à des profils
              variés incluant entre autres les avocats, les chargés de conformité, les juristes,
              les professionnels de l'immobilier et les huissiers.
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
                  <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                    {d.description}
                  </p>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <SectionHeader title="Avantages des formations en droit" />
          <div className="space-y-4 text-sm text-bea-on-surface-variant leading-relaxed">
            <p>
              Les formations en droit proposées par Lefebvre Dalloz Compétences offrent de
              multiples avantages. Elles sont dispensées par des professionnels du droit ayant une
              parfaite connaissance des thématiques enseignées. Ils sont donc en mesure de répondre
              aux situations rencontrées par les participants dans leur quotidien.
            </p>
            <p>
              Lors des sessions, nos formateurs combinent explications des notions, démarches et cas
              pratiques concrets pour faciliter l'apprentissage des méthodes et des outils
              applicables dans des situations réelles en entreprise ou auprès des clients des
              professionnels du droit. Des outils pratiques sont fournis lors des formations, ce qui
              permet aux participants de les utiliser comme guides pour mener leurs propres missions
              et créer leurs documents de travail.
            </p>
            <p>
              Le catalogue de formations répond à divers besoins et niveaux de maîtrise. Des
              fondamentaux à l'expertise, pour actualiser ou renforcer ses compétences, se former
              régulièrement est essentiel afin de sécuriser ses pratiques. Les formations en droit
              de Lefebvre Dalloz Compétences sont constamment actualisées pour prendre en compte les
              dernières évolutions et les intégrer à l'enseignement.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Profils cibles" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <p className="text-sm text-bea-on-surface-variant mb-4">
              Les formations en droit sont destinées en premier lieu à des professionnels du droit
              comme les magistrats, les avocats et les juristes. Elles s'adressent également à des
              professionnels du milieu juridique, ayant besoin de compétences actualisées en droit
              pour accomplir au mieux leurs missions. Enfin, de nombreux professionnels ayant besoin
              de développer leurs connaissances en droit peuvent trouver une formation adaptée à
              leurs activités.
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
                  Certaines des formations Lefebvre Dalloz Compétences donnent lieu à une
                  évaluation de compétences et à la délivrance d'un certificat en cas de réussite à
                  l'évaluation finale. Par exemple, la formation Parcours Chargé(e) de recouvrement
                  offre la possibilité aux participants d'obtenir un certificat Lefebvre Dalloz
                  Compétences.
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
          <BeaTrainingGridSection activeDomain="droit" />
        </section>
      </div>
    </div>
  )
}
