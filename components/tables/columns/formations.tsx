"use client"

import Link from "next/link"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteFormation } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export type FormationRow = {
  id: number
  title: string
  domain: string
  subCategory: string
  priceDisplay: string
  badges: { id: number; name: string; color: string }[]
  isActive: boolean
}

const columnHelper = createColumnHelper<FormationRow>()

export const formationsColumns = [
  columnHelper.accessor("title", { header: "Titre" }),
  columnHelper.accessor("domain", { header: "Domaine" }),
  columnHelper.accessor("subCategory", { header: "Sous-catégorie" }),
  columnHelper.accessor("priceDisplay", { header: "Prix" }),
  columnHelper.accessor("badges", {
    header: "Badges",
    cell: ({ row }) => {
      const badges = row.original.badges ?? []
      return badges.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {badges.map((badge) => (
            <span
              key={badge.id}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: badge.color + "20", color: badge.color }}
            >
              {badge.name}
            </span>
          ))}
        </div>
      ) : "-"
    },
  }),
  columnHelper.accessor("isActive", {
    header: "Actif",
    cell: ({ getValue }) => (getValue() ? "Oui" : "Non"),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <Link href={`/dashboard/formations/${row.original.id}`}>
          <Button variant="ghost" size="icon" className="size-8">
            <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
          </Button>
        </Link>
        <DeleteConfirmDialog action={deleteFormation.bind(null, row.original.id)} entityLabel="cette formation" entityDescription={row.original.title}>
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </DeleteConfirmDialog>
      </div>
    ),
  }),
]
