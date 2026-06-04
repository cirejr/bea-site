"use client"

import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteSubCategory } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { SubCategoryForm } from "@/components/sub-category-form"

export type SubCategoryRow = {
  id: number
  label: string
  slug: string
  description: string | null
  isActive: boolean
  sortOrder: number
}

const columnHelper = createColumnHelper<SubCategoryRow>()

export function getSubCategoryColumns(domainId: number) {
  return [
    columnHelper.accessor("label", { header: "Label" }),
    columnHelper.accessor("slug", { header: "Slug" }),
    columnHelper.accessor("isActive", {
      header: "Actif",
      cell: ({ getValue }) => (getValue() ? "Oui" : "Non"),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <SubCategoryForm domainId={domainId} subCategory={row.original}>
            <Button variant="ghost" size="icon" className="size-7">
              <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-3" />
            </Button>
          </SubCategoryForm>
          <DeleteConfirmDialog action={deleteSubCategory.bind(null, row.original.id)} entityLabel="cette sous-catégorie">
            <Button variant="ghost" size="icon" className="size-7 text-destructive">
              <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-3" />
            </Button>
          </DeleteConfirmDialog>
        </div>
      ),
    }),
  ]
}
