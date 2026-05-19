import { getDomainsWithSubCategories } from "@/lib/data"
import { DomainsPageClient } from "./domains-page-client"

export default async function DomainsPage() {
  const domainList = await getDomainsWithSubCategories()

  return (
    <div className="px-4 lg:px-6">
      <DomainsPageClient domains={domainList} />
    </div>
  )
}
