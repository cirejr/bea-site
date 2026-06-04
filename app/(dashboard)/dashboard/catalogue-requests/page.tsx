import { getTranslations, setRequestLocale } from "next-intl/server"
import { Mail, Inbox } from "lucide-react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getCatalogueRequests, type CatalogueRequest } from "@/lib/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  CATALOGUE_TOPICS,
  ROLE_OPTIONS,
  type CatalogueTopic,
  type RoleOption,
} from "@/lib/data/catalogues"

type Props = { params: Promise<{ locale: string }> }

const topicLabels: Record<string, string> = CATALOGUE_TOPICS.reduce(
  (acc, topic) => {
    acc[topic.slug] = topic.i18nKey
    return acc
  },
  {} as Record<string, string>,
)

const roleLabels: Record<string, string> = ROLE_OPTIONS.reduce(
  (acc, role) => {
    acc[role.value] = role.i18nKey
    return acc
  },
  {} as Record<string, string>,
)

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default async function CatalogueRequestsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  const [t, tRoles, tTopics] = await Promise.all([
    getTranslations("dashboard.catalogueRequests"),
    getTranslations("catalogues.roles"),
    getTranslations("catalogues.topic"),
  ])

  const requests: CatalogueRequest[] = await getCatalogueRequests()

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="h-5 w-5 text-bea-primary" />
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("count", { count: requests.length })}
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-bea-outline-variant bg-white p-10 text-center">
          <Inbox className="mx-auto mb-3 h-8 w-8 text-bea-on-surface-variant" />
          <p className="text-sm text-bea-on-surface-variant">{t("empty")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>{t("columns.createdAt")}</TableHead>
                <TableHead>{t("columns.fullName")}</TableHead>
                <TableHead>{t("columns.company")}</TableHead>
                <TableHead>{t("columns.email")}</TableHead>
                <TableHead>{t("columns.phone")}</TableHead>
                <TableHead>{t("columns.role")}</TableHead>
                <TableHead>{t("columns.catalogues")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const roleKey = roleLabels[request.role]
                const roleLabel = roleKey
                  ? tRoles(roleKey as RoleOption["i18nKey"])
                  : request.role
                return (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDate(request.createdAt)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {request.firstName} {request.lastName}
                    </TableCell>
                    <TableCell>{request.company}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${request.email}`}
                        className="text-bea-primary hover:underline"
                      >
                        {request.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-xs">
                      {request.phone ? (
                        <a
                          href={`tel:${request.phone.replace(/\s/g, "")}`}
                          className="hover:underline"
                        >
                          {request.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{roleLabel}</span>
                      {request.role === "other" && request.roleOther && (
                        <span className="block text-xs text-muted-foreground">
                          {request.roleOther}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex max-w-md flex-wrap gap-1">
                        {request.catalogueSlugs.map((slug) => {
                          const topicKey = topicLabels[slug]
                          const label = topicKey
                            ? tTopics(topicKey as CatalogueTopic["i18nKey"])
                            : slug
                          return (
                            <Badge
                              key={slug}
                              variant="secondary"
                              className="font-normal"
                            >
                              {label}
                            </Badge>
                          )
                        })}
                        {request.catalogueSlugs.length === 0 && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
