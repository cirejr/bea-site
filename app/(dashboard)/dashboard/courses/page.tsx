import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCourses, getDomains } from "@/lib/data"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit02Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { deleteCourse } from "@/lib/actions"

export default async function CoursesPage() {
  const courseList = await getCourses()

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">{courseList.length} total courses</p>
        </div>
        <Link href="/dashboard/courses/new">
          <Button>
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
            New Course
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Domain</th>
              <th className="px-4 py-3 text-left font-medium">Sub-category</th>
              <th className="px-4 py-3 text-left font-medium">Badge</th>
              <th className="px-4 py-3 text-left font-medium">Active</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseList.map((course) => (
              <tr key={course.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{course.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{course.domain.label}</td>
                <td className="px-4 py-3 text-muted-foreground">{course.subCategory?.label ?? "—"}</td>
                <td className="px-4 py-3">
                  {course.badge ? (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {course.badge}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">{course.isActive ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <Button variant="ghost" size="icon" className="size-8">
                        <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
                      </Button>
                    </Link>
                    <form action={deleteCourse.bind(null, course.id)}>
                      <Button variant="ghost" size="icon" className="size-8 text-destructive">
                        <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
