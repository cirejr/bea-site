"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  GraduationCap,
  GlobeIcon,
  Certificate01Icon,
  UserGroupIcon,
  StarIcon,
  File01Icon,
  HelpCircleIcon as FaqIcon,
  Settings05Icon,
  HelpCircleIcon,
  CommandIcon,
  Tag01Icon,
  MailIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"

const navMain = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
  },
  {
    title: "Formations",
    url: "/dashboard/formations",
    icon: <HugeiconsIcon icon={GraduationCap} strokeWidth={2} />,
  },
  {
    title: "Domaines",
    url: "/dashboard/domains",
    icon: <HugeiconsIcon icon={GlobeIcon} strokeWidth={2} />,
  },
  {
    title: "Certifications",
    url: "/dashboard/certifications",
    icon: <HugeiconsIcon icon={Certificate01Icon} strokeWidth={2} />,
  },
  {
    title: "Badges",
    url: "/dashboard/badges",
    icon: <HugeiconsIcon icon={Tag01Icon} strokeWidth={2} />,
  },
  {
    title: "Demandes de catalogues",
    url: "/dashboard/catalogue-requests",
    icon: <HugeiconsIcon icon={MailIcon} strokeWidth={2} />,
  },
  /*  {
    title: "Témoignages",
    url: "/dashboard/testimonials",
    icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
  },
  {
    title: "PDFs",
    url: "/dashboard/pdfs",
    icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
  },
  {
    title: "FAQ",
    url: "/dashboard/faqs",
    icon: <HugeiconsIcon icon={FaqIcon} strokeWidth={2} />,
  },
  {
    title: "À la une",
    url: "/dashboard/featured",
    icon: <HugeiconsIcon icon={StarIcon} strokeWidth={2} />,
  }, */
]

const navSecondary = [
  {
    title: "Paramètres",
    url: "#",
    icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
  },
  {
    title: "Aide",
    url: "#",
    icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
  },
]

export function AppSidebar({
  user,
  badges,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; image?: string | null; avatar?: string }
  badges: { id: number; name: string; slug: string; color: string }[]
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/dashboard" />}
            >
              <HugeiconsIcon
                icon={CommandIcon}
                strokeWidth={2}
                className="size-5!"
              />
              <span className="text-base font-semibold">BEA Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} badges={badges} />
        {/* <NavSecondary items={navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ ...user, avatar: user.avatar ?? "/avatars/default.svg" }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
