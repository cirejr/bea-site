import { getCertifications, getDomains, getFormations, getPdfResources, getSubCategories } from "@/lib/data"
import { PdfForm } from "@/components/pdf-form"
import { DataTableContent } from "@/components/tables/data-table-content"
import { pdfsColumns } from "@/components/tables/columns/pdfs"

export default async function PdfsPage() {
  const [resources, domains, subCategories, formations, certifications] = await Promise.all([
    getPdfResources(),
    getDomains(),
    getSubCategories(),
    getFormations({ activeOnly: false }),
    getCertifications(),
  ])

  const data = resources.map((r) => ({
    id: r.id,
    title: r.title,
    url: r.url,
    description: r.description,
    resourceType: r.resourceType,
    isActive: r.isActive,
  }))

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Ressources PDF</h1>

      <PdfForm
        domains={domains}
        subCategories={subCategories}
        formations={formations}
        certifications={certifications}
      />

      <DataTableContent columns={pdfsColumns} data={data} />
    </div>
  )
}
