import { SectionHeader } from "./section-header"
import { CourseCard, type CourseCardData } from "./course-card"

const featuredCourses: CourseCardData[] = [
  {
    title: "Formation Finance pour non-financiers (niveau 1)",
    price: "1 645 € HT",
    rating: "4.8/5",
    reviews: 124,
    duration: "2 jours",
    modalities: ["Présentiel", "Captation", "À distance"],
    domain: "Chiffre",
  },
  {
    title: "Formation Facturation électronique : mise en œuvre et contraintes fiscales",
    price: "950 € HT",
    rating: "4.9/5",
    reviews: 131,
    duration: "1 jour",
    modalities: ["Captation", "Présentiel"],
    badge: "Nouveauté",
    domain: "Chiffre",
  },
  {
    title: "RSE (niveau 1) : maîtriser les fondamentaux – Blended learning",
    price: "Sur demande",
    rating: "4.7/5",
    reviews: 89,
    duration: "2 jours",
    modalities: ["Blended learning", "Présentiel", "À distance"],
    domain: "QSE",
  },
  {
    title: "Certification AMF – Pack Essentiel",
    price: "À partir de 590 € HT",
    rating: "4.8/5",
    reviews: 245,
    modalities: ["E-learning"],
    badge: "Incontournable",
    domain: "AMF",
  },
]

type FeaturedTrainingsProps = {
  title?: string
}

export function FeaturedTrainings({
  title = "Formations du moment",
}: FeaturedTrainingsProps) {
  return (
    <section className="mb-14">
      <SectionHeader title={title} />
      <p className="text-sm text-bea-on-surface-variant mb-6 max-w-2xl">
        D&eacute;couvrez les formations les plus populaires et les nouveaut&eacute;s de
        notre catalogue.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {featuredCourses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
    </section>
  )
}
