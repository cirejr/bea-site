"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createCourse, updateCourse } from "@/lib/actions"
import type { Course, FormationWithRelations } from "@/lib/data"

export function CourseForm({ formations, initialData }: { formations: FormationWithRelations[]; initialData?: Course }) {
  const router = useRouter()
  const isEdit = Boolean(initialData)

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      const data = {
        formationId: Number(formData.get("formationId")),
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        summary: (formData.get("summary") as string) || null,
        duration: (formData.get("duration") as string) || null,
        modality: (formData.get("modality") as string) || null,
        isActive: formData.get("isActive") === "on",
        sortOrder: Number(formData.get("sortOrder")) || 0,
      }

      try {
        if (isEdit) await updateCourse(initialData!.id, data)
        else await createCourse(data)
        router.push("/dashboard/courses")
        router.refresh()
        return { error: null }
      } catch (error) {
        return { error: (error as Error).message }
      }
    },
    { error: null },
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{state.error}</div>}

      <div className="space-y-2">
        <Label>Formation</Label>
        <Select name="formationId" defaultValue={initialData?.formationId?.toString()} required>
          <SelectTrigger><SelectValue placeholder="Sélectionner une formation" /></SelectTrigger>
          <SelectContent>{formations.map((formation) => <SelectItem key={formation.id} value={formation.id.toString()}>{formation.title}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input id="title" name="title" defaultValue={initialData?.title ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={initialData?.slug ?? ""} required />
        </div>
      </div>

      <div className="space-y-2">
          <Label htmlFor="summary">Résumé</Label>
        <Textarea id="summary" name="summary" rows={4} defaultValue={initialData?.summary ?? ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="duration">Durée</Label>
          <Input id="duration" name="duration" defaultValue={initialData?.duration ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modality">Modalité/type</Label>
          <Input id="modality" name="modality" defaultValue={initialData?.modality ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Ordre</Label>
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue={initialData?.sortOrder ?? 0} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm"><Checkbox name="isActive" defaultChecked={initialData?.isActive ?? true} />Actif</label>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{isEdit ? "Mettre à jour" : "Créer"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  )
}
