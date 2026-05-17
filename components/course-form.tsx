"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createCourse, updateCourse } from "@/lib/actions"
import { useRouter } from "next/navigation"
import type { Domain, Modality, SubCategory, Course } from "@/lib/data"

export function CourseForm({
  domains,
  modalities,
  initialData,
  subCategories: initialSubCategories,
}: {
  domains: Domain[]
  modalities: Modality[]
  initialData?: Course & { modalities?: Modality[] }
  subCategories?: SubCategory[]
}) {
  const router = useRouter()
  const isEdit = !!initialData

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      const data = {
        domainId: Number(formData.get("domainId")),
        subCategoryId: formData.get("subCategoryId") ? Number(formData.get("subCategoryId")) : null,
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        price: (formData.get("price") as string) || null,
        rating: (formData.get("rating") as string) || null,
        reviewsCount: Number(formData.get("reviewsCount")) || 0,
        duration: (formData.get("duration") as string) || null,
        badge: (formData.get("badge") as string) || null,
        href: (formData.get("href") as string) || null,
        description: (formData.get("description") as string) || null,
        modalityIds: formData.getAll("modalityIds").map(Number),
      }

      try {
        if (isEdit) {
          await updateCourse(initialData!.id, { ...data, isActive: formData.get("isActive") === "true" })
        } else {
          await createCourse(data)
        }
        router.push("/dashboard/courses")
        router.refresh()
        return { error: null }
      } catch (e) {
        return { error: (e as Error).message }
      }
    },
    { error: null },
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={initialData?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={initialData?.slug} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="domainId">Domain</Label>
          <Select name="domainId" defaultValue={initialData?.domainId?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((d) => (
                <SelectItem key={d.id} value={d.id.toString()}>{d.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subCategoryId">Sub-category (optional)</Label>
          <Select name="subCategoryId" defaultValue={initialData?.subCategoryId?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              {(initialSubCategories ?? []).map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" defaultValue={initialData?.price ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input id="rating" name="rating" defaultValue={initialData?.rating ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviewsCount">Reviews</Label>
          <Input id="reviewsCount" name="reviewsCount" type="number" defaultValue={initialData?.reviewsCount ?? 0} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input id="duration" name="duration" defaultValue={initialData?.duration ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="badge">Badge</Label>
          <Select name="badge" defaultValue={initialData?.badge ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="Nouveauté">Nouveauté</SelectItem>
              <SelectItem value="Incontournable">Incontournable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Modalities</Label>
        <div className="flex flex-wrap gap-3">
          {modalities.map((m) => (
            <label key={m.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="modalityIds"
                value={m.id}
                defaultChecked={initialData?.modalities?.some((mod) => mod.id === m.id)}
                className="rounded border-input"
              />
              {m.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="href">Link (href)</Label>
        <Input id="href" name="href" defaultValue={initialData?.href ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={initialData?.description ?? ""} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {isEdit ? "Update Course" : "Create Course"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
