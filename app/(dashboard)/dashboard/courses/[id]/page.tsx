import { notFound } from "next/navigation"
import { getCourseBySlug, getDomains, getModalities, getSubCategories } from "@/lib/data"
import { CourseForm } from "@/components/course-form"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const courseId = Number(id)
  if (isNaN(courseId)) notFound()

  const domains = await getDomains()
  const modalities = await getModalities()
  const coursesList = domains.length > 0
    ? await import("@/lib/data").then(m => m.getCourses())
    : []

  const course = coursesList.find(c => c.id === courseId)
  if (!course) notFound()

  // Load sub-categories for this course's domain
  const subCats = course.domainId ? await getSubCategories(course.domainId) : []

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Course</h1>
      <div className="max-w-2xl">
        <CourseForm
          domains={domains}
          modalities={modalities}
          initialData={course}
          subCategories={subCats}
        />
      </div>
    </div>
  )
}
