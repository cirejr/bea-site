import { getCertifications } from "@/lib/data"
import { deleteCertification } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit02Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import Link from "next/link"

export default async function CertificationsPage() {
  const certs = await getCertifications()

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-muted-foreground">{certs.length} total</p>
        </div>
      </div>

      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Badge</th>
              <th className="px-4 py-3 text-left font-medium">Group</th>
              <th className="px-4 py-3 text-left font-medium">Page</th>
              <th className="px-4 py-3 text-left font-medium">Sort</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((cert) => (
              <tr key={cert.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{cert.title}</td>
                <td className="px-4 py-3">
                  {cert.badge ? (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {cert.badge}
                    </span>
                  ) : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{cert.groupKey ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{cert.pageSlug || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{cert.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteCertification.bind(null, cert.id)}>
                    <Button variant="ghost" size="icon" className="size-8 text-destructive">
                      <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
