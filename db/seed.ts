import { getDb } from "./index"

const db = getDb()
import {
  domains,
  subCategories,
  modalites,
  formations,
  courses,
  formationModalities,
  certifications,
  testimonials,
  featuredFormations,
} from "./schema"


async function main() {
  console.log("Seeding database...")

  // ── Domains ──
  const domainData = [
    { slug: "chiffre", label: "Chiffre", iconName: "calculator", sortOrder: 1 },
    { slug: "gestion-rh", label: "Gestion RH", iconName: "users", sortOrder: 2 },
    { slug: "qse", label: "QSE", iconName: "shield", sortOrder: 3 },
    { slug: "droit", label: "Droit", iconName: "scale", sortOrder: 4 },
    { slug: "soft-skills", label: "Soft Skills", iconName: "sparkles", sortOrder: 5 },
    { slug: "technologies-numeriques", label: "Technologies Numériques", iconName: "monitor", sortOrder: 6 },
    { slug: "secteurs-et-metiers", label: "Secteurs & Métiers", iconName: "building", sortOrder: 7 },
  ]
  const insertedDomains = await db.insert(domains).values(domainData).returning()
  console.log(`  ✓ ${insertedDomains.length} domains`)
  const domainMap = Object.fromEntries(insertedDomains.map((d) => [d.slug, d.id]))

  // ── Sub-categories ──
  const subCatData: { slug: string; label: string; domainSlug: string; sortOrder: number }[] = [
    // Chiffre
    { slug: "consolidation-ifrs", label: "Consolidation - Normes IFRS", domainSlug: "chiffre", sortOrder: 1 },
    { slug: "gestion-finance", label: "Gestion - Finance", domainSlug: "chiffre", sortOrder: 2 },
    { slug: "comptabilite", label: "Comptabilité", domainSlug: "chiffre", sortOrder: 3 },
    // Gestion RH
    { slug: "droit-social", label: "Droit social", domainSlug: "gestion-rh", sortOrder: 1 },
    { slug: "relations-sociales", label: "Relations sociales", domainSlug: "gestion-rh", sortOrder: 2 },
    { slug: "ressources-humaines", label: "Ressources Humaines", domainSlug: "gestion-rh", sortOrder: 3 },
    { slug: "gestion-formation", label: "Gestion de la formation", domainSlug: "gestion-rh", sortOrder: 4 },
    { slug: "paie", label: "Paie", domainSlug: "gestion-rh", sortOrder: 5 },
    { slug: "cse", label: "CSE", domainSlug: "gestion-rh", sortOrder: 6 },
    // QSE
    { slug: "qualite", label: "Qualité", domainSlug: "qse", sortOrder: 1 },
    { slug: "sante-securite", label: "Santé – Sécurité", domainSlug: "qse", sortOrder: 2 },
    { slug: "environnement", label: "Environnement", domainSlug: "qse", sortOrder: 3 },
    { slug: "qvt", label: "QVT – Qualité de Vie au Travail", domainSlug: "qse", sortOrder: 4 },
    { slug: "rse", label: "RSE – Développement durable", domainSlug: "qse", sortOrder: 5 },
    // Droit
    { slug: "compliance", label: "Compliance, audit et risques", domainSlug: "droit", sortOrder: 1 },
    { slug: "droit-affaires", label: "Droit des affaires", domainSlug: "droit", sortOrder: 2 },
    { slug: "droit-particuliers", label: "Droit des particuliers", domainSlug: "droit", sortOrder: 3 },
    { slug: "droit-fiscal", label: "Droit fiscal", domainSlug: "droit", sortOrder: 4 },
    { slug: "contentieux", label: "Contentieux – Procédures", domainSlug: "droit", sortOrder: 5 },
    { slug: "competences-transverses", label: "Compétences transverses", domainSlug: "droit", sortOrder: 6 },
    { slug: "droit-immobilier", label: "Droit immobilier", domainSlug: "droit", sortOrder: 7 },
    { slug: "urbanisme-construction", label: "Droit de l'urbanisme et de la construction", domainSlug: "droit", sortOrder: 8 },
    // Soft Skills
    { slug: "management", label: "Management", domainSlug: "soft-skills", sortOrder: 1 },
    { slug: "gestion-projet", label: "Gestion de projet", domainSlug: "soft-skills", sortOrder: 2 },
    { slug: "communication", label: "Communication", domainSlug: "soft-skills", sortOrder: 3 },
    { slug: "efficacite-professionnelle", label: "Efficacité professionnelle", domainSlug: "soft-skills", sortOrder: 4 },
    { slug: "developpement-personnel", label: "Développement personnel", domainSlug: "soft-skills", sortOrder: 5 },
    { slug: "relation-client", label: "Relation client – Commercial", domainSlug: "soft-skills", sortOrder: 6 },
    { slug: "pedagogie", label: "Pédagogie – Formation de formateurs", domainSlug: "soft-skills", sortOrder: 7 },
    // Technologies Numériques
    { slug: "bureautique", label: "Bureautique", domainSlug: "technologies-numeriques", sortOrder: 1 },
    { slug: "ia", label: "IA – Intelligence artificielle", domainSlug: "technologies-numeriques", sortOrder: 2 },
    { slug: "ia-secteur-public", label: "IA Secteur public", domainSlug: "technologies-numeriques", sortOrder: 3 },
    { slug: "informatique", label: "Informatique", domainSlug: "technologies-numeriques", sortOrder: 4 },
    { slug: "marketing-digital", label: "Marketing digital", domainSlug: "technologies-numeriques", sortOrder: 5 },
    // Secteurs & Métiers
    { slug: "action-sociale", label: "Action sociale", domainSlug: "secteurs-et-metiers", sortOrder: 1 },
    { slug: "secteur-public", label: "Secteur public", domainSlug: "secteurs-et-metiers", sortOrder: 2 },
    { slug: "marches-publics", label: "Marchés publics", domainSlug: "secteurs-et-metiers", sortOrder: 3 },
    { slug: "services-generaux", label: "Services généraux", domainSlug: "secteurs-et-metiers", sortOrder: 4 },
    { slug: "assistants", label: "Assistant(e)s", domainSlug: "secteurs-et-metiers", sortOrder: 5 },
  ]
  const insertedSubCats = await db.insert(subCategories).values(
    subCatData.map((s) => ({ slug: s.slug, label: s.label, domainId: domainMap[s.domainSlug], sortOrder: s.sortOrder })),
  ).returning()
  console.log(`  ✓ ${insertedSubCats.length} sub-categories`)
  const subCatMap = Object.fromEntries(insertedSubCats.map((s) => [s.slug, s.id]))

  // ── Modalities ──
  const modalityData = [
    { slug: "presentiel", label: "Présentiel" },
    { slug: "distance", label: "À distance" },
    { slug: "captation", label: "Captation" },
    { slug: "blended", label: "Blended learning" },
  ]
  const insertedModalities = await db.insert(modalites).values(modalityData).returning()
  console.log(`  ✓ ${insertedModalities.length} modalities`)
  const modalityMap = Object.fromEntries(insertedModalities.map((m) => [m.slug, m.id]))

  // ── Formations ──
  const formationData: {
    domainSlug: string; subCatSlug: string | null; title: string; slug: string;
    price: string; rating: string; reviewsCount: number; duration: string | null;
    badge: string | null; modalitySlugs: string[]
  }[] = [
    // Chiffre
    { domainSlug: "chiffre", subCatSlug: "consolidation-ifrs", title: "Formation Impôts différés et preuve d'impôt en consolidation", slug: "chiffre-impots-differes", price: "3 155 € HT", rating: "4.8/5", reviewsCount: 74, duration: "3 jours", badge: null, modalitySlugs: ["captation", "presentiel", "distance"] },
    { domainSlug: "chiffre", subCatSlug: "gestion-finance", title: "Formation Finance pour non-financiers (niveau 1)", slug: "chiffre-finance-non-financiers", price: "1 645 € HT", rating: "4.8/5", reviewsCount: 124, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "captation", "distance"] },
    { domainSlug: "chiffre", subCatSlug: "gestion-finance", title: "Formation Liasse fiscale et indicateurs de gestion", slug: "chiffre-liasse-fiscale", price: "2 619 € HT", rating: "4.7/5", reviewsCount: 83, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "captation"] },
    { domainSlug: "chiffre", subCatSlug: "comptabilite", title: "Formation Facturation électronique : mise en œuvre et contraintes fiscales", slug: "chiffre-facturation-electronique", price: "950 € HT", rating: "4.9/5", reviewsCount: 131, duration: "1 jour", badge: "Nouveauté", modalitySlugs: ["captation", "presentiel"] },
    { domainSlug: "chiffre", subCatSlug: "comptabilite", title: "Formation Clôture des comptes annuels (niveau 1)", slug: "chiffre-cloture-comptes", price: "2 065 € HT", rating: "4.9/5", reviewsCount: 46, duration: null, badge: "Nouveauté", modalitySlugs: ["captation", "presentiel"] },
    { domainSlug: "chiffre", subCatSlug: "consolidation-ifrs", title: "Formation Techniques de consolidation en IFRS", slug: "chiffre-consolidation-ifrs", price: "2 845 € HT", rating: "4.8/5", reviewsCount: 66, duration: "3 jours", badge: null, modalitySlugs: [] },
    { domainSlug: "chiffre", subCatSlug: "gestion-finance", title: "Formation Passage du résultat comptable au résultat fiscal", slug: "chiffre-resultat-comptable-fiscal", price: "2 045 € HT", rating: "4.8/5", reviewsCount: 76, duration: "2 jours", badge: null, modalitySlugs: ["distance", "captation", "presentiel"] },
    { domainSlug: "chiffre", subCatSlug: "consolidation-ifrs", title: "Formation Techniques de consolidation en règles françaises", slug: "chiffre-consolidation-francaises", price: "2 869 € HT", rating: "4.8/5", reviewsCount: 55, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "captation"] },
    { domainSlug: "chiffre", subCatSlug: "gestion-finance", title: "Formation Pacte Dutreil : optimiser la transmission", slug: "chiffre-pacte-dutreil", price: "1 190 € HT", rating: "4.6/5", reviewsCount: 38, duration: "1 jour", badge: null, modalitySlugs: ["captation", "presentiel"] },
    // Gestion RH
    { domainSlug: "gestion-rh", subCatSlug: "droit-social", title: "Formation Contrat de travail : sécuriser les relations contractuelles", slug: "rh-contrat-travail", price: "1 890 € HT", rating: "4.7/5", reviewsCount: 58, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "gestion-rh", subCatSlug: "relations-sociales", title: "Formation Piloter les relations sociales", slug: "rh-piloter-relations-sociales", price: "2 490 € HT", rating: "4.6/5", reviewsCount: 42, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "captation"] },
    { domainSlug: "gestion-rh", subCatSlug: "ressources-humaines", title: "Formation HR Business Partner", slug: "rh-hr-business-partner", price: "2 990 € HT", rating: "4.8/5", reviewsCount: 67, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "distance", "blended"] },
    { domainSlug: "gestion-rh", subCatSlug: "gestion-formation", title: "Formation Plan de développement des compétences", slug: "rh-plan-competences", price: "1 690 € HT", rating: "4.5/5", reviewsCount: 34, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "gestion-rh", subCatSlug: "paie", title: "Formation Maîtriser la paie", slug: "rh-maitriser-paie", price: "2 290 € HT", rating: "4.7/5", reviewsCount: 89, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "captation", "distance"] },
    { domainSlug: "gestion-rh", subCatSlug: "cse", title: "Formation Fonctionnement du CSE", slug: "rh-fonctionnement-cse", price: "1 790 € HT", rating: "4.6/5", reviewsCount: 51, duration: "2 jours", badge: "Nouveauté", modalitySlugs: ["presentiel", "distance"] },
    // QSE
    { domainSlug: "qse", subCatSlug: "qualite", title: "Formation Management de la qualité", slug: "qse-management-qualite", price: "1 790 € HT", rating: "4.6/5", reviewsCount: 47, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "qse", subCatSlug: "sante-securite", title: "Formation Prévention des risques professionnels", slug: "qse-prevention-risques", price: "2 290 € HT", rating: "4.7/5", reviewsCount: 63, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "captation", "distance"] },
    { domainSlug: "qse", subCatSlug: "environnement", title: "Formation Gestion environnementale et conformité", slug: "qse-gestion-environnementale", price: "1 690 € HT", rating: "4.5/5", reviewsCount: 29, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "qse", subCatSlug: "qvt", title: "Formation Qualité de vie au travail", slug: "qse-qualite-vie-travail", price: "990 € HT", rating: "4.8/5", reviewsCount: 72, duration: "1 jour", badge: "Nouveauté", modalitySlugs: ["presentiel", "distance", "blended"] },
    { domainSlug: "qse", subCatSlug: "rse", title: "Formation RSE (niveau 1) : maîtriser les fondamentaux – Blended learning", slug: "qse-rse-niveau-1", price: "1 990 € HT", rating: "4.7/5", reviewsCount: 89, duration: "2 jours", badge: "Incontournable", modalitySlugs: ["blended", "presentiel", "distance"] },
    // Droit
    { domainSlug: "droit", subCatSlug: "compliance", title: "Formation Compliance Officer", slug: "droit-compliance-officer", price: "3 490 € HT", rating: "4.8/5", reviewsCount: 93, duration: "4 jours", badge: "Incontournable", modalitySlugs: ["presentiel", "captation", "distance"] },
    { domainSlug: "droit", subCatSlug: "droit-affaires", title: "Formation Initiation en droit des sociétés", slug: "droit-societes", price: "1 890 € HT", rating: "4.6/5", reviewsCount: 56, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "droit", subCatSlug: "droit-particuliers", title: "Formation Droit de la famille et des successions", slug: "droit-famille", price: "1 590 € HT", rating: "4.5/5", reviewsCount: 38, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance", "captation"] },
    { domainSlug: "droit", subCatSlug: "droit-fiscal", title: "Formation Droit fiscal approfondi", slug: "droit-fiscal", price: "2 690 € HT", rating: "4.7/5", reviewsCount: 71, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "captation"] },
    { domainSlug: "droit", subCatSlug: "contentieux", title: "Formation Gestion des contentieux et procédures", slug: "droit-contentieux", price: "1 990 € HT", rating: "4.6/5", reviewsCount: 44, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "droit", subCatSlug: "competences-transverses", title: "Formation Anglais juridique", slug: "droit-anglais-juridique", price: "2 190 € HT", rating: "4.4/5", reviewsCount: 32, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "distance", "blended"] },
    { domainSlug: "droit", subCatSlug: "droit-immobilier", title: "Formation Droit immobilier", slug: "droit-immobilier", price: "1 690 € HT", rating: "4.5/5", reviewsCount: 41, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "droit", subCatSlug: "urbanisme-construction", title: "Formation Droit de l'urbanisme (niveau 1)", slug: "droit-urbanisme", price: "1 790 € HT", rating: "4.5/5", reviewsCount: 27, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance", "captation"] },
    // Soft Skills
    { domainSlug: "soft-skills", subCatSlug: "management", title: "Formation Management d'équipe", slug: "soft-management-equipe", price: "1 690 € HT", rating: "4.7/5", reviewsCount: 103, duration: "2 jours", badge: "Incontournable", modalitySlugs: ["presentiel", "distance", "blended"] },
    { domainSlug: "soft-skills", subCatSlug: "gestion-projet", title: "Formation Pilotage de projet", slug: "soft-pilotage-projet", price: "1 590 € HT", rating: "4.6/5", reviewsCount: 78, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "soft-skills", subCatSlug: "communication", title: "Formation Prise de parole en public", slug: "soft-parole-publique", price: "890 € HT", rating: "4.8/5", reviewsCount: 142, duration: "1 jour", badge: "Nouveauté", modalitySlugs: ["presentiel", "captation", "distance"] },
    { domainSlug: "soft-skills", subCatSlug: "efficacite-professionnelle", title: "Formation Gestion du temps et des priorités", slug: "soft-gestion-temps", price: "790 € HT", rating: "4.5/5", reviewsCount: 95, duration: "1 jour", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "soft-skills", subCatSlug: "developpement-personnel", title: "Formation Intelligence émotionnelle", slug: "soft-intelligence-emotionnelle", price: "890 € HT", rating: "4.6/5", reviewsCount: 67, duration: "1 jour", badge: null, modalitySlugs: ["presentiel", "distance", "blended"] },
    { domainSlug: "soft-skills", subCatSlug: "relation-client", title: "Formation Techniques de vente et négociation", slug: "soft-techniques-vente", price: "1 490 € HT", rating: "4.7/5", reviewsCount: 88, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance", "captation"] },
    { domainSlug: "soft-skills", subCatSlug: "pedagogie", title: "Formation Formation de formateurs", slug: "soft-formation-formateurs", price: "2 190 € HT", rating: "4.6/5", reviewsCount: 54, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "distance", "blended"] },
    // Technologies Numériques
    { domainSlug: "technologies-numeriques", subCatSlug: "bureautique", title: "Formation Excel avancé", slug: "tech-excel-avance", price: "990 € HT", rating: "4.7/5", reviewsCount: 156, duration: "2 jours", badge: "Incontournable", modalitySlugs: ["presentiel", "distance", "captation"] },
    { domainSlug: "technologies-numeriques", subCatSlug: "ia", title: "Formation IA générative : les fondamentaux", slug: "tech-ia-generative", price: "890 € HT", rating: "4.8/5", reviewsCount: 112, duration: "1 jour", badge: "Nouveauté", modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "technologies-numeriques", subCatSlug: "ia-secteur-public", title: "Formation IA pour le secteur public", slug: "tech-ia-secteur-public", price: "890 € HT", rating: "4.5/5", reviewsCount: 34, duration: "1 jour", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "technologies-numeriques", subCatSlug: "informatique", title: "Formation Gestion de projet informatique", slug: "tech-gestion-projet-it", price: "2 190 € HT", rating: "4.6/5", reviewsCount: 73, duration: "3 jours", badge: null, modalitySlugs: ["presentiel", "distance", "blended"] },
    { domainSlug: "technologies-numeriques", subCatSlug: "marketing-digital", title: "Formation Marketing digital", slug: "tech-marketing-digital", price: "1 490 € HT", rating: "4.6/5", reviewsCount: 91, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance", "captation"] },
    // Secteurs & Métiers
    { domainSlug: "secteurs-et-metiers", subCatSlug: "action-sociale", title: "Formation Associations : technique comptable, enjeux juridiques et fiscaux", slug: "secteur-comptabilite-associative", price: "1 390 € HT", rating: "4.5/5", reviewsCount: 38, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "secteurs-et-metiers", subCatSlug: "secteur-public", title: "Formation Management public", slug: "secteur-management-public", price: "1 690 € HT", rating: "4.4/5", reviewsCount: 45, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance", "captation"] },
    { domainSlug: "secteurs-et-metiers", subCatSlug: "marches-publics", title: "Formation Parcours Expert en marchés publics", slug: "secteur-expert-marches-publics", price: "3 290 € HT", rating: "4.7/5", reviewsCount: 61, duration: "4 jours", badge: "Incontournable", modalitySlugs: ["presentiel", "distance", "captation"] },
    { domainSlug: "secteurs-et-metiers", subCatSlug: "services-generaux", title: "Formation Droit des assurances", slug: "secteur-droit-assurances", price: "1 590 € HT", rating: "4.5/5", reviewsCount: 33, duration: "2 jours", badge: null, modalitySlugs: ["presentiel", "distance"] },
    { domainSlug: "secteurs-et-metiers", subCatSlug: "assistants", title: "Formation Organisation et productivité", slug: "secteur-organisation-productivite", price: "790 € HT", rating: "4.6/5", reviewsCount: 82, duration: "1 jour", badge: null, modalitySlugs: ["presentiel", "distance", "captation"] },
  ]

  const insertedFormations = await db.insert(formations).values(
    formationData.map((c) => ({
      domainId: domainMap[c.domainSlug],
      subCategoryId: c.subCatSlug ? subCatMap[c.subCatSlug] : null,
      title: c.title,
      slug: c.slug,
      price: c.price,
      rating: c.rating,
      reviewsCount: c.reviewsCount,
      duration: c.duration,
      badge: c.badge as any ?? null,
    })),
  ).returning()
  console.log(`  ✓ ${insertedFormations.length} formations`)

  // ── Formation-Modality links ──
  const formationModalityPairs: { formationId: number; modalityId: number }[] = []
  for (let i = 0; i < formationData.length; i++) {
    for (const modSlug of formationData[i].modalitySlugs) {
      formationModalityPairs.push({
        formationId: insertedFormations[i].id,
        modalityId: modalityMap[modSlug],
      })
    }
  }
  if (formationModalityPairs.length > 0) {
    await db.insert(formationModalities).values(formationModalityPairs)
  }
  console.log(`  ✓ ${formationModalityPairs.length} formation-modality links`)

  // ── Child courses ──
  const childCourseData = formationData.map((formation, i) => ({
    formationId: insertedFormations[i].id,
    title: `${formation.title} - session principale`,
    slug: `${formation.slug}-session-principale`,
    summary: `Cours principal pour ${formation.title}.`,
    duration: formation.duration,
    modality: formation.modalitySlugs[0] ?? null,
    sortOrder: 1,
  }))
  const insertedCourses = await db.insert(courses).values(childCourseData).returning()
  console.log(`  ✓ ${insertedCourses.length} child courses`)

  // ── Certifications ──
  const certData = [
    { pageSlug: "certifications-amf", title: "Certification AMF", description: "La certification AMF propose des outils pédagogiques performants, adaptés à la compréhension. Avec un parcours 100% digital et ses différentes options, la préparation à l'examen est optimisée pour la réussite.", badge: "NOUVEAU", audience: "Professionnels", href: "#", groupKey: "pro", sortOrder: 1 },
    { pageSlug: "certifications-amf", title: "Certification AMF Finance Durable", description: "Offre un programme pédagogique digital enrichi pour optimiser le succès des professionnels. Axée sur la finance durable.", badge: "NOUVEAU", audience: "Professionnels", href: "#", groupKey: "pro", sortOrder: 2 },
    { pageSlug: "certifications-amf", title: "Certification AMF – English Platform", description: "Provides high-performance teaching tools for professionals and team leaders.", audience: "Professionnels", href: "#", groupKey: "pro", sortOrder: 3 },
    { pageSlug: "certifications-amf", title: "Certification AMF Sustainable Finance", description: "Intended primarily for professionals who need to gather clients' preferences in terms of ESG criteria.", audience: "Professionnels", href: "#", groupKey: "pro", sortOrder: 4 },
    { pageSlug: "certifications-amf", title: "Certification AMF pour les particuliers", description: "Propose des outils pédagogiques numériques performants pour renforcer les connaissances réglementaires et financières.", badge: "NOUVEAU", audience: "Particuliers", href: "#", groupKey: "particuliers", sortOrder: 1 },
    { pageSlug: "certifications-amf", title: "Certification AMF Finance Durable pour les particuliers", description: "Propose un parcours numérique complet et des outils pédagogiques performants.", badge: "NOUVEAU", audience: "Particuliers", href: "#", groupKey: "particuliers", sortOrder: 2 },
    { pageSlug: "certifications-amf", title: "Certification AMF pour les étudiants", description: "Propose des outils pédagogiques solides et un parcours numérique complet.", badge: "NOUVEAU", audience: "Étudiants", href: "#", groupKey: "etudiants", sortOrder: 1 },
    { pageSlug: "certifications-amf", title: "Certification AMF Finance Durable pour les étudiants", description: "Propose un accompagnement pédagogique solide avec des outils numériques.", badge: "NOUVEAU", audience: "Étudiants", href: "#", groupKey: "etudiants", sortOrder: 2 },
    { pageSlug: "certifications-amf", title: "Certification AMF Sustainable Finance (students)", description: "Offers a comprehensive digital preparatory program emphasizing employability.", audience: "Étudiants", href: "#", groupKey: "etudiants", sortOrder: 3 },
  ]
  const insertedCerts = await db.insert(certifications).values(certData).returning()
  console.log(`  ✓ ${insertedCerts.length} certifications`)

  // ── Testimonials ──
  const testimonialData = [
    { quote: "Une formation très complète qui m'a permis de monter en compétences rapidement. Les formateurs sont à l'écoute et les cas pratiques très pertinents.", name: "Sophie", role: "Responsable RH", rating: 5, sortOrder: 1 },
    { quote: "Excellent accompagnement pour la préparation à la certification AMF. La plateforme digitale est intuitive et les ressources pédagogiques de grande qualité.", name: "Thomas", role: "Conseiller financier", rating: 5, sortOrder: 2 },
    { quote: "Formation adaptée à mon rythme de travail. Le blended learning m'a permis de combiner cours en ligne et sessions en présentiel. Je recommande.", name: "Marie", role: "Juriste d'entreprise", rating: 4, sortOrder: 3 },
    { quote: "Une équipe pédagogique réactive et des contenus constamment mis à jour. La formation m'a apporté des outils concrets utilisables au quotidien.", name: "Alexandre", role: "Compliance Officer", rating: 5, sortOrder: 4 },
  ]
  const insertedTestimonials = await db.insert(testimonials).values(testimonialData).returning()
  console.log(`  ✓ ${insertedTestimonials.length} testimonials`)

  // ── Featured courses ──
  const formationByTitle = Object.fromEntries(insertedFormations.map((f) => [f.title, f.id]))
  const featuredTitles = [
    "Formation Finance pour non-financiers (niveau 1)",
    "Formation Facturation électronique : mise en œuvre et contraintes fiscales",
    "Formation RSE (niveau 1) : maîtriser les fondamentaux – Blended learning",
    "Formation Compliance Officer",
  ]
  const featuredData = featuredTitles.map((title, i) => ({
    formationId: formationByTitle[title]!,
    sortOrder: i,
  })).filter((f) => f.formationId)
  if (featuredData.length > 0) {
    await db.insert(featuredFormations).values(featuredData)
  }
  console.log(`  ✓ ${featuredData.length} featured formations`)

  console.log("\nSeed complete!")
}

main().catch((e) => {
  console.error("Seed failed:", e)
  process.exit(1)
})
