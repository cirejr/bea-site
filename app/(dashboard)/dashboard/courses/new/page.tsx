import { getDomains, getModalities, getSubCategories } from "@/lib/data"
import { CourseForm } from "@/components/course-form"

export default async function NewCoursePage() {
  const [allDomains, allModalities] = await Promise.all([
    getDomains(),
    getModalities(),
  ])

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">New Course</h1>
      <div className="max-w-2xl">
        <CourseForm domains={allDomains} modalities={allModalities} />
      </div>
    </div>
  )
}
