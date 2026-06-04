"use client"

import { useTranslations, useLocale } from "next-intl"
import { DropdownNavigation } from "@/components/ui/dorpdown-navigation"
import type { Domain, SubCategory } from "@/lib/data"

function NavDropdown({ trainingNavigation = [] }: { trainingNavigation?: (Domain & { subCategories: SubCategory[] })[] }) {
  const t = useTranslations("nav")
  const locale = useLocale()

  const dbTrainingSubMenus = trainingNavigation.map((domain) => ({
    title: domain.label,
    href: `/${locale}/formations/${domain.slug}`,
    items: domain.subCategories.map((subCategory) => ({
      label: subCategory.label,
      href: `/${locale}/formations/${domain.slug}/${subCategory.slug}`,
    })),
  }))

  const trainingDomainsFallback = [
    {
      title: t("training_domain_chiffre"),
      href: "/formations/chiffre",
      items: [
        { label: t("training_sub_comptabilite"), href: "/formations/chiffre" },
        { label: t("training_sub_consolidation"), href: "/formations/chiffre" },
        { label: t("training_sub_gestion_finance"), href: "/formations/chiffre" },
        { label: t("training_sub_fiscalite"), href: "/formations/chiffre" },
        { label: t("training_sub_gestion_patrimoine"), href: "/formations/chiffre" },
        { label: t("training_sub_banque_assurance"), href: "/formations/chiffre" },
      ],
    },
    {
      title: t("training_domain_gestion_rh"),
      href: "/formations/gestion-rh",
      items: [
        { label: t("training_sub_droit_social"), href: "/formations/gestion-rh" },
        { label: t("training_sub_relations_sociales"), href: "/formations/gestion-rh" },
        { label: t("training_sub_ressources_humaines"), href: "/formations/gestion-rh" },
        { label: t("training_sub_gestion_formation"), href: "/formations/gestion-rh" },
        { label: t("training_sub_paie"), href: "/formations/gestion-rh" },
        { label: t("training_sub_cse"), href: "/formations/gestion-rh" },
      ],
    },
    {
      title: t("training_domain_qse"),
      href: "/formations/qse",
      items: [
        { label: t("training_sub_qualite"), href: "/formations/qse" },
        { label: t("training_sub_sante_securite"), href: "/formations/qse" },
        { label: t("training_sub_environnement"), href: "/formations/qse" },
        { label: t("training_sub_qvt"), href: "/formations/qse" },
        { label: t("training_sub_rse"), href: "/formations/qse" },
      ],
    },
    {
      title: t("training_domain_secteurs_metiers"),
      href: "/formations/secteurs-metiers",
      items: [
        { label: t("training_sub_action_sociale"), href: "/formations/secteurs-metiers" },
        { label: t("training_sub_secteur_public"), href: "/formations/secteurs-metiers" },
        { label: t("training_sub_marches_publics"), href: "/formations/secteurs-metiers" },
        { label: t("training_sub_services_generaux"), href: "/formations/secteurs-metiers" },
        { label: t("training_sub_assistants"), href: "/formations/secteurs-metiers" },
      ],
    },
    {
      title: t("training_domain_droit"),
      href: "/formations/droit",
      items: [
        { label: t("training_sub_compliance"), href: "/formations/droit" },
        { label: t("training_sub_droit_affaires"), href: "/formations/droit" },
        { label: t("training_sub_droit_particuliers"), href: "/formations/droit" },
        { label: t("training_sub_droit_fiscal"), href: "/formations/droit" },
        { label: t("training_sub_contentieux"), href: "/formations/droit" },
        { label: t("training_sub_soft_skills_droit"), href: "/formations/droit" },
        { label: t("training_sub_immobilier"), href: "/formations/droit" },
        { label: t("training_sub_urbanisme"), href: "/formations/droit" },
      ],
    },
    {
      title: t("training_domain_soft_skills"),
      href: "/formations/soft-skills",
      items: [
        { label: t("training_sub_management"), href: "/formations/soft-skills" },
        { label: t("training_sub_gestion_projet"), href: "/formations/soft-skills" },
        { label: t("training_sub_communication"), href: "/formations/soft-skills" },
        { label: t("training_sub_efficacite"), href: "/formations/soft-skills" },
        { label: t("training_sub_developpement_personnel"), href: "/formations/soft-skills" },
        { label: t("training_sub_relation_client"), href: "/formations/soft-skills" },
        { label: t("training_sub_pedagogie"), href: "/formations/soft-skills" },
      ],
    },
    {
      title: t("training_domain_technologies_numeriques"),
      href: "/formations/technologies-numeriques",
      items: [
        { label: t("training_sub_bureautique"), href: "/formations/technologies-numeriques" },
        { label: t("training_sub_ia"), href: "/formations/technologies-numeriques" },
        { label: t("training_sub_ia_secteur_public"), href: "/formations/technologies-numeriques" },
        { label: t("training_sub_informatique"), href: "/formations/technologies-numeriques" },
        { label: t("training_sub_marketing_digital"), href: "/formations/technologies-numeriques" },
      ],
    },
  ]

  const quickAccessSubMenu = {
    title: t("training_quick_access"),
    items: [
      { label: t("training_qa_amf"), href: "/formations/certifications-amf" },
      { label: t("training_qa_incontournables"), href: "/formations/incontournables" },
      { label: t("training_qa_nouveautes"), href: "/formations/nouveautes" },
      { label: t("training_qa_parcours"), href: "/formations/parcours" },
      { label: t("training_qa_certifiantes"), href: "/formations/formations-certifiantes" },
      { label: t("training_qa_classes_virtuelles"), href: "/formations/classes-virtuelles" },
      { label: t("training_qa_offre_lde"), href: "/formations/offre-bea" },
      { label: t("training_qa_recherche"), href: "/formations/recherche" },
    ],
    isFocused: true,
  }

  const trainingSubMenus = [
    ...(dbTrainingSubMenus.length > 0 ? dbTrainingSubMenus : trainingDomainsFallback),
    quickAccessSubMenu,
  ]

  const NAV_ITEMS = [
    {
      id: 1,
      label: t("home"),
      link: "/",
    },
    {
      id: 2,
      label: t("consultancy"),
      link: "/consultancy",
    },
    {
      id: 3,
      label: t("training"),
      subMenus: trainingSubMenus,
    },
    {
      id: 4,
      label: t("formationsCertifiantes"),
      link: "/formations-certifiantes",
    },
    {
      id: 5,
      label: t("about"),
      link: "/about",
    },
    {
      id: 6,
      label: t("contact"),
      link: "/contact",
    },
  ]

  return <DropdownNavigation navItems={NAV_ITEMS} />
}

export { NavDropdown }
