"use client"

import * as React from "react"
import { useActionState } from "react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { createSubCategory, updateSubCategory } from "@/lib/actions"
import { slugify } from "@/lib/utils"

interface SubCategoryFormProps {
  domainId: number
  subCategory?: {
    id: number
    slug: string
    label: string
    description: string | null
    isActive: boolean
  } | null
  children?: React.ReactNode
}

export function SubCategoryForm({
  domainId,
  subCategory,
  children,
}: SubCategoryFormProps) {
  const isEditing = !!subCategory
  const [slug, setSlug] = React.useState(subCategory?.slug ?? "")
  const [open, onOpenChange] = React.useState(false)

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      try {
        const data = {
          domainId,
          slug: formData.get("slug") as string,
          label: formData.get("label") as string,
          description: (formData.get("description") as string) || null,
          isActive: formData.get("isActive") === "on",
        }

        if (isEditing) {
          await updateSubCategory(subCategory.id, {
            slug: data.slug,
            label: data.label,
            description: data.description,
            isActive: data.isActive,
          })
        } else {
          await createSubCategory(data)
        }

        onOpenChange(false)
        return { error: null }
      } catch (error) {
        return { error: (error as Error).message }
      }
    },
    { error: null },
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          children && React.isValidElement(children)
            ? children
            : (
              <Button size="sm" variant="outline">
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="mr-1 size-3" />
                Sous-catégorie
              </Button>
            )
        }
      />
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier la sous-catégorie" : "Nouvelle sous-catégorie"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de la sous-catégorie ci-dessous."
              : "Ajoutez une nouvelle sous-catégorie à ce domaine."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input id="label" name="label" required defaultValue={subCategory?.label ?? ""} placeholder="ex: Frameworks JS" onChange={(e) => { if (!isEditing) setSlug(slugify(e.target.value)) }} />
          </div>
          <input type="hidden" name="slug" value={slug} />

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={subCategory?.description ?? ""} rows={2} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox name="isActive" defaultChecked={subCategory?.isActive ?? true} />
            Actif
          </label>

          <div className="flex justify-end gap-2">
            <DialogClose render={<Button variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {isEditing ? "Enregistrer" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
