"use client"

import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteFaq } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export type FaqRow = {
  id: number
  question: string
  answer: string
  isActive: boolean
}

const columnHelper = createColumnHelper<FaqRow>()

export const faqsColumns = [
  columnHelper.accessor("question", {
    header: "Question",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.question}</p>
        <p className="line-clamp-1 text-muted-foreground">{row.original.answer}</p>
      </div>
    ),
  }),
  columnHelper.accessor("isActive", {
    header: "Actif",
    cell: ({ getValue }) => (getValue() ? "Oui" : "Non"),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DeleteConfirmDialog action={deleteFaq.bind(null, row.original.id)} entityLabel="cette FAQ">
          <Button variant="ghost" className="text-destructive">Supprimer</Button>
        </DeleteConfirmDialog>
      </div>
    ),
  }),
]
