import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getDashboardStats, getCourses, getDomains } from "@/lib/data"
import { SectionCards } from "@/components/section-cards"
import { DataTable } from "@/components/data-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  const stats = await getDashboardStats()
  const courseList = await getCourses()
  const allDomains = await getDomains()

  const tableData = courseList.map((c) => ({
    id: c.id,
    title: c.title,
    domain: c.domain?.label ?? "",
    subCategory: c.subCategory?.label ?? "",
    badge: c.badge ?? "",
    isActive: c.isActive,
    duration: c.duration ?? "",
    slug: c.slug,
  }))

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}
          </p>
        </div>
        <Link href="/dashboard/courses/new">
          <Button>
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
            New Course
          </Button>
        </Link>
      </div>

      <SectionCards stats={stats} />

      <div className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Recent Courses</h2>
        <div className="grid gap-3">
          {courseList.slice(0, 5).map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-muted-foreground">
                  {course.domain?.label}
                  {course.subCategory ? ` — ${course.subCategory.label}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {course.badge && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {course.badge}
                  </span>
                )}
                <Link
                  href={`/dashboard/courses/${course.id}`}
                  className="text-sm text-muted-foreground underline hover:text-foreground"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Domains</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {allDomains.map((d) => (
            <div key={d.id} className="rounded-lg border p-3 text-center">
              <p className="font-medium">{d.label}</p>
              <p className="text-xs text-muted-foreground">
                /training/{d.slug}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
