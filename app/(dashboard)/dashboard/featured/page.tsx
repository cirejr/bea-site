import { getFeaturedFormations } from "@/lib/data"
import { removeFeaturedFormation } from "@/lib/actions"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon, StarIcon } from "@hugeicons/core-free-icons"

export default async function FeaturedPage() {
  const featured = await getFeaturedFormations()

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Formations à la une</h1>
          <p className="text-muted-foreground">{featured.length} à la une</p>
        </div>
      </div>

      <div className="space-y-3">
        {featured.map((f) => (
          <div key={f.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <HugeiconsIcon icon={StarIcon} strokeWidth={2} className="size-5 text-amber-500" />
              <div>
                <p className="font-medium">{f.formation.title}</p>
                <p className="text-sm text-muted-foreground">
                  {f.formation.domain?.label} — Ordre : {f.sortOrder}
                </p>
              </div>
            </div>
            <DeleteConfirmDialog action={removeFeaturedFormation.bind(null, f.id)} entityLabel="cette formation à la une">
              <Button variant="ghost" size="icon" className="size-8 text-destructive">
                <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
              </Button>
            </DeleteConfirmDialog>
          </div>
        ))}
        {featured.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucune formation à la une pour le moment.</p>
        )}
      </div>
    </div>
  )
}
