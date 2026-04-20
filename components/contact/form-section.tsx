"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export type BeaContactFormSectionProps = Readonly<Record<string, never>>

export function BeaContactFormSection(_props: BeaContactFormSectionProps) {
  const t = useTranslations("contact.form")
  const [serviceInterest, setServiceInterest] = useState<string | null>("")

  return (
    <div className="rounded-[var(--radius-bea)] bg-bea-surface-container-lowest p-10 shadow-sm">
      <h2 className="mb-8 font-bea-headline text-3xl font-bold tracking-tight text-bea-primary">
        {t("title")}
      </h2>
      <form className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-bea-headline text-xs font-bold tracking-wider text-bea-secondary uppercase">
            {t("fields.fullName")}
          </label>
          <Input
            type="text"
            placeholder={t("fields.fullNamePlaceholder")}
            className="w-full rounded-[var(--radius-bea)] border-none bg-bea-surface-container-low px-4 py-3 font-bea-headline text-bea-on-surface placeholder:text-bea-on-surface/50 focus:ring-2 focus:ring-bea-primary/30"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bea-headline text-xs font-bold tracking-wider text-bea-secondary uppercase">
            {t("fields.organization")}
          </label>
          <Input
            type="text"
            placeholder={t("fields.organizationPlaceholder")}
            className="w-full rounded-[var(--radius-bea)] border-none bg-bea-surface-container-low px-4 py-3 font-bea-headline text-bea-on-surface placeholder:text-bea-on-surface/50 focus:ring-2 focus:ring-bea-primary/30"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bea-headline text-xs font-bold tracking-wider text-bea-secondary uppercase">
            {t("fields.email")}
          </label>
          <Input
            type="email"
            placeholder={t("fields.emailPlaceholder")}
            className="w-full rounded-[var(--radius-bea)] border-none bg-bea-surface-container-low px-4 py-3 font-bea-headline text-bea-on-surface placeholder:text-bea-on-surface/50 focus:ring-2 focus:ring-bea-primary/30"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bea-headline text-xs font-bold tracking-wider text-bea-secondary uppercase">
            {t("fields.serviceInterest")}
          </label>
          <Select
            value={serviceInterest}
            onValueChange={setServiceInterest}
          >
            <SelectTrigger className="w-full rounded-[var(--radius-bea)] border-none bg-bea-surface-container-low px-4 py-3 font-bea-headline text-bea-on-surface focus:ring-2 focus:ring-bea-primary/30">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultancy">{t("serviceOptions.consultancy")}</SelectItem>
              <SelectItem value="training">{t("serviceOptions.training")}</SelectItem>
              <SelectItem value="mentoring">{t("serviceOptions.mentoring")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="font-bea-headline text-xs font-bold tracking-wider text-bea-secondary uppercase">
            {t("fields.message")}
          </label>
          <Textarea
            placeholder={t("fields.messagePlaceholder")}
            rows={5}
            className="w-full resize-none rounded-[var(--radius-bea)] border-none bg-bea-surface-container-low px-4 py-3 font-bea-headline text-bea-on-surface placeholder:text-bea-on-surface/50 focus:ring-2 focus:ring-bea-primary/30"
          />
        </div>
        <div className="pt-4 md:col-span-2">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-[var(--radius-bea)] bg-bea-primary py-4 font-bea-headline font-bold text-white transition-all hover:shadow-lg hover:shadow-bea-primary/20"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </div>
  )
}
