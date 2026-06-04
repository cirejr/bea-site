"use client"

import { DomainCard } from "@/components/domain-card"
import { DomainForm } from "@/components/domain-form"
import { SearchInput } from "@/components/tables/search-input"
import { domainColumns } from "@/components/tables/columns/domains"
import { TableOptions } from "@/components/tables/table-options"

interface SubCategory {
  id: number
  slug: string
  label: string
  description: string | null
  isActive: boolean
}

interface DomainWithSubs {
  id: number
  slug: string
  label: string
  description: string | null
  isActive: boolean
  subCategories: SubCategory[]
}

export function DomainsPageClient({ domains }: { domains: DomainWithSubs[] }) {
  const table = TableOptions({ columns: domainColumns, data: domains })
  const filteredDomains = table.getRowModel().rows.map((row) => row.original)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Domaines &amp; Sous-catégories</h1>
          <p className="text-muted-foreground">{filteredDomains.length} domaine(s)</p>
        </div>
        <DomainForm />
      </div>

      <SearchInput table={table} />

      <div className="mt-6 space-y-4">
        {filteredDomains.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun domaine ne correspond à votre recherche.</p>
        ) : (
          filteredDomains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))
        )}
      </div>
    </div>
  )
}
