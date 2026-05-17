import { getFeaturedCourses } from "@/lib/data"
import { removeFeaturedCourse } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon, StarIcon } from "@hugeicons/core-free-icons"

export default async function FeaturedPage() {
  const featured = await getFeaturedCourses()

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Featured Courses</h1>
          <p className="text-muted-foreground">{featured.length} featured</p>
        </div>
      </div>

      <div className="space-y-3">
        {featured.map((f) => (
          <div key={f.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <HugeiconsIcon icon={StarIcon} strokeWidth={2} className="size-5 text-amber-500" />
              <div>
                <p className="font-medium">{f.course.title}</p>
                <p className="text-sm text-muted-foreground">
                  {f.course.domain?.label} — Order: {f.sortOrder}
                </p>
              </div>
            </div>
            <form action={removeFeaturedCourse.bind(null, f.id)}>
              <Button variant="ghost" size="icon" className="size-8 text-destructive">
                <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
              </Button>
            </form>
          </div>
        ))}
        {featured.length === 0 && (
          <p className="text-sm text-muted-foreground">No featured courses yet.</p>
        )}
      </div>
    </div>
  )
}
