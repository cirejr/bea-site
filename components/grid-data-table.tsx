"use client"

import * as React from "react"
import { SearchInput } from "@/components/tables/search-input"
import { TableOptions } from "@/components/tables/table-options"
import { flexRender } from "@tanstack/react-table"

interface GridDataTableProps<TData> {
  columns: any
  data: TData[]
  cardView?: boolean
}

export function GridDataTable<TData>({
  columns,
  data,
  cardView,
}: GridDataTableProps<TData>) {
  const table = TableOptions({ columns, data })

  return (
    <div>
      <SearchInput table={table} />
      <div className="space-y-4">
        {table.getRowModel().rows.length > 0 ? (
          cardView ? (
            table.getRowModel().rows.map((row) => (
              <div key={row.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id}>
                      <span className="text-xs text-muted-foreground">
                        {(cell.column.columnDef as any).header ?? cell.column.id}
                      </span>
                      <p>{flexRender(cell.column.columnDef.cell, cell.getContext()) ?? "-"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                {flexRender(row.getVisibleCells()[0]?.column.columnDef.cell, row.getVisibleCells()[0]?.getContext())}
              </React.Fragment>
            ))
          )
        ) : (
          <p className="py-4 text-sm text-muted-foreground">
            Aucun résultat.
          </p>
        )}
      </div>
    </div>
  )
}
