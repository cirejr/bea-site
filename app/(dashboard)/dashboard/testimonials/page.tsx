import { getTestimonials } from "@/lib/data"
import { deleteTestimonial } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon } from "@hugeicons/core-free-icons"

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">{testimonials.length} active</p>
        </div>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-lg border p-4">
            <div className="mb-1 flex items-start justify-between">
              <div>
                <p className="font-medium">{t.name}</p>
                {t.role && <p className="text-sm text-muted-foreground">{t.role}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">{'★'.repeat(t.rating ?? 5)}</span>
                <form action={deleteTestimonial.bind(null, t.id)}>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive">
                    <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
                  </Button>
                </form>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  )
}
