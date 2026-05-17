import { GraduationCap, BookOpen, ClipboardList, Download, Award } from "lucide-react"
import { QuickAccessHero } from "./quick-access-hero"
import { TwoColSection } from "./two-col-section"
import { CertificationCard } from "./certification-card"
import { CertificationGroup } from "./certification-group"
import { CtaCard } from "./cta-card"

const certsPro = [
  {
    title: "Certification AMF",
    description:
      "La certification AMF propose des outils pédagogiques performants, adaptés à la compréhension. Avec un parcours 100% digital et ses différentes options, la préparation à l'examen est optimisée pour la réussite. Cette certification cible divers professionnels financiers, offrant une expertise renforcée et une employabilité durable.",
    badge: "NOUVEAU",
    audience: "Professionnels",
    href: "#",
  },
  {
    title: "Certification AMF Finance Durable",
    description:
      "Offre un programme pédagogique digital enrichi pour optimiser le succès des professionnels. Axée sur la finance durable, elle vise à approfondir la compréhension du cadre institutionnel et des ESG, tout en développant des compétences pour proposer des solutions adaptées aux besoins clients.",
    badge: "NOUVEAU",
    audience: "Professionnels",
    href: "#",
  },
  {
    title: "Certification AMF – English Platform",
    description:
      "Provides high-performance teaching tools for professionals and team leaders, offering three packs for complete learning experiences. Targets salespersons, managers, financial analysts, compliance officers, and investment advisors.",
    audience: "Professionnels",
    href: "#",
  },
  {
    title: "Certification AMF Sustainable Finance",
    description:
      "Intended primarily for professionals who need to gather clients' preferences in terms of ESG criteria. Aims to acquire knowledge on the institutional and economic framework of sustainable finance and understand the essential concepts.",
    audience: "Professionnels",
    href: "#",
  },
]

const certsParticuliers = [
  {
    title: "Certification AMF pour les particuliers",
    description:
      "Propose des outils pédagogiques numériques performants pour renforcer les connaissances réglementaires et financières, offrant une certification à vie. Cible conseillers bancaires, gestionnaires de patrimoine, vendeurs et autres.",
    badge: "NOUVEAU",
    audience: "Particuliers",
    href: "#",
  },
  {
    title: "Certification AMF Finance Durable pour les particuliers",
    description:
      "Propose un parcours numérique complet et des outils pédagogiques performants pour une préparation efficace. Axée sur la culture générale en finance durable pour développer les compétences des conseillers financiers et gestionnaires d'actifs.",
    badge: "NOUVEAU",
    audience: "Particuliers",
    href: "#",
  },
]

const certsEtudiants = [
  {
    title: "Certification AMF pour les étudiants",
    description:
      "Propose des outils pédagogiques solides et un parcours numérique complet, offrant des examens blancs et un accès à l'ebook « Réussir l'examen AMF ». Les packs Essentiel, Premium et Premium Livre renforcent les compétences en conseil en investissement.",
    badge: "NOUVEAU",
    audience: "Étudiants",
    href: "#",
  },
  {
    title: "Certification AMF Finance Durable pour les étudiants",
    description:
      "Propose un accompagnement pédagogique solide avec des outils numériques, incluant un parcours d'e-learning et des examens blancs. Le Pack Essentiel offre un accès de 3 mois pour développer une culture générale en finance durable.",
    badge: "NOUVEAU",
    audience: "Étudiants",
    href: "#",
  },
  {
    title: "Certification AMF Sustainable Finance (students)",
    description:
      "Offers a comprehensive digital preparatory program emphasizing employability, with the Express Pack providing a 3-month access for excellent preparation in sustainable finance and the exam.",
    audience: "Étudiants",
    href: "#",
  },
]

const reussirItems = [
  "Approfondir la connaissance réglementaire et déontologique",
  "Confirmer les bases financières",
  "Acquérir des compétences en conseil et en investissement",
  "Assurer une certification valide à vie pour améliorer l'employabilité",
  "Maîtriser la finance durable et le cadre institutionnel et économique",
  "Acquérir un panel de produits et méthodologies adaptés aux clients",
  "Se préparer à répondre efficacement aux questions de l'examen AMF",
]

export function TrainingCertificationsAmfPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <QuickAccessHero
          icon={<GraduationCap className="h-4 w-4" />}
          title="Nos certifications AMF"
          description="Découvrez nos différentes certifications AMF, une porte ouverte vers l'excellence professionnelle."
          chips={[
            "Certification AMF",
            "Certification AMF Finance Durable",
            "Certification AMF – English Platform",
            "Certification AMF Sustainable Finance",
          ]}
        />

        <TwoColSection
          title="Formation AMF : Votre clé vers la certification"
          image={
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-primary/5 flex items-center justify-center">
              <Award className="h-16 w-16 text-bea-primary/30" />
            </div>
          }
        >
          <p>
            Depuis 15 ans, Lefebvre Dalloz Compétences accompagne professionnels, particuliers et
            étudiants pour la certification AMF. Nos programmes intègrent des outils pédagogiques
            robustes pour une compréhension efficace.
          </p>
          <p>
            Que vous soyez en reconversion, étudiant en finance ou novice, nos formations 100 %
            numériques offrent flexibilité et gestion optimisée, et s'adaptent à vos contraintes
            horaires.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Parcours numérique et plateforme interactive</li>
            <li>Guide « Réussir l&apos;examen AMF » en format numérique ou papier</li>
            <li>Inscription à l&apos;examen AMF, avec 1 ou 2 épreuves selon votre offre</li>
            <li>
              <span className="font-semibold text-bea-primary">NOUVEAU :</span> Passage de
              l&apos;examen en présentiel ou à distance
            </li>
          </ul>
        </TwoColSection>

        <CertificationGroup title="Certifications AMF pour les professionnels">
          {certsPro.map((cert) => (
            <CertificationCard key={cert.title} {...cert} />
          ))}
        </CertificationGroup>

        <CertificationGroup title="Certifications AMF pour les particuliers">
          {certsParticuliers.map((cert) => (
            <CertificationCard key={cert.title} {...cert} />
          ))}
        </CertificationGroup>

        <CertificationGroup title="Certifications AMF pour les étudiants">
          {certsEtudiants.map((cert) => (
            <CertificationCard key={cert.title} {...cert} />
          ))}
        </CertificationGroup>

        <TwoColSection
          title="Réussir votre examen AMF avec Lefebvre Dalloz Education"
          reversed
          image={
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-bea-accent/10 to-bea-accent/5 flex items-center justify-center">
              <ClipboardList className="h-16 w-16 text-bea-accent/30" />
            </div>
          }
        >
          <p>
            Visez l&apos;excellence en préparant l&apos;examen AMF avec Lefebvre Dalloz
            Education. De la réglementation financière à la finance durable, une certification pour
            dynamiser votre carrière :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {reussirItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </TwoColSection>

        <TwoColSection
          title="Comment s'inscrire à une certification AMF avec Lefebvre Dalloz ?"
          image={
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-bea-primary/10 to-bea-accent/5 flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-bea-primary/30" />
            </div>
          }
        >
          <ol className="list-decimal pl-5 space-y-2">
            <li>Choisissez votre pack AMF et/ou les produits complémentaires</li>
            <li>Créez votre compte sur la boutique en ligne et finalisez votre commande</li>
            <li>
              Recevez un email de confirmation et vos identifiants d&apos;accès à la plateforme
              e-learning Campus AMF
            </li>
            <li>Réservez une place d&apos;examen depuis la plateforme</li>
          </ol>
          <p className="text-sm text-bea-on-surface-variant">
            Option possible : passage de l&apos;examen à distance. Si adaptation nécessaire
            (PSH), contactez : amf@lefebvre-dalloz.fr
          </p>
        </TwoColSection>

        <div className="grid gap-4 md:grid-cols-2 mb-14">
          <CtaCard
            icon={<Download className="h-6 w-6" />}
            title="Guide pratique"
            description="Tout savoir sur la certification AMF : qu'est-ce que la certification AMF ? Quand doit-on la passer ? À quoi correspondent les niveaux A et C ? Quelle forme prend l'examen ?"
            href="#"
            ctaLabel="Télécharger le guide pratique"
            variant="download"
          />
          <CtaCard
            icon={<Award className="h-6 w-6" />}
            title="Qualiopi"
            description="Consulter nos certifications Qualiopi"
            href="#"
            ctaLabel="Certificat Qualiopi Lefebvre Dalloz Compétences"
          />
        </div>
      </div>
    </div>
  )
}
