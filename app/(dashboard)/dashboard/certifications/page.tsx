import { getCertifications } from "@/lib/data"
import { DataTableContent } from "@/components/tables/data-table-content"
import { certificationsColumns } from "@/components/tables/columns/certifications"

export default async function CertificationsPage() {
  const certs = await getCertifications()

  const data = certs.map((c) => ({
    id: c.id,
    title: c.title,
    badge: c.badge,
    groupKey: c.groupKey ?? "—",
    pageSlug: c.pageSlug || "—",
    sortOrder: c.sortOrder,
  }))

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-muted-foreground">{certs.length} au total</p>
        </div>
      </div>

      <DataTableContent columns={certificationsColumns} data={data} />
    </div>
  )
}
