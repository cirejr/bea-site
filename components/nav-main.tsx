"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignCircleIcon,
  Mail01Icon,
  GraduationCap,
  GlobeIcon,
  Certificate01Icon,
  Tag01Icon,
  UserCircle02Icon,
  Notification03Icon,
} from "@hugeicons/core-free-icons"

const initialNotifications = [
  {
    id: 1,
    type: "user",
    title: "Nouvelle inscription",
    description:
      "Marie Dupont s'est inscrite à la formation Développement Web.",
    time: "Il y a 10 min",
    unread: true,
  },
  {
    id: 2,
    type: "check",
    title: "Formation publiée",
    description:
      "La formation 'React Avancé' a été approuvée et est en ligne.",
    time: "Il y a 1h",
    unread: true,
  },
  {
    id: 3,
    type: "certificate",
    title: "Certificat délivré",
    description:
      "Le certificat de Jean Martin pour 'Node.js' a été émis.",
    time: "Il y a 3h",
    unread: false,
  },
  {
    id: 4,
    type: "message",
    title: "Nouveau témoignage",
    description: "Sophie Lefebvre a laissé un avis 5 étoiles.",
    time: "Il y a 1 jour",
    unread: false,
  },
]

const typeIcons: Record<string, typeof UserCircle02Icon> = {
  user: UserCircle02Icon,
  check: Notification03Icon,
  certificate: Certificate01Icon,
  message: Mail01Icon,
}

export function NavMain({
  items,
  badges,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
  badges: { id: number; name: string; slug: string; color: string }[]
}) {
  const router = useRouter()
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    tooltip="Quick Create"
                    className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                  >
                    <HugeiconsIcon
                      icon={PlusSignCircleIcon}
                      strokeWidth={2}
                    />
                    <span>Quick Create</span>
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/formations")}
                  >
                    <HugeiconsIcon
                      icon={GraduationCap}
                      strokeWidth={2}
                    />
                    Nouvelle formation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/domains")}
                  >
                    <HugeiconsIcon icon={GlobeIcon} strokeWidth={2} />
                    Nouveau domaine
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/certifications")}
                  >
                    <HugeiconsIcon
                      icon={Certificate01Icon}
                      strokeWidth={2}
                    />
                    Nouveau certificat
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Accès Rapide
                </div>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push(`/fr/formations/certifications-amf`)}
                  >
                    <HugeiconsIcon icon={Certificate01Icon} strokeWidth={2} />
                    Certifications AMF
                  </DropdownMenuItem>
                  {badges.map((badge) => (
                    <DropdownMenuItem
                      key={badge.id}
                      onClick={() => router.push(`/fr/formations/${badge.slug}`)}
                    >
                      <span
                        className="mr-2 size-2 rounded-full shrink-0"
                        style={{ backgroundColor: badge.color }}
                      />
                      {badge.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    size="icon"
                    variant="outline"
                    className="relative size-8 group-data-[collapsible=icon]:opacity-0"
                  >
                    <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex size-4 min-w-4 items-center justify-center rounded-full bg-destructive px-0.5 text-[10px] font-medium leading-none text-destructive-foreground">
                        {unreadCount}
                      </span>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuGroup>
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-sm font-medium">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Tout marquer lu
                      </button>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map((n) => {
                      const Icon = typeIcons[n.type]
                      return (
                        <DropdownMenuItem
                          key={n.id}
                          className="flex items-start gap-3 py-2"
                        >
                          <HugeiconsIcon
                            icon={Icon}
                            strokeWidth={2}
                            className={`mt-0.5 size-4 shrink-0 ${n.unread ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span
                                className={`truncate text-sm ${n.unread ? "font-medium" : ""}`}
                              >
                                {n.title}
                              </span>
                              {n.unread && (
                                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                              {n.description}
                            </p>
                            <span className="text-[10px] text-muted-foreground/70">
                              {n.time}
                            </span>
                          </div>
                        </DropdownMenuItem>
                      )
                    })
                  ) : (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Aucune notification
                    </div>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                render={<a href={item.url} />}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
