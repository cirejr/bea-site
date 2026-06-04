"use client"

import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createColumnHelper } from "@tanstack/react-table"
import { deletePdfResource } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export type PdfRow = {
  id: number
  title: string
  url: string
  description: string | null
  resourceType: string
  isActive: boolean
}

const columnHelper = createColumnHelper<PdfRow>()

export const pdfsColumns = [
  columnHelper.accessor("title", {
    header: "Titre",
    cell: ({ row }) => (
      <div>
        <a href={row.original.url} className="font-medium underline">{row.original.title}</a>
        {row.original.description && (
          <p className="line-clamp-1 text-muted-foreground">{row.original.description}</p>
        )}
      </div>
    ),
  }),
  columnHelper.accessor("resourceType", { header: "Type" }),
  columnHelper.accessor("isActive", {
    header: "Actif",
    cell: ({ getValue }) => (getValue() ? "Oui" : "Non"),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DeleteConfirmDialog action={deletePdfResource.bind(null, row.original.id)} entityLabel="cette ressource PDF">
          <Button variant="ghost" className="text-destructive">Supprimer</Button>
        </DeleteConfirmDialog>
      </div>
    ),
  }),
]
