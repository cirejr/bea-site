"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createPdfResource } from "@/lib/actions"

interface PdfFormProps {
  domains: { id: number; label: string }[]
  subCategories: { id: number; label: string }[]
  formations: { id: number; title: string }[]
  courses: { id: number; title: string }[]
  certifications: { id: number; title: string }[]
}

export function PdfForm({
  domains,
  subCategories,
  formations,
  courses,
  certifications,
}: PdfFormProps) {
  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      function optionalNumber(value: FormDataEntryValue | null) {
        const raw = value?.toString()
        return raw ? Number(raw) : null
      }

      try {
        await createPdfResource({
          title: formData.get("title") as string,
          description: (formData.get("description") as string) || null,
          url: formData.get("url") as string,
          resourceType: (formData.get("resourceType") as any) || "other",
          domainId: optionalNumber(formData.get("domainId")),
          subCategoryId: optionalNumber(formData.get("subCategoryId")),
          formationId: optionalNumber(formData.get("formationId")),
          courseId: optionalNumber(formData.get("courseId")),
          certificationId: optionalNumber(formData.get("certificationId")),
          sortOrder: Number(formData.get("sortOrder")) || 0,
          isActive: formData.get("isActive") === "on",
        })
        return { error: null }
      } catch (error) {
        return { error: (error as Error).message }
      }
    },
    { error: null },
  )

  return (
    <form action={formAction} className="mb-8 grid gap-4 rounded-lg border p-4 md:grid-cols-2">
      {state?.error && (
        <div className="md:col-span-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input id="title" name="title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input id="url" name="url" required />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={2} />
      </div>

      <Select name="resourceType" defaultValue="other">
        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="other">Autre</SelectItem>
          <SelectItem value="brochure">Brochure</SelectItem>
          <SelectItem value="program">Programme</SelectItem>
          <SelectItem value="guide">Guide</SelectItem>
          <SelectItem value="certificate">Certificat</SelectItem>
        </SelectContent>
      </Select>

      <Input name="sortOrder" type="number" placeholder="Ordre" defaultValue="0" />

      <Select name="domainId">
        <SelectTrigger><SelectValue placeholder="Domaine" /></SelectTrigger>
        <SelectContent>
          {domains.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name="subCategoryId">
        <SelectTrigger><SelectValue placeholder="Sous-catégorie" /></SelectTrigger>
        <SelectContent>
          {subCategories.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name="formationId">
        <SelectTrigger><SelectValue placeholder="Formation" /></SelectTrigger>
        <SelectContent>
          {formations.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name="courseId">
        <SelectTrigger><SelectValue placeholder="Cours" /></SelectTrigger>
        <SelectContent>
          {courses.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name="certificationId">
        <SelectTrigger><SelectValue placeholder="Certification" /></SelectTrigger>
        <SelectContent>
          {certifications.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox name="isActive" defaultChecked />
        Actif
      </label>

      <Button type="submit" disabled={pending} className="md:justify-self-start">
        Créer un PDF
      </Button>
    </form>
  )
}
