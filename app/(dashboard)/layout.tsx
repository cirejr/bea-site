import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getBadges } from "@/lib/data"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { inter, stackSans } from "@/app/fonts"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  const badges = await getBadges()

  return (
    <html>
      <body>
        <ThemeProvider>
          <SidebarProvider
            className={cn(inter.variable, stackSans.variable, "font-sans")}
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" user={session.user} badges={badges} />
            <SidebarInset>
              <SiteHeader />
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {children}
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
