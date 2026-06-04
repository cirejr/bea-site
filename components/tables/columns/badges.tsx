"use client"

import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteBadge } from "@/lib/actions"
import { BadgeForm } from "@/components/badge-form"
import { Button } from "@/components/ui/button"
import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export type BadgeRow = {
  id: number
  name: string
  slug: string
  color: string
}

const columnHelper = createColumnHelper<BadgeRow>()

export const badgesColumns = [
  columnHelper.accessor("name", {
    header: "Badge",
    cell: ({ row }) => (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={{ backgroundColor: row.original.color + "20", color: row.original.color }}
      >
        <span className="size-1.5 rounded-full" style={{ backgroundColor: row.original.color }} />
        {row.original.name}
      </span>
    ),
  }),
  columnHelper.accessor("slug", { header: "Slug" }),
  columnHelper.accessor("color", {
    header: "Couleur",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center gap-2 text-xs font-mono">
        <span className="size-4 rounded" style={{ backgroundColor: getValue() }} />
        {getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <BadgeForm
          badge={row.original}
        >
          <Button variant="ghost" size="icon" className="size-8">
            <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
          </Button>
        </BadgeForm>
        <DeleteConfirmDialog action={deleteBadge.bind(null, row.original.id)} entityLabel="ce badge">
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </DeleteConfirmDialog>
      </div>
    ),
  }),
]
