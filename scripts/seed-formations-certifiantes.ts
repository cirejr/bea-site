import "dotenv/config"
import { config as loadEnv } from "dotenv"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { eq } from "drizzle-orm"
import { sql } from "drizzle-orm"
import * as schema from "../db/schema"

loadEnv({ path: ".env.local" })
loadEnv({ path: ".env" })

const url = process.env.DATABASE_URL
if (!url) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

const client = neon(url)
const db = drizzle({ client, schema })

const certificates = [
  {
    title: "Certificat en Finance Publique US GAAP",
    description: "Maîtrisez les normes comptables américaines appliquées aux entités publiques et parapubliques.",
    audience: "Directeurs financiers, contrôleurs de gestion, auditeurs",
    groupKey: "finance",
  },
  {
    title: "Certificat en Finance Privée",
    description: "Pilotez l'analyse financière, la structuration et la levée de fonds dans les entreprises privées.",
    audience: "Directeurs financiers, analystes, fondateurs",
    groupKey: "finance",
  },
  {
    title: "Certificat en Marketing Avancé",
    description: "Concevez des stratégies marketing data-driven, du positionnement à l'activation omnicanale.",
    audience: "Directeurs marketing, chefs de produit, growth managers",
    groupKey: "business",
  },
  {
    title: "Certificat en Gestion Commerciale",
    description: "Structurez une force de vente performante, du pipe à la négociation grands comptes.",
    audience: "Directeurs commerciaux, business developers, KAM",
    groupKey: "business",
  },
  {
    title: "Certificat en GRH Avancé",
    description: "Pilotez la fonction RH stratégique : talent, performance, rémunération et transformation.",
    audience: "DRH, RRH, responsables formation",
    groupKey: "rh",
  },
  {
    title: "Certificat en Contrôle de Gestion Avancé",
    description: "Industrialisez le pilotage financier opérationnel : budget, forecast, KPI et reporting.",
    audience: "Contrôleurs de gestion, DAF, FP&A",
    groupKey: "audit",
  },
  {
    title: "Certificat en Audit International",
    description: "Méthodologies d'audit conformes aux standards ISA pour les groupes multi-pays.",
    audience: "Auditeurs internes et externes, risk managers",
    groupKey: "audit",
  },
  {
    title: "Certificat en Audit Interne",
    description: "Construisez une fonction d'audit interne à forte valeur ajoutée : cadre, plans et restitutions.",
    audience: "Auditeurs internes, contrôleurs, risk managers",
    groupKey: "audit",
  },
  {
    title: "Certificat en Entrepreneuriat",
    description: "De l'idéation au scale : business model, financement, gouvernance et croissance.",
    audience: "Fondateurs, intrapreneurs, accompagnateurs",
    groupKey: "business",
  },
  {
    title: "Certificat en Fiscalité de la Paie",
    description: "Sécurisez la paie et ses implications fiscales, sociales et déclaratives.",
    audience: "Responsables paie, DRH, experts-comptables",
    groupKey: "finance",
  },
  {
    title: "Certificat en Fiscalité Générale",
    description: "Appréhendez l'environnement fiscal OHADA et ses implications opérationnelles.",
    audience: "Directeurs financiers, fiscalistes, experts-comptables",
    groupKey: "finance",
  },
  {
    title: "Certificat du Consultant Fiscal",
    description: "Positionnez-vous comme référent fiscal auprès des directions financières et des cabinets.",
    audience: "Consultants, fiscalistes, experts-comptables",
    groupKey: "finance",
  },
]

async function main() {
  console.log("Seeding formations-certifiantes certificates...")

  const existing = await db
    .select()
    .from(schema.certifications)
    .where(eq(schema.certifications.pageSlug, "formations-certifiantes"))

  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing rows — cleaning first`)
    await db
      .delete(schema.certifications)
      .where(eq(schema.certifications.pageSlug, "formations-certifiantes"))
  }

  const rows = certificates.map((c, i) => ({
    pageSlug: "formations-certifiantes",
    title: c.title,
    description: c.description,
    audience: c.audience,
    badge: null,
    href: "/contact",
    groupKey: c.groupKey,
    isActive: true,
    sortOrder: i,
  }))

  const inserted = await db.insert(schema.certifications).values(rows).returning()
  console.log(`Inserted ${inserted.length} certificates`)

  const summary = await db.execute(sql`
    SELECT "groupKey", COUNT(*)::int AS n
    FROM certifications
    WHERE "pageSlug" = 'formations-certifiantes'
    GROUP BY "groupKey"
    ORDER BY "groupKey"
  `)
  console.log("By group:", summary)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
