"use client"

import * as React from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createDomain, updateDomain } from "@/lib/actions"
import { slugify } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

interface DomainFormProps {
  domain?: {
    id: number
    slug: string
    label: string
    description: string | null
    isActive: boolean
  } | null
  children?: React.ReactNode
}

export function DomainForm({ domain, children }: DomainFormProps) {
  const isEditing = !!domain
  const [slug, setSlug] = React.useState(domain?.slug ?? "")
  const [open, onOpenChange] = React.useState(false)

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      try {
        const data = {
          slug: formData.get("slug") as string,
          label: formData.get("label") as string,
          description: (formData.get("description") as string) || null,
          isActive: formData.get("isActive") === "on",
        }

        if (isEditing) {
          await updateDomain(domain.id, data)
        } else {
          await createDomain(data)
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
              <Button>
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                Nouveau domaine
              </Button>
            )
        }
      />
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier le domaine" : "Nouveau domaine"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations du domaine ci-dessous."
              : "Ajoutez un nouveau domaine à l'offre de formation."}
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
            <Input
              id="label"
              name="label"
              required
              defaultValue={domain?.label ?? ""}
              placeholder="ex: Développement Web"
              onChange={(e) => { if (!isEditing) setSlug(slugify(e.target.value)) }}
            />
          </div>
          <input type="hidden" name="slug" value={slug} />

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={domain?.description ?? ""}
              rows={2}
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              name="isActive"
              defaultChecked={domain?.isActive ?? true}
            />
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
