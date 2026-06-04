"use client"

import { createColumnHelper } from "@tanstack/react-table"

export type DomainRow = {
  id: number
  label: string
  slug: string
  description: string | null
  isActive: boolean
  subCategories: {
    id: number
    slug: string
    label: string
    description: string | null
    isActive: boolean
  }[]
}

const columnHelper = createColumnHelper<DomainRow>()

export const domainColumns = [
  columnHelper.accessor("label", { header: "Label" }),
  columnHelper.accessor("slug", { header: "Slug" }),
  columnHelper.accessor("description", { header: "Description" }),
  columnHelper.accessor("isActive", { header: "Actif" }),
  columnHelper.accessor(
    (row) => row.subCategories.map((sc) => sc.label).join(" "),
    { id: "searchText", enableGlobalFilter: true }
  ),
]
