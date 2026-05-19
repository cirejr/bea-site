"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const email = (new FormData(form)).get("email") as string
    const password = (new FormData(form)).get("password") as string

    const { error: authError } = await authClient.signIn.email({ email, password })
    if (authError) {
      setError(authError.message || "Email ou mot de passe invalide")
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Connexion à votre compte</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Saisissez votre email ci-dessous pour vous connecter
          </p>
        </div>
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="admin@bea.fr" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
