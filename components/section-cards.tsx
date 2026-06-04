"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { CourseIcon, GlobeIcon, Certificate01Icon, UserGroupIcon } from "@hugeicons/core-free-icons"

export function SectionCards({ stats }: { stats: { formationCount: number; domainCount: number; testimonialCount: number; certCount: number } }) {
  const items = [
    {
      title: stats.formationCount.toString(),
      description: "Total formations",
      icon: CourseIcon,
      footer: "Programmes actifs",
    },
    {
      title: stats.domainCount.toString(),
      description: "Domaines",
      icon: GlobeIcon,
      footer: "Catégories de formation",
    },
    {
      title: stats.certCount.toString(),
      description: "Certifications",
      icon: Certificate01Icon,
      footer: "AMF & autres certifs",
    },
    {
      title: stats.testimonialCount.toString(),
      description: "Témoignages",
      icon: UserGroupIcon,
      footer: "Avis actifs",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {items.map((item) => (
        <Card key={item.description} className="@container/card">
          <CardHeader>
            <CardDescription>{item.description}</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-5 text-primary" />
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            {item.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
