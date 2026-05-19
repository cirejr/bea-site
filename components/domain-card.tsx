"use client"

import * as React from "react"
import { flexRender } from "@tanstack/react-table"
import { Delete01Icon, Edit02Icon, Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { deleteDomain } from "@/lib/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableOptions } from "@/components/tables/table-options"
import { getSubCategoryColumns, SubCategoryRow } from "@/components/tables/columns/sub-categories"
import { SubCategoryForm } from "@/components/sub-category-form"
import { DomainForm } from "@/components/domain-form"

interface DomainWithSubs {
  id: number
  slug: string
  label: string
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

export function DomainCard({ domain }: { domain: DomainWithSubs }) {
  const [domainFormOpen, setDomainFormOpen] = React.useState(false)
  const [subFormOpen, setSubFormOpen] = React.useState(false)
  const [editingSub, setEditingSub] = React.useState<SubCategoryRow | null>(null)

  const subRows: SubCategoryRow[] = domain.subCategories.map((s) => ({
    id: s.id,
    label: s.label,
    slug: s.slug,
    isActive: s.isActive,
  }))

  const columns = React.useMemo(() => getSubCategoryColumns((sub) => {
    setEditingSub(sub)
    setSubFormOpen(true)
  }), [])

  const table = TableOptions({ columns, data: subRows })

  return (
    <>
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{domain.label}</h2>
            <p className="text-xs text-muted-foreground">/{domain.slug}</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setDomainFormOpen(true)}
            >
              <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
            </Button>
            <form action={deleteDomain.bind(null, domain.id)}>
              <Button variant="ghost" size="icon" className="size-8 text-destructive">
                <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between gap-2">
          <Input
            placeholder="Rechercher..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="h-8 max-w-60 text-xs"
          />
          <Button size="sm" variant="outline" onClick={() => {
            setEditingSub(null)
            setSubFormOpen(true)
          }}>
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="mr-1 size-3" />
            Sous-catégorie
          </Button>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="text-xs">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-16 text-center text-xs text-muted-foreground">
                  Aucune sous-catégorie
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DomainForm
        open={domainFormOpen}
        onOpenChange={setDomainFormOpen}
        domain={domain}
      />

      <SubCategoryForm
        open={subFormOpen}
        onOpenChange={(open) => {
          setSubFormOpen(open)
          if (!open) setEditingSub(null)
        }}
        domainId={domain.id}
        subCategory={editingSub ? {
          id: editingSub.id,
          slug: editingSub.slug,
          label: editingSub.label,
          description: null,
          isActive: editingSub.isActive,
          sortOrder: 0,
        } : null}
      />
    </>
  )
}
