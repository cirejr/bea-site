"use client"

import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteModality } from "@/lib/actions"
import { ModalityForm } from "@/components/modality-form"
import { Button } from "@/components/ui/button"
import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export type ModalityRow = {
  id: number
  slug: string
  label: string
}

const columnHelper = createColumnHelper<ModalityRow>()

export const modalitiesColumns = [
  columnHelper.accessor("label", { header: "Libellé" }),
  columnHelper.accessor("slug", { header: "Slug" }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ModalityForm modality={row.original}>
          <Button variant="ghost" size="icon" className="size-8">
            <HugeiconsIcon
              icon={Edit02Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </ModalityForm>
        <DeleteConfirmDialog
          action={deleteModality.bind(null, row.original.id)}
          entityLabel="cette modalité"
        >
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive"
          >
            <HugeiconsIcon
              icon={Delete01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </DeleteConfirmDialog>
      </div>
    ),
  }),
]
