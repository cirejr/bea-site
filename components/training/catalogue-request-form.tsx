"use client"

import { useActionState, useId, useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import {
  CATALOGUE_TOPICS,
  ROLE_OPTIONS,
  type CatalogueTopic,
} from "@/lib/data/catalogues"
import { submitCatalogueRequest } from "@/lib/actions"

const initialState = {
  status: "idle" as const,
  message: "",
  fieldErrors: {},
}

type State = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Partial<
    Record<
      "firstName" | "lastName" | "email" | "phone" | "company" | "role" | "roleOther" | "catalogues",
      string
    >
  >
}

type FieldKey = keyof NonNullable<State["fieldErrors"]>

function fieldError(
  fieldErrors: State["fieldErrors"],
  key: FieldKey,
): string | undefined {
  return fieldErrors?.[key]
}

export function CatalogueRequestForm({ locale }: { locale: string }) {
  const t = useTranslations("catalogues.form")
  const tRoles = useTranslations("catalogues.roles")
  const tTopics = useTranslations("catalogues.topic")
  const tFeedback = useTranslations("catalogues.feedback")
  const [state, formAction, pending] = useActionState<State, FormData>(
    submitCatalogueRequest,
    initialState,
  )
  const [role, setRole] = useState<string | null>(null)
  const formId = useId()
  const roleItems = Object.fromEntries(
    ROLE_OPTIONS.map((option) => [option.value, tRoles(option.i18nKey)])
  )

  const showRoleOther = role === "other"
  const isSuccess = state.status === "success"
  const isError = state.status === "error" && !isSuccess

  if (isSuccess) {
    return (
      <section
        id="request"
        className="rounded-2xl border border-bea-primary/30 bg-bea-primary/5 p-8 text-center md:p-12"
      >
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-bea-primary/10">
          <CheckCircle2 className="h-6 w-6 text-bea-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-bea-primary md:text-3xl">
          {tFeedback("successTitle")}
        </h2>
        <p className="mx-auto max-w-xl text-base text-bea-on-surface-variant">
          {tFeedback("successDescription")}
        </p>
      </section>
    )
  }

  return (
    <section
      id="request"
      className="rounded-2xl border border-bea-outline-variant bg-white p-6 md:p-10"
    >
      <header className="mb-8 max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-bea-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-bea-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {t("eyebrow")}
        </div>
        <h2 className="mb-3 text-3xl font-bold text-bea-primary md:text-4xl font-bea-headline tracking-tighter">
          {t("title")}
        </h2>
        <p className="text-base text-bea-on-surface-variant leading-relaxed">
          {t("description")}
        </p>
      </header>

      {isError && state.message === "FORM_ERROR" && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{tFeedback("formError")}</p>
        </div>
      )}

      <form action={formAction} className="grid gap-5 md:grid-cols-2" noValidate={false}>
        <input type="hidden" name="locale" value={locale} />

        <FormField
          id={`${formId}-firstName`}
          name="firstName"
          label={t("fields.firstName")}
          placeholder={t("fields.firstNamePlaceholder")}
          required
          error={fieldError(state.fieldErrors, "firstName")}
          errorLabel={tFeedback("fields.firstName")}
        />

        <FormField
          id={`${formId}-lastName`}
          name="lastName"
          label={t("fields.lastName")}
          placeholder={t("fields.lastNamePlaceholder")}
          required
          error={fieldError(state.fieldErrors, "lastName")}
          errorLabel={tFeedback("fields.lastName")}
        />

        <FormField
          id={`${formId}-email`}
          name="email"
          type="email"
          label={t("fields.email")}
          placeholder={t("fields.emailPlaceholder")}
          required
          error={fieldError(state.fieldErrors, "email")}
          errorLabel={tFeedback("fields.email")}
        />

        <FormField
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          label={t("fields.phone")}
          placeholder={t("fields.phonePlaceholder")}
          error={fieldError(state.fieldErrors, "phone")}
          errorLabel={tFeedback("fields.phone")}
        />

        <FormField
          id={`${formId}-company`}
          name="company"
          label={t("fields.company")}
          placeholder={t("fields.companyPlaceholder")}
          required
          error={fieldError(state.fieldErrors, "company")}
          errorLabel={tFeedback("fields.company")}
        />

        <div className="space-y-2">
          <Label htmlFor={`${formId}-role`}>{t("fields.role")}</Label>
          <Select name="role" items={roleItems} value={role} onValueChange={setRole}>
            <SelectTrigger id={`${formId}-role`} className="w-full">
              <SelectValue placeholder={t("fields.rolePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {tRoles(option.i18nKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.fieldErrors?.role && (
            <p className="text-xs text-destructive">{tFeedback("fields.role")}</p>
          )}
        </div>

        {showRoleOther && (
          <FormField
            id={`${formId}-roleOther`}
            name="roleOther"
            label={t("fields.roleOther")}
            placeholder={t("fields.roleOtherPlaceholder")}
            required
            error={fieldError(state.fieldErrors, "roleOther")}
            errorLabel={tFeedback("fields.roleOther")}
          />
        )}

        <fieldset className="md:col-span-2 space-y-3">
          <legend className="text-sm font-medium leading-none text-foreground">
            {t("fields.catalogues")}
            <span className="ml-1 text-destructive">*</span>
          </legend>
          <p className="text-xs text-muted-foreground">
            {t("fields.cataloguesHelp")}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {CATALOGUE_TOPICS.map((topic: CatalogueTopic) => (
              <CatalogueOption
                key={topic.slug}
                id={`${formId}-${topic.slug}`}
                name="catalogues"
                value={topic.slug}
                label={tTopics(topic.i18nKey)}
              />
            ))}
          </div>
          {state.fieldErrors?.catalogues && (
            <p className="text-xs text-destructive">
              {tFeedback("fields.catalogues")}
            </p>
          )}
        </fieldset>

        <div className="md:col-span-2 flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {t("requiredHint")}
          </p>
          <Button type="submit" disabled={pending} size="lg">
            <Send className="h-4 w-4" />
            {pending ? t("submitting") : t("submit")}
          </Button>
        </div>
      </form>
    </section>
  )
}

function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
  error,
  errorLabel,
}: {
  id: string
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  errorLabel?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="text-xs text-destructive">{errorLabel}</p>}
    </div>
  )
}

function CatalogueOption({
  id,
  name,
  value,
  label,
}: {
  id: string
  name: string
  value: string
  label: string
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-bea-outline-variant bg-white p-3 transition-colors hover:border-bea-primary/40 hover:bg-bea-primary/5 has-[button[data-checked]]:border-bea-primary has-[button[data-checked]]:bg-bea-primary/5"
    >
      <Checkbox id={id} name={name} value={value} className="mt-0.5" />
      <span className="text-sm leading-snug text-bea-on-surface">{label}</span>
    </label>
  )
}
