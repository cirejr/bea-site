"use client"

import { createColumnHelper } from "@tanstack/react-table"

export type DomainRow = {
  id: number
  label: string
  slug: string
  description: string | null
  iconName: string | null
  isActive: boolean
  sortOrder: number
  subCategories: {
    id: number
    slug: string
    label: string
    description: string | null
    isActive: boolean
    sortOrder: number
  }[]
}

const columnHelper = createColumnHelper<DomainRow>()

export const domainColumns = [
  columnHelper.accessor("label", { header: "Label" }),
  columnHelper.accessor("slug", { header: "Slug" }),
  columnHelper.accessor("description", { header: "Description" }),
  columnHelper.accessor("isActive", { header: "Actif" }),
  columnHelper.accessor("sortOrder", { header: "Ordre" }),
]
