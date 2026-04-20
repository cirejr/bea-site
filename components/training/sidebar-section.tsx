"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export type BeaTrainingSidebarSectionProps = {
  activeCategory: string | null
}

const navItems = [
  { id: "overview", icon: "dashboard", label: "Overview", href: "/training", category: null },
  { id: "finance", icon: "payments", label: "Finance", href: "/training?category=finance", category: "finance" },
  { id: "hr", icon: "groups", label: "Human Resources", href: "/training?category=hr", category: "hr" },
  { id: "ngo", icon: "account_balance", label: "NGO Management", href: "/training?category=ngo", category: "ngo" },
  { id: "entrepreneurship", icon: "rocket_launch", label: "Entrepreneurship", href: "/training?category=entrepreneurship", category: "entrepreneurship" },
]

export function BeaTrainingSidebarSection({ activeCategory }: BeaTrainingSidebarSectionProps) {
  const t = useTranslations("training.sidebar")

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-5rem)] w-64 sticky top-20 py-6 bg-bea-surface font-label text-sm font-medium">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-bea-primary-container flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-bea-primary font-headline leading-none">{t("title")}</h3>
            <p className="text-[10px] text-secondary uppercase tracking-widest mt-1">{t("subtitle")}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 pr-4">
        {navItems.map((item) => {
          const isActive = activeCategory === item.category || (item.category === null && activeCategory === null)
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 rounded-r-full transition-transform duration-200 ${
                isActive
                  ? "bg-bea-primary text-white shadow-lg shadow-blue-500/20"
                  : "text-bea-secondary hover:translate-x-1 hover:bg-bea-surface-container"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="px-6 mt-auto">
        <Link
          href="/contact"
          className="w-full bg-white text-bea-primary border border-primary/10 py-3 rounded-xl font-headline font-bold text-xs hover:bg-bea-primary hover:text-white transition-all shadow-soft"
        >
          {t("bookConsultation")}
        </Link>
      </div>
    </aside>
  )
}