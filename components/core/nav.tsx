"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { LocaleSwitcher } from "./locale-switcher"
import { BeaHugeicon } from "../home/hugeicon"
import { Menu02FreeIcons } from "@hugeicons/core-free-icons"
import { NavDropdown } from "./nav-dropdown"
import type { Domain, SubCategory } from "@/lib/data"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const LOGO_SRC = "/bea-logo-inverted-transparent.png"

export function BeaNav({ trainingNavigation = [] }: { trainingNavigation?: (Domain & { subCategories: SubCategory[] })[] }) {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/", key: "home" },
    { href: "/consultancy", key: "consultancy" },
    { href: "/training", key: "training" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
  ]

  const trainingDomains = [
    {
      key: "training_domain_chiffre",
      items: [
        { key: "training_sub_comptabilite", href: "/training/chiffre" },
        { key: "training_sub_consolidation", href: "/training/chiffre" },
        { key: "training_sub_gestion_finance", href: "/training/chiffre" },
        { key: "training_sub_fiscalite", href: "/training/chiffre" },
        { key: "training_sub_gestion_patrimoine", href: "/training/chiffre" },
        { key: "training_sub_banque_assurance", href: "/training/chiffre" },
      ],
    },
    {
      key: "training_domain_gestion_rh",
      items: [
        { key: "training_sub_droit_social", href: "/training/gestion-rh" },
        { key: "training_sub_relations_sociales", href: "/training/gestion-rh" },
        { key: "training_sub_ressources_humaines", href: "/training/gestion-rh" },
        { key: "training_sub_gestion_formation", href: "/training/gestion-rh" },
        { key: "training_sub_paie", href: "/training/gestion-rh" },
        { key: "training_sub_cse", href: "/training/gestion-rh" },
      ],
    },
    {
      key: "training_domain_qse",
      items: [
        { key: "training_sub_qualite", href: "/training/qse" },
        { key: "training_sub_sante_securite", href: "/training/qse" },
        { key: "training_sub_environnement", href: "/training/qse" },
        { key: "training_sub_qvt", href: "/training/qse" },
        { key: "training_sub_rse", href: "/training/qse" },
      ],
    },
    {
      key: "training_domain_secteurs_metiers",
      items: [
        { key: "training_sub_action_sociale", href: "/training/secteurs-metiers" },
        { key: "training_sub_secteur_public", href: "/training/secteurs-metiers" },
        { key: "training_sub_marches_publics", href: "/training/secteurs-metiers" },
        { key: "training_sub_services_generaux", href: "/training/secteurs-metiers" },
        { key: "training_sub_assistants", href: "/training/secteurs-metiers" },
      ],
    },
    {
      key: "training_domain_droit",
      items: [
        { key: "training_sub_compliance", href: "/training/droit" },
        { key: "training_sub_droit_affaires", href: "/training/droit" },
        { key: "training_sub_droit_particuliers", href: "/training/droit" },
        { key: "training_sub_droit_fiscal", href: "/training/droit" },
        { key: "training_sub_contentieux", href: "/training/droit" },
        { key: "training_sub_soft_skills_droit", href: "/training/droit" },
        { key: "training_sub_immobilier", href: "/training/droit" },
        { key: "training_sub_urbanisme", href: "/training/droit" },
      ],
    },
    {
      key: "training_domain_soft_skills",
      items: [
        { key: "training_sub_management", href: "/training/soft-skills" },
        { key: "training_sub_gestion_projet", href: "/training/soft-skills" },
        { key: "training_sub_communication", href: "/training/soft-skills" },
        { key: "training_sub_efficacite", href: "/training/soft-skills" },
        { key: "training_sub_developpement_personnel", href: "/training/soft-skills" },
        { key: "training_sub_relation_client", href: "/training/soft-skills" },
        { key: "training_sub_pedagogie", href: "/training/soft-skills" },
      ],
    },
    {
      key: "training_domain_technologies_numeriques",
      items: [
        { key: "training_sub_bureautique", href: "/training/technologies-numeriques" },
        { key: "training_sub_ia", href: "/training/technologies-numeriques" },
        { key: "training_sub_ia_secteur_public", href: "/training/technologies-numeriques" },
        { key: "training_sub_informatique", href: "/training/technologies-numeriques" },
        { key: "training_sub_marketing_digital", href: "/training/technologies-numeriques" },
      ],
    },
    {
      key: "training_quick_access",
      items: [
        { key: "training_qa_amf", href: "/training/certifications-amf" },
        { key: "training_qa_incontournables", href: "/training/incontournables" },
        { key: "training_qa_nouveautes", href: "/training/nouveautes" },
        { key: "training_qa_parcours", href: "/training/parcours" },
        { key: "training_qa_certifiantes", href: "/training/formations-certifiantes" },
        { key: "training_qa_classes_virtuelles", href: "/training/classes-virtuelles" },
        { key: "training_qa_offre_lde", href: "/training/offre-lde" },
        { key: "training_qa_recherche", href: "/training/recherche" },
      ],
    },
  ]

  const dbTrainingDomains = trainingNavigation.map((domain) => ({
    label: domain.label,
    items: domain.subCategories.map((subCategory) => ({
      label: subCategory.label,
      href: `/training/${domain.slug}?subCategory=${subCategory.slug}`,
    })),
  }))
  const renderedTrainingDomains = dbTrainingDomains.length > 0 ? dbTrainingDomains : trainingDomains

  function isActivePath(pathname: string, href: string): boolean {
    const normalizedPathname = pathname === `/${locale}` ? "/" : pathname.replace(`/${locale}`, "")
    if (href === "/") return normalizedPathname === "/"
    return normalizedPathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 shadow-sm shadow-blue-500/5 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src={LOGO_SRC}
              alt="B.E.A."
              width={150}
              height={150}
              className="h-14 w-auto md:h-20"
              priority
            />
          </Link>
          <div className="hidden lg:block">
            <NavDropdown trainingNavigation={trainingNavigation} />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <LocaleSwitcher />
          <Link href="/contact" className="hidden md:block">
            <Button
              size="lg"
              className="h-auto rounded-[var(--radius-bea)] bg-bea-primary px-4 py-2 lg:px-6 lg:py-2.5 font-bea-headline text-sm font-semibold lg:text-base lg:font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95"
            >
              {t("cta")}
            </Button>
          </Link>
          <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="md:hidden" asChild>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-bea-surface-container hover:text-bea-primary hover:bg-bea-surface-container rounded-md"
              >
                <HugeiconsIcon icon={Menu02FreeIcons} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-screen">
              <div className="mx-auto w-full max-w-md p-6">
                <div className="flex flex-col gap-4">
                  {navLinks.filter((l) => l.key !== "training").map((link) => {
                    const active = isActivePath(pathname, link.href)
                    return (
                      <DrawerClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between h-11 rounded-[var(--radius-bea)] border border-bea-outline-variant px-4 py-3 font-semibold transition-colors duration-300",
                            active
                              ? "bg-bea-primary text-bea-on-primary border-0"
                              : "text-bea-on-primary hover:bg-bea-surface-container hover:text-bea-primary"
                          )}
                        >
                          {t(link.key)}
                          <BeaHugeicon
                            name="arrow_right"
                            className="h-5 w-5 "
                          />
                        </Link>
                      </DrawerClose>
                    )
                  })}

                  <Accordion>
                    <AccordionItem>
                      <AccordionTrigger className="flex items-center justify-between h-11 rounded-[var(--radius-bea)] border border-bea-outline-variant px-4 py-3 font-semibold text-bea-on-primary hover:bg-bea-surface-container hover:text-bea-primary [&_[data-slot=accordion-trigger-icon]]:size-4 [&_[data-slot=accordion-trigger-icon]]:text-bea-on-primary">
                        {t("training")}
                      </AccordionTrigger>
                      <AccordionContent className="[&_a]:no-underline px-0 pb-0">
                        <div className="flex flex-col">
                          {renderedTrainingDomains.map((domain) => (
                            <Accordion key={"key" in domain ? domain.key : domain.label} className="border-0 rounded-none">
                              <AccordionItem className="border-0 data-open:bg-transparent">
                                <AccordionTrigger className="flex items-center justify-between w-full py-2.5 px-5 text-sm font-medium hover:text-foreground hover:bg-accent/50 transition-colors [&_[data-slot=accordion-trigger-icon]]:size-3.5 [&_[data-slot=accordion-trigger-icon]]:text-muted-foreground">
                                  {"key" in domain ? t(domain.key) : domain.label}
                                </AccordionTrigger>
                                <AccordionContent className="[&_a]:no-underline px-0 pb-1">
                                  <div className="flex flex-col gap-0.5 pl-3 pr-2">
                                    {domain.items.map((item) => (
                                      <DrawerClose asChild key={"key" in item ? item.key : item.label}>
                                        <Link
                                          href={item.href}
                                          className="block pl-7 pr-4 py-2 text-sm hover:text-bea-primary hover:bg-bea-surface-container rounded-[var(--radius-bea)] transition-colors duration-200"
                                        >
                                          {"key" in item ? t(item.key) : item.label}
                                        </Link>
                                      </DrawerClose>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <DrawerClose asChild>
                    <Link href="/contact" className="mt-2 block md:hidden">
                      <Button
                        size="lg"
                        className="w-full h-auto rounded-[var(--radius-bea)] bg-bea-primary py-3 font-bea-headline font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95"
                      >
                        {t("cta")}
                      </Button>
                    </Link>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  )
}
