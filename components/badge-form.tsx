"use client"

import * as React from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createBadge, updateBadge } from "@/lib/actions"
import { slugify } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

interface BadgeFormProps {
  badge?: {
    id: number
    name: string
    slug: string
    color: string
  } | null
  children?: React.ReactNode
}

const PRESET_COLORS = [
  "#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
]

export function BadgeForm({ badge, children }: BadgeFormProps) {
  const isEditing = !!badge
  const [slug, setSlug] = React.useState(badge?.slug ?? "")
  const [open, onOpenChange] = React.useState(false)
  const [color, setColor] = React.useState(badge?.color ?? "#3b82f6")

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      try {
        const data = {
          name: formData.get("name") as string,
          slug: formData.get("slug") as string,
          color: formData.get("color") as string,
        }

        if (isEditing) {
          await updateBadge(badge.id, data)
        } else {
          await createBadge(data)
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
                Nouveau badge
              </Button>
            )
        }
      />
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier le badge" : "Nouveau badge"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations du badge ci-dessous."
              : "Ajoutez un nouveau badge pour vos formations."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={badge?.name ?? ""}
              placeholder="ex: Nouveauté"
              onChange={(e) => { if (!isEditing) setSlug(slugify(e.target.value)) }}
            />
          </div>
          <input type="hidden" name="slug" value={slug} />

          <div className="space-y-2">
            <Label>Couleur</Label>
            <input type="hidden" name="color" value={color} />
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setColor(preset)}
                  className={`size-7 rounded-full border-2 transition-all ${
                    color === preset ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Personnalisée :</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-7 cursor-pointer rounded border"
              />
              <span className="text-xs font-mono text-muted-foreground">{color}</span>
            </div>
          </div>

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
