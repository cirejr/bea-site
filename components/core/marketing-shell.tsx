import { BeaFooter } from "./footer"
import { BeaNav } from "./nav"
import { getTrainingNavigation } from "@/lib/data"

export type BeaMarketingShellProps = Readonly<{
  children: React.ReactNode
}>

export async function BeaMarketingShell({ children }: BeaMarketingShellProps) {
  const trainingNavigation = await getTrainingNavigation()

  return (
    <div className="min-h-screen bg-bea-surface font-bea-body text-bea-on-surface antialiased">
      <BeaNav trainingNavigation={trainingNavigation} />
      <main className="pt-20">{children}</main>
      <BeaFooter />
    </div>
  )
}
