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

export function BeaNav({
  trainingNavigation = [],
}: {
  trainingNavigation?: (Domain & { subCategories: SubCategory[] })[]
}) {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/", key: "home" },
    { href: "/consultancy", key: "consultancy" },
    { href: "/formations", key: "training" },
    { href: "/formations-certifiantes", key: "formationsCertifiantes" },
    { href: "/catalogues", key: "catalogues" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
  ]

  const trainingDomains = [
    {
      key: "training_domain_chiffre",
      items: [
        { key: "training_sub_comptabilite", href: "/formations/chiffre" },
        { key: "training_sub_consolidation", href: "/formations/chiffre" },
        { key: "training_sub_gestion_finance", href: "/formations/chiffre" },
        { key: "training_sub_fiscalite", href: "/formations/chiffre" },
        { key: "training_sub_gestion_patrimoine", href: "/formations/chiffre" },
        { key: "training_sub_banque_assurance", href: "/formations/chiffre" },
      ],
    },
    {
      key: "training_domain_gestion_rh",
      items: [
        { key: "training_sub_droit_social", href: "/formations/gestion-rh" },
        {
          key: "training_sub_relations_sociales",
          href: "/formations/gestion-rh",
        },
        {
          key: "training_sub_ressources_humaines",
          href: "/formations/gestion-rh",
        },
        {
          key: "training_sub_gestion_formation",
          href: "/formations/gestion-rh",
        },
        { key: "training_sub_paie", href: "/formations/gestion-rh" },
        { key: "training_sub_cse", href: "/formations/gestion-rh" },
      ],
    },
    {
      key: "training_domain_qse",
      items: [
        { key: "training_sub_qualite", href: "/formations/qse" },
        { key: "training_sub_sante_securite", href: "/formations/qse" },
        { key: "training_sub_environnement", href: "/formations/qse" },
        { key: "training_sub_qvt", href: "/formations/qse" },
        { key: "training_sub_rse", href: "/formations/qse" },
      ],
    },
    {
      key: "training_domain_secteurs_metiers",
      items: [
        {
          key: "training_sub_action_sociale",
          href: "/formations/secteurs-metiers",
        },
        {
          key: "training_sub_secteur_public",
          href: "/formations/secteurs-metiers",
        },
        {
          key: "training_sub_marches_publics",
          href: "/formations/secteurs-metiers",
        },
        {
          key: "training_sub_services_generaux",
          href: "/formations/secteurs-metiers",
        },
        {
          key: "training_sub_assistants",
          href: "/formations/secteurs-metiers",
        },
      ],
    },
    {
      key: "training_domain_droit",
      items: [
        { key: "training_sub_compliance", href: "/formations/droit" },
        { key: "training_sub_droit_affaires", href: "/formations/droit" },
        { key: "training_sub_droit_particuliers", href: "/formations/droit" },
        { key: "training_sub_droit_fiscal", href: "/formations/droit" },
        { key: "training_sub_contentieux", href: "/formations/droit" },
        { key: "training_sub_soft_skills_droit", href: "/formations/droit" },
        { key: "training_sub_immobilier", href: "/formations/droit" },
        { key: "training_sub_urbanisme", href: "/formations/droit" },
      ],
    },
    {
      key: "training_domain_soft_skills",
      items: [
        { key: "training_sub_management", href: "/formations/soft-skills" },
        { key: "training_sub_gestion_projet", href: "/formations/soft-skills" },
        { key: "training_sub_communication", href: "/formations/soft-skills" },
        { key: "training_sub_efficacite", href: "/formations/soft-skills" },
        {
          key: "training_sub_developpement_personnel",
          href: "/formations/soft-skills",
        },
        {
          key: "training_sub_relation_client",
          href: "/formations/soft-skills",
        },
        { key: "training_sub_pedagogie", href: "/formations/soft-skills" },
      ],
    },
    {
      key: "training_domain_technologies_numeriques",
      items: [
        {
          key: "training_sub_bureautique",
          href: "/formations/technologies-numeriques",
        },
        { key: "training_sub_ia", href: "/formations/technologies-numeriques" },
        {
          key: "training_sub_ia_secteur_public",
          href: "/formations/technologies-numeriques",
        },
        {
          key: "training_sub_informatique",
          href: "/formations/technologies-numeriques",
        },
        {
          key: "training_sub_marketing_digital",
          href: "/formations/technologies-numeriques",
        },
      ],
    },
  ]

  const quickAccessItems = {
    key: "training_quick_access",
    items: [
      { key: "training_qa_amf", href: "/formations/certifications-amf" },
      {
        key: "training_qa_incontournables",
        href: "/formations/incontournables",
      },
      { key: "training_qa_nouveautes", href: "/formations/nouveautes" },
      { key: "training_qa_parcours", href: "/formations/parcours" },
      {
        key: "training_qa_certifiantes",
        href: "/formations/formations-certifiantes",
      },
      {
        key: "training_qa_classes_virtuelles",
        href: "/formations/classes-virtuelles",
      },
        { key: "training_qa_offre_lde", href: "/formations/offre-bea" },
      { key: "training_qa_recherche", href: "/formations/recherche" },
    ],
  }

  const dbTrainingDomains = trainingNavigation.map((domain) => ({
    label: domain.label,
    items: domain.subCategories.map((subCategory) => ({
      label: subCategory.label,
      href: `/${locale}/formations/${domain.slug}/${subCategory.slug}`,
    })),
  }))
  const renderedTrainingDomains = [
    ...(dbTrainingDomains.length > 0 ? dbTrainingDomains : trainingDomains),
    quickAccessItems,
  ]

  function isActivePath(pathname: string, href: string): boolean {
    const normalizedPathname =
      pathname === `/${locale}` ? "/" : pathname.replace(`/${locale}`, "")
    if (href === "/") return normalizedPathname === "/"
    return normalizedPathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 shadow-sm shadow-blue-500/5 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 md:px-8">
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
              className="h-auto rounded-[var(--radius-bea)] bg-bea-primary px-4 py-2 font-bea-headline text-sm font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95 lg:px-6 lg:py-2.5 lg:text-base lg:font-semibold"
            >
              {t("cta")}
            </Button>
          </Link>
          <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="md:hidden" asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-md hover:bg-bea-surface-container hover:text-bea-primary"
              >
                <HugeiconsIcon icon={Menu02FreeIcons} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-screen">
              <div className="mx-auto w-full max-w-md p-6">
                <div className="flex flex-col gap-4">
                  {navLinks
                    .filter((l) => l.key !== "training")
                    .map((link) => {
                      const active = isActivePath(pathname, link.href)
                      return (
                        <DrawerClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex h-11 items-center justify-between rounded-[var(--radius-bea)] border border-bea-outline-variant px-4 py-3 font-semibold transition-colors duration-300",
                              active
                                ? "border-0 bg-bea-primary text-bea-on-primary"
                                : "text-bea-on-primary hover:bg-bea-surface-container hover:text-bea-primary"
                            )}
                          >
                            {t(link.key)}
                            <BeaHugeicon
                              name="arrow_right"
                              className="h-5 w-5"
                            />
                          </Link>
                        </DrawerClose>
                      )
                    })}

                  <Accordion>
                    <AccordionItem>
                      <AccordionTrigger className="flex h-11 items-center justify-between rounded-[var(--radius-bea)] border border-bea-outline-variant px-4 py-3 font-semibold text-bea-on-primary hover:bg-bea-surface-container hover:text-bea-primary [&_[data-slot=accordion-trigger-icon]]:size-4 [&_[data-slot=accordion-trigger-icon]]:text-bea-on-primary">
                        {t("training")}
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pb-0 [&_a]:no-underline">
                        <div className="flex flex-col">
                          {renderedTrainingDomains.map((domain) => (
                            <Accordion
                              key={"key" in domain ? domain.key : domain.label}
                              className="rounded-none border-0"
                            >
                              <AccordionItem className="border-0 data-open:bg-transparent">
                                <AccordionTrigger className="flex w-full items-center justify-between px-5 py-2.5 text-sm font-medium transition-colors hover:bg-bea-surface-dim/50 hover:text-bea-primary [&_[data-slot=accordion-trigger-icon]]:size-3.5 [&_[data-slot=accordion-trigger-icon]]:text-bea-on-surface-variant">
                                  {"key" in domain
                                    ? t(domain.key)
                                    : domain.label}
                                </AccordionTrigger>
                                <AccordionContent className="px-0 pb-1 [&_a]:no-underline">
                                  <div className="flex flex-col gap-0.5 pr-2 pl-3">
                                    {domain.items.map((item) => (
                                      <DrawerClose
                                        asChild
                                        key={
                                          "key" in item ? item.key : item.label
                                        }
                                      >
                                        <Link
                                          href={item.href}
                                          className="block rounded-[var(--radius-bea)] py-2 pr-4 pl-7 text-sm transition-colors duration-200 hover:bg-bea-surface-container hover:text-bea-primary"
                                        >
                                          {"key" in item
                                            ? t(item.key)
                                            : item.label}
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
                        className="h-auto w-full rounded-[var(--radius-bea)] bg-bea-primary py-3 font-bea-headline font-semibold text-bea-on-primary shadow-sm hover:opacity-90 active:scale-95"
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
