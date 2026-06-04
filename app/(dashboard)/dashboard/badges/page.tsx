import { getBadges } from "@/lib/data"
import { BadgeForm } from "@/components/badge-form"
import { DataTableContent } from "@/components/tables/data-table-content"
import { badgesColumns } from "@/components/tables/columns/badges"

export default async function BadgesPage() {
  const badgeList = await getBadges()

  const data = badgeList.map((badge) => ({
    id: badge.id,
    name: badge.name,
    slug: badge.slug,
    color: badge.color,
  }))

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Badges</h1>
          <p className="text-muted-foreground">{badgeList.length} badge(s)</p>
        </div>
        <BadgeForm />
      </div>

      <DataTableContent columns={badgesColumns} data={data} />
    </div>
  )
}
