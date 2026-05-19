"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createDomain, updateDomain } from "@/lib/actions"

interface DomainFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  domain?: {
    id: number
    slug: string
    label: string
    description: string | null
    iconName: string | null
    isActive: boolean
    sortOrder: number
  } | null
}

export function DomainForm({ open, onOpenChange, domain }: DomainFormProps) {
  const isEditing = !!domain

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      try {
        const data = {
          slug: formData.get("slug") as string,
          label: formData.get("label") as string,
          description: (formData.get("description") as string) || null,
          iconName: (formData.get("iconName") as string) || null,
          isActive: formData.get("isActive") === "on",
          sortOrder: Number(formData.get("sortOrder")) || 0,
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

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  React.useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", handler)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handler)
    }
  }, [open, onOpenChange])

  if (!mounted) return null

  return createPortal(
    open ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" onClick={() => onOpenChange(false)} />
        <div className="relative z-50 w-full max-w-lg rounded-xl border bg-popover p-6 text-sm text-popover-foreground shadow-xl">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-md bg-secondary text-muted-foreground hover:bg-secondary/80"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Fermer</span>
          </button>

          <h2 className="mb-1 text-base font-medium text-foreground">
            {isEditing ? "Modifier le domaine" : "Nouveau domaine"}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {isEditing
              ? "Modifiez les informations du domaine ci-dessous."
              : "Ajoutez un nouveau domaine à l'offre de formation."}
          </p>

          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" required defaultValue={domain?.slug ?? ""} placeholder="ex: developpement-web" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input id="label" name="label" required defaultValue={domain?.label ?? ""} placeholder="ex: Développement Web" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={domain?.description ?? ""} rows={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iconName">Nom de l'icône</Label>
              <Input id="iconName" name="iconName" defaultValue={domain?.iconName ?? ""} placeholder="ex: code-icon" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder">Ordre d'affichage</Label>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={domain?.sortOrder ?? 0} />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox name="isActive" defaultChecked={domain?.isActive ?? true} />
              Actif
            </label>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                {isEditing ? "Enregistrer" : "Créer"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    ) : null,
    document.body
  )
}
