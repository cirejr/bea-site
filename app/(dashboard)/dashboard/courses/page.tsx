import Link from "next/link"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { getCourses, getFormations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { DataTableContent } from "@/components/tables/data-table-content"
import { coursesColumns } from "@/components/tables/columns/courses"

export default async function CoursesPage() {
  const [courseList, formations] = await Promise.all([
    getCourses(undefined, { activeOnly: false }),
    getFormations({ activeOnly: false }),
  ])
  const formationById = new Map(formations.map((f) => [f.id, f]))

  const data = courseList.map((c) => ({
    id: c.id,
    title: c.title,
    formationTitle: formationById.get(c.formationId)?.title ?? "-",
    duration: c.duration ?? "-",
    modality: c.modality ?? "-",
    isActive: c.isActive,
  }))

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cours</h1>
          <p className="text-muted-foreground">{courseList.length} cours</p>
        </div>
        <Link href="/dashboard/courses/new">
          <Button><HugeiconsIcon icon={Add01Icon} strokeWidth={2} />Nouveau cours</Button>
        </Link>
      </div>

      <DataTableContent columns={coursesColumns} data={data} />
    </div>
  )
}
