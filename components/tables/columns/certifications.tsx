"use client"

import { Delete01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteCertification } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export type CertRow = {
  id: number
  title: string
  badge: string | null
  groupKey: string
  pageSlug: string
  sortOrder: number
}

const columnHelper = createColumnHelper<CertRow>()

export const certificationsColumns = [
  columnHelper.accessor("title", { header: "Titre" }),
  columnHelper.accessor("badge", {
    header: "Badge",
    cell: ({ getValue }) =>
      getValue() ? (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {getValue()}
        </span>
      ) : "—",
  }),
  columnHelper.accessor("groupKey", { header: "Groupe" }),
  columnHelper.accessor("pageSlug", { header: "Page" }),
  columnHelper.accessor("sortOrder", { header: "Ordre" }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <form action={deleteCertification.bind(null, row.original.id)}>
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </form>
      </div>
    ),
  }),
]
