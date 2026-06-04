"use client"

import { useActionState, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Add01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createFormation, updateFormation } from "@/lib/actions"
import type {
  Badge,
  Certification,
  Domain,
  Formation,
  Modality,
  SubCategory,
} from "@/lib/data"

export function FormationForm({
  domains,
  subCategories,
  modalities,
  certifications,
  badges,
  allFormations,
  initialData,
  selectedCertificationIds = [],
  selectedBadgeIds = [],
  selectedPrereqIds = [],
  selectedRelatedIds = [],
}: {
  domains: Domain[]
  subCategories: SubCategory[]
  modalities: Modality[]
  certifications: Certification[]
  badges: Badge[]
  allFormations: Formation[]
  initialData?: Formation & { modalities?: Modality[] }
  selectedCertificationIds?: number[]
  selectedBadgeIds?: number[]
  selectedPrereqIds?: number[]
  selectedRelatedIds?: number[]
}) {
  const router = useRouter()
  const isEdit = Boolean(initialData)
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [objectifs, setObjectifs] = useState<string[]>(
    () => (initialData?.objectifs as string[]) ?? []
  )
  const [summaryHtml, setSummaryHtml] = useState(initialData?.summary ?? "")
  const [descriptionHtml, setDescriptionHtml] = useState(
    initialData?.description ?? ""
  )
  const [programmesHtml, setProgrammesHtml] = useState(
    initialData?.programmes ?? ""
  )
  const [pourQuiHtml, setPourQuiHtml] = useState(initialData?.pourQui ?? "")
  const [financementHtml, setFinancementHtml] = useState(
    initialData?.financement ?? ""
  )
  const otherFormations = allFormations.filter((f) => f.id !== initialData?.id)
  const [selectedComplementary, setSelectedComplementary] = useState<
    Formation[]
  >(() => otherFormations.filter((f) => selectedPrereqIds.includes(f.id)))
  const [selectedRelated, setSelectedRelated] = useState<Formation[]>(() =>
    otherFormations.filter((f) => selectedRelatedIds.includes(f.id))
  )

  const [state, formAction, pending] = useActionState<
    { error: string | null },
    FormData
  >(
    async (_prev, formData) => {
      const objectifsValues = formData
        .getAll("objectifs")
        .filter(Boolean) as string[]
      const badgeIds = formData.getAll("badgeIds").map(Number)
      const prereqIds = formData.getAll("prereqIds").map(Number)
      const relatedFormationIds = formData
        .getAll("relatedFormationIds")
        .map(Number)
      const data = {
        domainId: Number(formData.get("domainId")),
        subCategoryId:
          formData.get("subCategoryId") &&
          formData.get("subCategoryId") !== "none"
            ? Number(formData.get("subCategoryId"))
            : null,
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        summary: (formData.get("summary") as string) || null,
        description: (formData.get("description") as string) || null,
        objectifs: objectifsValues,
        programmes: (formData.get("programmes") as string) || null,
        pourQui: (formData.get("pourQui") as string) || null,
        financement: (formData.get("financement") as string) || null,
        price: (formData.get("price") as string) || null,
        salePrice: (formData.get("salePrice") as string) || null,
        currency: (formData.get("currency") as string) || "EUR",
        taxLabel: (formData.get("taxLabel") as string) || "HT",
        priceVisible: formData.get("priceVisible") === "on",
        rating: (formData.get("rating") as string) || null,
        reviewsCount: Number(formData.get("reviewsCount")) || 0,
        duration: (formData.get("duration") as string) || null,
        href: (formData.get("href") as string) || null,
        isActive: formData.get("isActive") === "on",
        sortOrder: Number(formData.get("sortOrder")) || 0,
        modalityIds: formData.getAll("modalityIds").map(Number),
        certificationIds: formData.getAll("certificationIds").map(Number),
        badgeIds,
        prereqIds,
        relatedFormationIds,
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
    { error: null }
  )

  return (
    <form action={formAction} className="container mx-auto space-y-6">
      {state?.error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            name="title"
            defaultValue={initialData?.title ?? ""}
            required
            onChange={(e) => {
              if (!isEdit) setSlug(slugify(e.target.value))
            }}
          />
        </div>
        <input type="hidden" name="slug" value={slug} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Domain</Label>
          <Select
            items={Object.fromEntries(
              domains.map((d) => [d.id.toString(), d.label])
            )}
            name="domainId"
            defaultValue={initialData?.domainId?.toString()}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un domaine" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem key={domain.id} value={domain.id.toString()}>
                  {domain.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Sous-catégorie</Label>
          <Select
            name="subCategoryId"
            items={Object.fromEntries([
              ["none", "Aucun"],
              ...subCategories.map((s) => [s.id.toString(), s.label]),
            ])}
            defaultValue={initialData?.subCategoryId?.toString() ?? "none"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Aucun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun</SelectItem>
              {subCategories.map((subCategory) => (
                <SelectItem
                  key={subCategory.id}
                  value={subCategory.id.toString()}
                >
                  {subCategory.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Ordre</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={initialData?.sortOrder ?? 0}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label>Résumé</Label>
          <SimpleEditor
            className="max-w-3xl"
            initialContent={initialData?.summary ?? ""}
            onContentChange={setSummaryHtml}
          />
          <input type="hidden" name="summary" value={summaryHtml} />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <SimpleEditor
            className="max-w-3xl"
            initialContent={initialData?.description ?? ""}
            onContentChange={setDescriptionHtml}
          />
          <input type="hidden" name="description" value={descriptionHtml} />
        </div>
      </div>

      {/* Objectifs */}
      <div className="space-y-2">
        <Label>Objectifs</Label>
        <div className="flex flex-wrap gap-2">
          {objectifs.map((obj, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
            >
              {obj}
              <button
                type="button"
                onClick={() =>
                  setObjectifs((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <HugeiconsIcon
                  icon={Delete01Icon}
                  strokeWidth={2}
                  className="size-3 cursor-pointer"
                />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ajouter un objectif..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                const value = (e.target as HTMLInputElement).value.trim()
                if (value) {
                  setObjectifs((prev) => [...prev, value])
                  ;(e.target as HTMLInputElement).value = ""
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(e) => {
              const input = (
                e.currentTarget as HTMLElement
              ).parentElement?.querySelector<HTMLInputElement>("input")
              if (!input) return
              const value = input.value.trim()
              if (value) {
                setObjectifs((prev) => [...prev, value])
                input.value = ""
                input.focus()
              }
            }}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
        {objectifs.map((obj, i) => (
          <input key={i} type="hidden" name="objectifs" value={obj} />
        ))}
      </div>

      {/* Programmes */}
      <div className="space-y-2">
        <Label>Programme</Label>
        <SimpleEditor
          className="max-w-3xl"
          initialContent={initialData?.programmes ?? ""}
          onContentChange={setProgrammesHtml}
        />
        <input type="hidden" name="programmes" value={programmesHtml} />
      </div>

      {/* Pour qui */}
      <div className="space-y-2">
        <Label>Pour qui ?</Label>
        <SimpleEditor
          className="max-w-3xl"
          initialContent={initialData?.pourQui ?? ""}
          onContentChange={setPourQuiHtml}
        />
        <input type="hidden" name="pourQui" value={pourQuiHtml} />
      </div>

      {/* Financement */}
      <div className="space-y-2">
        <Label>Financement</Label>
        <SimpleEditor
          className="max-w-3xl"
          initialContent={initialData?.financement ?? ""}
          onContentChange={setFinancementHtml}
        />
        <input type="hidden" name="financement" value={financementHtml} />
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="price">Prix</Label>
          <Input
            id="price"
            name="price"
            defaultValue={initialData?.price ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salePrice">Prix soldé</Label>
          <Input
            id="salePrice"
            name="salePrice"
            defaultValue={initialData?.salePrice ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Devise</Label>
          <Input
            id="currency"
            name="currency"
            defaultValue={initialData?.currency ?? "FCFA"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxLabel">Mention fiscale</Label>
          <Input
            id="taxLabel"
            name="taxLabel"
            defaultValue={initialData?.taxLabel ?? "HT"}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="rating">Note</Label>
          <Input
            id="rating"
            name="rating"
            defaultValue={initialData?.rating ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviewsCount">Avis</Label>
          <Input
            id="reviewsCount"
            name="reviewsCount"
            type="number"
            defaultValue={initialData?.reviewsCount ?? 0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Durée par défaut</Label>
          <Input
            id="duration"
            name="duration"
            defaultValue={initialData?.duration ?? ""}
          />
        </div>
      </div>

      {/* Badges (multi-select) */}
      <div className="space-y-2">
        <Label>Badges</Label>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge) => (
            <label key={badge.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                name="badgeIds"
                value={badge.id.toString()}
                defaultChecked={selectedBadgeIds.includes(badge.id)}
              />
              {badge.color ? (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: badge.color + "20",
                    color: badge.color,
                  }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: badge.color }}
                  />
                  {badge.name}
                </span>
              ) : (
                badge.name
              )}
            </label>
          ))}
          {badges.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun badge disponible. Créez-en d&apos;abord dans la section
              Badges.
            </p>
          )}
        </div>
      </div>

      {/* Complementary formations */}
      <div className="space-y-2">
        <Label>Formations complémentaires</Label>
        <FormationCombobox
          formations={otherFormations}
          selected={selectedComplementary}
          onSelectionChange={setSelectedComplementary}
        />
        {selectedComplementary.map((f) => (
          <input
            key={f.id}
            type="hidden"
            name="prereqIds"
            value={f.id.toString()}
          />
        ))}
      </div>

      {/* Related formations */}
      <div className="space-y-2">
        <Label>Formations liées</Label>
        <FormationCombobox
          formations={otherFormations}
          selected={selectedRelated}
          onSelectionChange={setSelectedRelated}
        />
        {selectedRelated.map((f) => (
          <input
            key={f.id}
            type="hidden"
            name="relatedFormationIds"
            value={f.id.toString()}
          />
        ))}
      </div>

      {/* Modalities */}
      <div className="space-y-2">
        <Label>Modalités</Label>
        <div className="flex flex-wrap gap-3">
          {modalities.map((modality) => (
            <label
              key={modality.id}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                name="modalityIds"
                value={modality.id.toString()}
                defaultChecked={initialData?.modalities?.some(
                  (item) => item.id === modality.id
                )}
              />
              {modality.label}
            </label>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-2">
        <Label>Certifications</Label>
        <div className="grid gap-2 md:grid-cols-2">
          {certifications.map((certification) => (
            <label
              key={certification.id}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                name="certificationIds"
                value={certification.id.toString()}
                defaultChecked={selectedCertificationIds.includes(
                  certification.id
                )}
              />
              {certification.title}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="href">URL externe du programme</Label>
        <Input id="href" name="href" defaultValue={initialData?.href ?? ""} />
      </div>

      <div className="flex flex-wrap gap-5 text-sm">
        <label className="flex items-center gap-2">
          <Checkbox
            name="priceVisible"
            defaultChecked={initialData?.priceVisible ?? true}
          />
          Afficher le prix publiquement
        </label>
        <label className="flex items-center gap-2">
          <Checkbox
            name="isActive"
            defaultChecked={initialData?.isActive ?? true}
          />
          Actif
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {isEdit ? "Mettre à jour" : "Créer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  )
}

function FormationCombobox({
  formations,
  selected,
  onSelectionChange,
}: {
  formations: Formation[]
  selected: Formation[]
  onSelectionChange: (items: Formation[]) => void
}) {
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      itemToStringLabel={(f: Formation) => f.title}
      itemToStringValue={(f: Formation) => f.id.toString()}
      items={formations}
      value={selected}
      onValueChange={onSelectionChange}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values: Formation[]) => (
            <>
              {values.map((f) => (
                <ComboboxChip key={f.id}>{f.title}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Aucune formation trouvée.</ComboboxEmpty>
        <ComboboxList>
          {(f: Formation) => (
            <ComboboxItem key={f.id} value={f}>
              {f.title}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
