import Link from "next/link"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { getFormations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { DataTableContent } from "@/components/tables/data-table-content"
import { formationsColumns } from "@/components/tables/columns/formations"

export default async function FormationsPage() {
  const formationList = await getFormations({ activeOnly: false })

  const data = formationList.map((f) => ({
    id: f.id,
    title: f.title,
    domain: f.domain.label,
    subCategory: f.subCategory?.label ?? "-",
    priceDisplay: f.priceVisible
      ? f.salePrice || f.price || "-"
      : "Masqué",
    badges: (f.badges ?? []).map((b) => ({ id: b.id, name: b.name, color: b.color })),
    isActive: f.isActive,
  }))

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Formations</h1>
          <p className="text-muted-foreground">{formationList.length} formation(s)</p>
        </div>
        <Link href="/dashboard/formations/new">
          <Button><HugeiconsIcon icon={Add01Icon} strokeWidth={2} />Nouvelle formation</Button>
        </Link>
      </div>

      <DataTableContent columns={formationsColumns} data={data} />
    </div>
  )
}
