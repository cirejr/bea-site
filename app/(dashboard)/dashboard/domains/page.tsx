import { getDomains, getDomainsWithSubCategories } from "@/lib/data"
import { createDomain, updateDomain, deleteDomain, createSubCategory, updateSubCategory, deleteSubCategory } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit02Icon, Delete01Icon } from "@hugeicons/core-free-icons"

export default async function DomainsPage() {
  const domainList = await getDomainsWithSubCategories()

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Domains &amp; Sub-categories</h1>

      <div className="space-y-6">
        {domainList.map((domain) => (
          <div key={domain.id} className="rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{domain.label}</h2>
                <p className="text-sm text-muted-foreground">/{domain.slug}</p>
              </div>
              <div className="flex gap-1">
                <form action={deleteDomain.bind(null, domain.id)}>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive">
                    <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
                  </Button>
                </form>
              </div>
            </div>
            <div className="space-y-2">
              {domain.subCategories.length === 0 && (
                <p className="text-sm text-muted-foreground">No sub-categories</p>
              )}
              {domain.subCategories.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between rounded bg-muted/30 px-3 py-2">
                  <div>
                    <span className="text-sm font-medium">{sub.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">/{sub.slug}</span>
                  </div>
                  <form action={deleteSubCategory.bind(null, sub.id)}>
                    <Button variant="ghost" size="icon" className="size-7 text-destructive">
                      <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-3" />
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
