import { notFound } from "next/navigation"
import { CourseForm } from "@/components/course-form"
import { getCourse, getFormations } from "@/lib/data"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const courseId = Number(id)
  if (Number.isNaN(courseId)) notFound()

  const [course, formations] = await Promise.all([getCourse(courseId), getFormations({ activeOnly: false })])
  if (!course) notFound()

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Modifier le cours</h1>
      <div className="max-w-2xl">
        <CourseForm formations={formations} initialData={course} />
      </div>
    </div>
  )
}
