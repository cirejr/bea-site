"use client"

import Link from "next/link"
import { Delete01Icon, Edit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteCourse } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export type CourseRow = {
  id: number
  title: string
  formationTitle: string
  duration: string
  modality: string
  isActive: boolean
}

const columnHelper = createColumnHelper<CourseRow>()

export const coursesColumns = [
  columnHelper.accessor("title", { header: "Titre" }),
  columnHelper.accessor("formationTitle", { header: "Formation" }),
  columnHelper.accessor("duration", { header: "Durée" }),
  columnHelper.accessor("modality", { header: "Modalité/type" }),
  columnHelper.accessor("isActive", {
    header: "Actif",
    cell: ({ getValue }) => (getValue() ? "Oui" : "Non"),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <Link href={`/dashboard/courses/${row.original.id}`}>
          <Button variant="ghost" size="icon" className="size-8">
            <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
          </Button>
        </Link>
        <form action={deleteCourse.bind(null, row.original.id)}>
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </form>
      </div>
    ),
  }),
]
