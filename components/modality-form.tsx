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
import { createModality, updateModality } from "@/lib/actions"
import { slugify } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

interface ModalityFormProps {
  modality?: {
    id: number
    slug: string
    label: string
  } | null
  children?: React.ReactNode
}

export function ModalityForm({ modality, children }: ModalityFormProps) {
  const isEditing = !!modality
  const [slug, setSlug] = React.useState(modality?.slug ?? "")

  const [state, formAction, pending] = useActionState<
    { error: string | null },
    FormData
  >(
    async (_prev, formData) => {
      try {
        const data = {
          label: formData.get("label") as string,
          slug: formData.get("slug") as string,
        }

        if (isEditing) {
          await updateModality(modality.id, data)
        } else {
          await createModality(data)
        }

        return { error: null }
      } catch (error) {
        return { error: (error as Error).message }
      }
    },
    { error: null }
  )

  const [open, onOpenChange] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          children && React.isValidElement(children) ? (
            children
          ) : (
            <Button>
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
              Nouvelle modalité
            </Button>
          )
        }
      />
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier la modalité" : "Nouvelle modalité"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de la modalité ci-dessous."
              : "Ajoutez une nouvelle modalité pour vos formations."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="label">Libellé</Label>
            <Input
              id="label"
              name="label"
              required
              defaultValue={modality?.label ?? ""}
              placeholder="ex: Présentiel"
              onChange={(e) => {
                if (!isEditing) setSlug(slugify(e.target.value))
              }}
            />
          </div>
          <input type="hidden" name="slug" value={slug} />

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
