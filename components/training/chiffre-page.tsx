import { Star, Clock, Users, Building2, GraduationCap, Landmark, Briefcase, Calculator } from "lucide-react"
import { CategoryHero } from "./category-hero"
import { SectionHeader } from "./section-header"
import { InfoCard } from "./info-card"
import { TrustStats } from "./trust-stats"
import { BeaTrainingGridSection } from "./grid-section"

const clubs = [
  {
    title: "Club des Responsables comptables et financiers",
    price: "2 195 € HT",
    rating: "4.6/5",
    reviews: 35,
    duration: "4 x 3 heures 30",
    modalities: ["Captation"],
  },
  {
    title: "Club Actualité des normes IFRS et rapport de durabilité",
    price: "2 305 € HT",
    rating: "4.7/5",
    reviews: 34,
    duration: "4 x 3 heures 30",
    modalities: ["Captation"],
  },
  {
    title: "Club Actualité fiscale approfondie",
    price: "2 195 € HT",
    rating: "4.6/5",
    reviews: 42,
    duration: "4 x 3 heures 30",
    modalities: ["Captation"],
  },
  {
    title: "Club Actualité fiscale du patrimoine",
    price: "1 126 € HT",
    rating: "4.9/5",
    reviews: 11,
    duration: "2 x 3 heures 30",
    modalities: ["Captation"],
  },
]

const filieres = [
  {
    title: "Comptabilité",
    id: "comptabilite",
    icon: Calculator,
    description:
      "Le parcours de formation Comptable d'entreprise permet notamment de maîtriser les principales missions d'un comptable.",
  },
  {
    title: "Consolidation - Normes IFRS",
    id: "consolidation-ifrs",
    icon: Landmark,
    description:
      "Le département de consolidation impose le respect de normes comptables qui se complexifient selon leurs évolutions. Grâce aux formations Lefebvre Dalloz Compétences, les participants obtiennent les éléments indispensables pour exercer dans le respect des normes IFRS.",
  },
  {
    title: "Gestion - Finance",
    id: "gestion-finance",
    icon: Briefcase,
    description:
      "Les professionnels de la fonction finance et de la gestion doivent pouvoir mettre en place une approche globale de leur métier tout en assurant un pilotage efficace de leurs activités. Se former dans la gestion et la finance permet ainsi de monter en compétences dans le contrôle de gestion, dans la gestion de trésorerie, dans l'utilisation d'outils comptables ou encore dans la finance opérationnelle.",
  },
]

const certifications = [
  "Parcours Consolideur en normes IFRS",
  "Parcours Accompagnement d'un client particulier dans la réalisation de son bilan patrimonial",
  "Executive Master en finance quantitative (ex DIFIQ) niveau 1",
  "Executive Master en asset management (ex DIPAM) niveau 1",
]

const chiffreStats = [
  { value: "+1 500", label: "Formations au catalogue" },
  { value: "+100", label: "Parcours de formation" },
  { value: "+120", label: "Formations d'actualité" },
  { value: "+2 000", label: "Intervenants experts" },
  { value: "4,7/5", label: "Note client moyenne" },
]

function ClubCard({ club }: { club: typeof clubs[number] }) {
  return (
    <div className="rounded-2xl border border-bea-outline-variant bg-white p-5 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md">
      <h3 className="text-sm font-semibold text-bea-on-surface leading-snug mb-3">
        {club.title}
      </h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-bea-on-surface-variant mb-3">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-bea-on-surface">{club.price}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{club.rating}</span>
        </div>
        <span>({club.reviews} avis)</span>
        {club.duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{club.duration}</span>
          </div>
        )}
      </div>
      {club.modalities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {club.modalities.map((m) => (
            <span
              key={m}
              className="rounded-full bg-bea-surface px-2 py-0.5 text-xs text-bea-on-surface-variant"
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function TrainingChiffrePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <CategoryHero
          icon={<GraduationCap className="h-4 w-4" />}
          eyebrow="Formations du Chiffre"
          title="Formations du Chiffre — Lefebvre Dalloz Compétences"
          description="Avec les formations Lefebvre Dalloz Compétences, les novices et experts mettent à jour leurs connaissances concernant l'environnement juridique et réglementaire qui s'appliquent à leur activité."
          image={
            <div className="size-32 rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <Calculator className="h-12 w-12 text-bea-primary/30" />
            </div>
          }
        />

        <section className="mb-14">
          <SectionHeader title="Les Formations Incontournables" />
          <BeaTrainingGridSection activeDomain="chiffre" />
        </section>

        <section className="mb-14">
          <SectionHeader title="Les Clubs d'Actualité de l'Univers du Chiffre" />
          <div className="grid gap-4 sm:grid-cols-2">
            {clubs.map((club) => (
              <ClubCard key={club.title} club={club} />
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Présentation des Filières Métiers" />
          <div className="grid gap-6 md:grid-cols-3">
            {filieres.map((f) => {
              const Icon = f.icon
              return (
                <InfoCard key={f.title} title={f.title} id={f.id} icon={<Icon className="h-6 w-6" />}>
                  <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                    {f.description}
                  </p>
                </InfoCard>
              )
            })}
          </div>
        </section>

        <section className="mb-14 rounded-2xl bg-bea-surface p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-6">
            Méthodologie Pédagogique & Financement
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-bea-primary mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pédagogie
              </h3>
              <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                Ces praticiens animent les formations avec une méthode pédagogique structurée autour
                du transfert de compétences. À travers différents ateliers pratiques, des mises en
                situation et des échanges personnalisés, les participants profitent d'un
                apprentissage collaboratif qui optimise l'acquisition de nouvelles compétences.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-bea-primary mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Financements
              </h3>
              <p className="text-sm text-bea-on-surface-variant leading-relaxed">
                Les formations en chiffre de Lefebvre Dalloz Compétences peuvent être financées par
                le plan de développement des compétences de votre entreprise. Certaines d'entre
                elles sont également éligibles au CPF, comme le parcours de formation Consolideur en
                Normes IFRS.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Certifications et Autres Parcours" />
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-6">
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-3 text-sm text-bea-on-surface-variant">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-bea-primary" />
                  <span className="text-bea-on-surface">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Nos chiffres clés" />
          <TrustStats stats={chiffreStats} columns={5} />
        </section>
      </div>
    </div>
  )
}
