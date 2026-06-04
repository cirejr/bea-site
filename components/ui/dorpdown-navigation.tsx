import { useState } from "react"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Link } from "@/i18n/navigation"

type Item = {
  label: string
  description?: string
  icon?: React.ElementType
  href?: string
}

type SubMenu = {
  title: string
  href?: string
  items: Item[]
  isFocused?: boolean
}

type NavItem = {
  id: number
  label: string
  subMenus?: SubMenu[]
  link?: string
}

type Props = {
  navItems: NavItem[]
  className?: string
}

export function DropdownNavigation({ navItems, className = "" }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [isHover, setIsHover] = useState<number | null>(null)

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel)
  }

  return (
    <ul className={`relative flex items-center gap-1 ${className} font-sans`}>
      {navItems.map((navItem) => (
        <li
          key={navItem.label}
          className="relative"
          onMouseEnter={() => handleHover(navItem.label)}
          onMouseLeave={() => handleHover(null)}
        >
          {navItem.subMenus ? (
            <>
              <button
                className="relative flex cursor-pointer items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-bea-secondary transition-colors duration-300 hover:text-bea-primary"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span>{navItem.label}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openMenu === navItem.label ? "rotate-180" : ""
                  }`}
                />
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full rounded-full"
                  />
                )}
              </button>
              <AnimatePresence>
                {openMenu === navItem.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <motion.div
                      className="w-max rounded-2xl border border-bea-outline-variant bg-bea-surface p-4 shadow-lg"
                      layoutId="menu"
                    >
                      <div
                        className="flex flex-wrap justify-between gap-x-9 gap-y-6"
                        style={{ maxWidth: "1080px" }}
                      >
                        {navItem.subMenus.map((sub) => (
                          <motion.div
                            layout
                            key={sub.title}
                            className={`${sub.isFocused && "rounded-sm bg-bea-surface-dim"} w-52 p-2`}
                          >
                            <Link
                              href={sub.href || "#"}
                              className={`${sub.isFocused && "text-bea-background hover:text-bea-primary"} mb-3 block text-sm font-medium capitalize hover:text-bea-primary`}
                            >
                              {sub.title}
                            </Link>
                            <ul className="space-y-2">
                              {sub.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href || "#"}
                                    className={`${sub.isFocused && "text-bea-outline hover:bg-bea-inverse-primary"} group flex items-start space-x-3 rounded-lg p-1.5 text-bea-on-surface-variant transition-colors duration-200 hover:bg-bea-primary hover:text-white`}
                                  >
                                    {item.icon && (
                                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-bea-outline-variant transition-colors duration-300 group-hover:bg-bea-primary/10 group-hover:text-bea-primary">
                                        <item.icon className="h-4 w-4 flex-none" />
                                      </div>
                                    )}
                                    <div className="leading-5">
                                      <p className={"text-sm font-medium"}>
                                        {item.label}
                                      </p>
                                      {item.description && (
                                        <p className="text-xs transition-colors duration-300">
                                          {item.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href={navItem.link || "#"}
              className="relative inline-flex cursor-pointer items-center rounded-full px-4 py-1.5 text-sm font-medium text-bea-secondary transition-colors duration-300 hover:bg-bea-primary/10 hover:text-bea-primary"
            >
              {navItem.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
