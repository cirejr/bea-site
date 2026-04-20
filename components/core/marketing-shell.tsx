"use client"

import { BeaFooter } from "./footer"
import { BeaNav } from "./nav"

export type BeaMarketingShellProps = Readonly<{
  children: React.ReactNode
}>

export function BeaMarketingShell({ children }: BeaMarketingShellProps) {
  return (
    <div className="min-h-screen bg-bea-surface font-bea-body text-bea-on-surface antialiased">
      <BeaNav />
      <main className="pt-20">{children}</main>
      <BeaFooter />
    </div>
  )
}
