"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SubCategoryForm } from "@/components/sub-category-form"
import { DomainForm } from "@/components/domain-form"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Delete01Icon, Edit02Icon, Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { deleteDomain } from "@/lib/actions"
import { deleteSubCategory } from "@/lib/actions"

interface SubCategory {
  id: number
  slug: string
  label: string
  description: string | null
  isActive: boolean
}

interface DomainWithSubs {
  id: number
  slug: string
  label: string
  description: string | null
  isActive: boolean
  subCategories: SubCategory[]
}

export function DomainCard({ domain }: { domain: DomainWithSubs }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return domain.subCategories
    return domain.subCategories.filter(
      (s) => s.label.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
    )
  }, [domain.subCategories, search])

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </Button>
          <div>
            <h2 className="text-lg font-semibold">{domain.label}</h2>
            <p className="text-xs text-muted-foreground">/{domain.slug}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <DomainForm domain={domain}>
            <Button variant="ghost" size="icon" className="size-8">
              <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
            </Button>
          </DomainForm>
            <DeleteConfirmDialog action={deleteDomain.bind(null, domain.id)} entityLabel="ce domaine" entityDescription={domain.label}>
              <Button variant="ghost" size="icon" className="size-8 text-destructive">
                <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
              </Button>
            </DeleteConfirmDialog>
        </div>
      </div>

      {open && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 max-w-60 text-xs"
            />
            <SubCategoryForm domainId={domain.id} />
          </div>

          {filtered.length === 0 ? (
            <p className="py-2 text-sm text-muted-foreground">Aucune sous-catégorie.</p>
          ) : (
            <div className="space-y-1">
              {filtered.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-xs text-muted-foreground">/{s.slug}</span>
                    {!s.isActive && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                        Inactif
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <SubCategoryForm domainId={domain.id} subCategory={s}>
                      <Button variant="ghost" size="icon" className="size-7">
                        <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-3.5" />
                      </Button>
                    </SubCategoryForm>
                    <DeleteConfirmDialog action={deleteSubCategory.bind(null, s.id)} entityLabel="cette sous-catégorie" entityDescription={s.label}>
                      <Button variant="ghost" size="icon" className="size-7 text-destructive">
                        <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-3.5" />
                      </Button>
                    </DeleteConfirmDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
