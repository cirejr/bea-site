"use client"

import Link from "next/link"
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
  badge: string | null
  isActive: boolean
}

const columnHelper = createColumnHelper<FormationRow>()

export const formationsColumns = [
  columnHelper.accessor("title", { header: "Titre" }),
  columnHelper.accessor("domain", { header: "Domaine" }),
  columnHelper.accessor("subCategory", { header: "Sous-catégorie" }),
  columnHelper.accessor("priceDisplay", { header: "Prix" }),
  columnHelper.accessor("badge", {
    header: "Badge",
    cell: ({ getValue }) =>
      getValue() ? (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {getValue()}
        </span>
      ) : "-",
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
        <form action={deleteFormation.bind(null, row.original.id)}>
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </form>
      </div>
    ),
  }),
]
