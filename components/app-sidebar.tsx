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
  Settings05Icon,
  HelpCircleIcon,
  CommandIcon,
} from "@hugeicons/core-free-icons"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: <HugeiconsIcon icon={GraduationCap} strokeWidth={2} />,
  },
  {
    title: "Domains",
    url: "/dashboard/domains",
    icon: <HugeiconsIcon icon={GlobeIcon} strokeWidth={2} />,
  },
  {
    title: "Certifications",
    url: "/dashboard/certifications",
    icon: <HugeiconsIcon icon={Certificate01Icon} strokeWidth={2} />,
  },
  {
    title: "Testimonials",
    url: "/dashboard/testimonials",
    icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
  },
  {
    title: "Featured",
    url: "/dashboard/featured",
    icon: <HugeiconsIcon icon={StarIcon} strokeWidth={2} />,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
  },
  {
    title: "Get Help",
    url: "#",
    icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
  },
]

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; image?: string | null; avatar?: string }
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-5!" />
              <span className="text-base font-semibold">BEA Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ ...user, avatar: user.avatar ?? "/avatars/default.jpg" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
