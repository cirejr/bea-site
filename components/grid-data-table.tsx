"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { TableOptions } from "@/components/tables/table-options"

interface GridDataTableProps<TData> {
  columns: any
  data: TData[]
  renderCard: (item: TData) => React.ReactNode
}

export function GridDataTable<TData>({
  columns,
  data,
  renderCard,
}: GridDataTableProps<TData>) {
  const table = TableOptions({ columns, data })

  return (
    <div>
      <Input
        placeholder="Rechercher un domaine..."
        value={(table.getState().globalFilter as string) ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="mb-6 w-full md:max-w-sm"
      />
      <div className="space-y-6">
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              {renderCard(row.original)}
            </React.Fragment>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucun domaine ne correspond à votre recherche.
          </p>
        )}
      </div>
    </div>
  )
}
