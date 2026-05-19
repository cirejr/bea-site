import { CourseForm } from "@/components/course-form"
import { getFormations } from "@/lib/data"

export default async function NewCoursePage() {
  const formations = await getFormations({ activeOnly: false })

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Nouveau cours</h1>
      <div className="max-w-2xl">
        <CourseForm formations={formations} />
      </div>
    </div>
  )
}
