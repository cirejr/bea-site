import { getCertifications, getDomains, getFaqs, getFormations, getSubCategories } from "@/lib/data"
import { FaqForm } from "@/components/faq-form"
import { DataTableContent } from "@/components/tables/data-table-content"
import { faqsColumns } from "@/components/tables/columns/faqs"

export default async function FaqsPage() {
  const [faqList, domains, subCategories, formations, certifications] = await Promise.all([
    getFaqs(),
    getDomains(),
    getSubCategories(),
    getFormations({ activeOnly: false }),
    getCertifications(),
  ])

  const data = faqList.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    isActive: faq.isActive,
  }))

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">FAQ</h1>

      <FaqForm
        domains={domains}
        subCategories={subCategories}
        formations={formations}
        certifications={certifications}
      />

      <DataTableContent columns={faqsColumns} data={data} />
    </div>
  )
}
