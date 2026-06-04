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
import { createFaq } from "@/lib/actions"

interface FaqFormProps {
  domains: { id: number; label: string }[]
  subCategories: { id: number; label: string }[]
  formations: { id: number; title: string }[]
  certifications: { id: number; title: string }[]
}

export function FaqForm({
  domains,
  subCategories,
  formations,
  certifications,
}: FaqFormProps) {
  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      function optionalNumber(value: FormDataEntryValue | null) {
        const raw = value?.toString()
        return raw ? Number(raw) : null
      }

      try {
        await createFaq({
          question: formData.get("question") as string,
          answer: formData.get("answer") as string,
          domainId: optionalNumber(formData.get("domainId")),
          subCategoryId: optionalNumber(formData.get("subCategoryId")),
          formationId: optionalNumber(formData.get("formationId")),
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

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="question">Question</Label>
        <Input id="question" name="question" required />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="answer">Réponse</Label>
        <Textarea id="answer" name="answer" required rows={3} />
      </div>

      <Select
        name="domainId"
        items={Object.fromEntries(
          domains.map((item) => [item.id.toString(), item.label])
        )}
      >
        <SelectTrigger><SelectValue placeholder="Domaine" /></SelectTrigger>
        <SelectContent>
          {domains.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        name="subCategoryId"
        items={Object.fromEntries(
          subCategories.map((item) => [item.id.toString(), item.label])
        )}
      >
        <SelectTrigger><SelectValue placeholder="Sous-catégorie" /></SelectTrigger>
        <SelectContent>
          {subCategories.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        name="formationId"
        items={Object.fromEntries(
          formations.map((item) => [item.id.toString(), item.title])
        )}
      >
        <SelectTrigger><SelectValue placeholder="Formation" /></SelectTrigger>
        <SelectContent>
          {formations.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        name="certificationId"
        items={Object.fromEntries(
          certifications.map((item) => [item.id.toString(), item.title])
        )}
      >
        <SelectTrigger><SelectValue placeholder="Certification" /></SelectTrigger>
        <SelectContent>
          {certifications.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input name="sortOrder" type="number" placeholder="Ordre" defaultValue="0" />

      <label className="flex items-center gap-2 text-sm">
        <Checkbox name="isActive" defaultChecked />
        Actif
      </label>

      <Button type="submit" disabled={pending} className="md:justify-self-start">
        Créer une FAQ
      </Button>
    </form>
  )
}
