"use client"

import * as React from "react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { DomainCard } from "@/components/domain-card"
import { DomainForm } from "@/components/domain-form"
import { GridDataTable } from "@/components/grid-data-table"
import { domainColumns } from "@/components/tables/columns/domains"

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

export function DomainsPageClient({
  domains,
}: {
  domains: DomainWithSubs[]
}) {
  const [domainFormOpen, setDomainFormOpen] = React.useState(false)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Domaines &amp; Sous-catégories</h1>
          <p className="text-muted-foreground">{domains.length} domaine(s)</p>
        </div>
        <Button onClick={() => setDomainFormOpen(true)}>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          Nouveau domaine
        </Button>
      </div>

      <GridDataTable
        columns={domainColumns}
        data={domains}
        renderCard={(domain) => <DomainCard key={domain.id} domain={domain} />}
      />

      <DomainForm
        open={domainFormOpen}
        onOpenChange={setDomainFormOpen}
      />
    </>
  )
}
