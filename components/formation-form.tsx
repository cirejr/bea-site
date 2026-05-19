"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createFormation, updateFormation } from "@/lib/actions"
import type { Certification, Domain, Formation, Modality, SubCategory } from "@/lib/data"

export function FormationForm({
  domains,
  subCategories,
  modalities,
  certifications,
  initialData,
  selectedCertificationIds = [],
}: {
  domains: Domain[]
  subCategories: SubCategory[]
  modalities: Modality[]
  certifications: Certification[]
  initialData?: Formation & { modalities?: Modality[] }
  selectedCertificationIds?: number[]
}) {
  const router = useRouter()
  const isEdit = Boolean(initialData)

  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    async (_prev, formData) => {
      const badge = formData.get("badge") as string
      const data = {
        domainId: Number(formData.get("domainId")),
        subCategoryId: formData.get("subCategoryId") && formData.get("subCategoryId") !== "none" ? Number(formData.get("subCategoryId")) : null,
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        summary: (formData.get("summary") as string) || null,
        description: (formData.get("description") as string) || null,
        price: (formData.get("price") as string) || null,
        salePrice: (formData.get("salePrice") as string) || null,
        currency: (formData.get("currency") as string) || "EUR",
        taxLabel: (formData.get("taxLabel") as string) || "HT",
        priceVisible: formData.get("priceVisible") === "on",
        rating: (formData.get("rating") as string) || null,
        reviewsCount: Number(formData.get("reviewsCount")) || 0,
        duration: (formData.get("duration") as string) || null,
        badge: badge && badge !== "none" ? badge : null,
        href: (formData.get("href") as string) || null,
        isActive: formData.get("isActive") === "on",
        sortOrder: Number(formData.get("sortOrder")) || 0,
        modalityIds: formData.getAll("modalityIds").map(Number),
        certificationIds: formData.getAll("certificationIds").map(Number),
      }

      try {
        if (isEdit) await updateFormation(initialData!.id, data)
        else await createFormation(data)
        router.push("/dashboard/formations")
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

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Domain</Label>
          <Select name="domainId" defaultValue={initialData?.domainId?.toString()} required>
            <SelectTrigger><SelectValue placeholder="Sélectionner un domaine" /></SelectTrigger>
            <SelectContent>{domains.map((domain) => <SelectItem key={domain.id} value={domain.id.toString()}>{domain.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Sous-catégorie</Label>
          <Select name="subCategoryId" defaultValue={initialData?.subCategoryId?.toString() ?? "none"}>
            <SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun</SelectItem>
              {subCategories.map((subCategory) => <SelectItem key={subCategory.id} value={subCategory.id.toString()}>{subCategory.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Ordre</Label>
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue={initialData?.sortOrder ?? 0} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="summary">Résumé</Label>
          <Textarea id="summary" name="summary" rows={3} defaultValue={initialData?.summary ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} defaultValue={initialData?.description ?? ""} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="price">Prix</Label>
          <Input id="price" name="price" defaultValue={initialData?.price ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salePrice">Prix soldé</Label>
          <Input id="salePrice" name="salePrice" defaultValue={initialData?.salePrice ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Devise</Label>
          <Input id="currency" name="currency" defaultValue={initialData?.currency ?? "EUR"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxLabel">Mention fiscale</Label>
          <Input id="taxLabel" name="taxLabel" defaultValue={initialData?.taxLabel ?? "HT"} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Note</Label>
          <Input id="rating" name="rating" defaultValue={initialData?.rating ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviewsCount">Avis</Label>
          <Input id="reviewsCount" name="reviewsCount" type="number" defaultValue={initialData?.reviewsCount ?? 0} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Durée par défaut</Label>
          <Input id="duration" name="duration" defaultValue={initialData?.duration ?? ""} />
        </div>
        <div className="space-y-2">
          <Label>Badge</Label>
          <Select name="badge" defaultValue={initialData?.badge ?? "none"}>
            <SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun</SelectItem>
              <SelectItem value="Nouveauté">Nouveauté</SelectItem>
              <SelectItem value="Incontournable">Incontournable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Modalités</Label>
        <div className="flex flex-wrap gap-3">
          {modalities.map((modality) => <label key={modality.id} className="flex items-center gap-2 text-sm"><Checkbox name="modalityIds" value={modality.id.toString()} defaultChecked={initialData?.modalities?.some((item) => item.id === modality.id)} />{modality.label}</label>)}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Certifications</Label>
        <div className="grid gap-2 md:grid-cols-2">
          {certifications.map((certification) => <label key={certification.id} className="flex items-center gap-2 text-sm"><Checkbox name="certificationIds" value={certification.id.toString()} defaultChecked={selectedCertificationIds.includes(certification.id)} />{certification.title}</label>)}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="href">URL externe du programme</Label>
        <Input id="href" name="href" defaultValue={initialData?.href ?? ""} />
      </div>

      <div className="flex flex-wrap gap-5 text-sm">
        <label className="flex items-center gap-2"><Checkbox name="priceVisible" defaultChecked={initialData?.priceVisible ?? true} />Afficher le prix publiquement</label>
        <label className="flex items-center gap-2"><Checkbox name="isActive" defaultChecked={initialData?.isActive ?? true} />Actif</label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{isEdit ? "Mettre à jour" : "Créer"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  )
}
