import { getModalities } from "@/lib/data"
import { ModalityForm } from "@/components/modality-form"
import { DataTableContent } from "@/components/tables/data-table-content"
import { modalitiesColumns } from "@/components/tables/columns/modalities"

export default async function ModalitiesPage() {
  const modalityList = await getModalities()

  const data = modalityList.map((modality) => ({
    id: modality.id,
    slug: modality.slug,
    label: modality.label,
  }))

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Modalités</h1>
          <p className="text-muted-foreground">
            {modalityList.length} modalité(s)
          </p>
        </div>
        <ModalityForm />
      </div>

      <DataTableContent columns={modalitiesColumns} data={data} />
    </div>
  )
}
