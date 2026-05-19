"use client"

import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteSubCategory } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export type SubCategoryRow = {
  id: number
  label: string
  slug: string
  isActive: boolean
}

const columnHelper = createColumnHelper<SubCategoryRow>()

export function getSubCategoryColumns(onEdit: (sub: SubCategoryRow) => void) {
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
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => onEdit(row.original)}
          >
            <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-3" />
          </Button>
          <form action={deleteSubCategory.bind(null, row.original.id)}>
            <Button variant="ghost" size="icon" className="size-7 text-destructive">
              <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-3" />
            </Button>
          </form>
        </div>
      ),
    }),
  ]
}
