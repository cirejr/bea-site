"use client"

import { useTranslations } from "next-intl"
import { DropdownNavigation } from "@/components/ui/dorpdown-navigation"

function NavDropdown() {
  const t = useTranslations("nav")

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
      subMenus: [
        {
          title: t("training_domain_chiffre"),
          href: "/training/chiffre",
          items: [
            { label: t("training_sub_comptabilite"), href: "/training/chiffre" },
            { label: t("training_sub_consolidation"), href: "/training/chiffre" },
            { label: t("training_sub_gestion_finance"), href: "/training/chiffre" },
            { label: t("training_sub_fiscalite"), href: "/training/chiffre" },
            { label: t("training_sub_gestion_patrimoine"), href: "/training/chiffre" },
            { label: t("training_sub_banque_assurance"), href: "/training/chiffre" },
          ],
        },
        {
          title: t("training_domain_gestion_rh"),
          href: "/training/gestion-rh",
          items: [
            { label: t("training_sub_droit_social"), href: "/training/gestion-rh" },
            { label: t("training_sub_relations_sociales"), href: "/training/gestion-rh" },
            { label: t("training_sub_ressources_humaines"), href: "/training/gestion-rh" },
            { label: t("training_sub_gestion_formation"), href: "/training/gestion-rh" },
            { label: t("training_sub_paie"), href: "/training/gestion-rh" },
            { label: t("training_sub_cse"), href: "/training/gestion-rh" },
          ],
        },
        {
          title: t("training_domain_qse"),
          href: "/training/qse",
          items: [
            { label: t("training_sub_qualite"), href: "/training/qse" },
            { label: t("training_sub_sante_securite"), href: "/training/qse" },
            { label: t("training_sub_environnement"), href: "/training/qse" },
            { label: t("training_sub_qvt"), href: "/training/qse" },
            { label: t("training_sub_rse"), href: "/training/qse" },
          ],
        },
        {
          title: t("training_domain_secteurs_metiers"),
          href: "/training/secteurs-metiers",
          items: [
            { label: t("training_sub_action_sociale"), href: "/training/secteurs-metiers" },
            { label: t("training_sub_secteur_public"), href: "/training/secteurs-metiers" },
            { label: t("training_sub_marches_publics"), href: "/training/secteurs-metiers" },
            { label: t("training_sub_services_generaux"), href: "/training/secteurs-metiers" },
            { label: t("training_sub_assistants"), href: "/training/secteurs-metiers" },
          ],
        },
        {
          title: t("training_domain_droit"),
          href: "/training/droit",
          items: [
            { label: t("training_sub_compliance"), href: "/training/droit" },
            { label: t("training_sub_droit_affaires"), href: "/training/droit" },
            { label: t("training_sub_droit_particuliers"), href: "/training/droit" },
            { label: t("training_sub_droit_fiscal"), href: "/training/droit" },
            { label: t("training_sub_contentieux"), href: "/training/droit" },
            { label: t("training_sub_soft_skills_droit"), href: "/training/droit" },
            { label: t("training_sub_immobilier"), href: "/training/droit" },
            { label: t("training_sub_urbanisme"), href: "/training/droit" },
          ],
        },
        {
          title: t("training_domain_soft_skills"),
          href: "/training/soft-skills",
          items: [
            { label: t("training_sub_management"), href: "/training/soft-skills" },
            { label: t("training_sub_gestion_projet"), href: "/training/soft-skills" },
            { label: t("training_sub_communication"), href: "/training/soft-skills" },
            { label: t("training_sub_efficacite"), href: "/training/soft-skills" },
            { label: t("training_sub_developpement_personnel"), href: "/training/soft-skills" },
            { label: t("training_sub_relation_client"), href: "/training/soft-skills" },
            { label: t("training_sub_pedagogie"), href: "/training/soft-skills" },
          ],
        },
        {
          title: t("training_domain_technologies_numeriques"),
          href: "/training/technologies-numeriques",
          items: [
            { label: t("training_sub_bureautique"), href: "/training/technologies-numeriques" },
            { label: t("training_sub_ia"), href: "/training/technologies-numeriques" },
            { label: t("training_sub_ia_secteur_public"), href: "/training/technologies-numeriques" },
            { label: t("training_sub_informatique"), href: "/training/technologies-numeriques" },
            { label: t("training_sub_marketing_digital"), href: "/training/technologies-numeriques" },
          ],
        },
        {
          title: t("training_quick_access"),
          items: [
            { label: t("training_qa_amf"), href: "/training/certifications-amf" },
            { label: t("training_qa_incontournables"), href: "/training/incontournables" },
            { label: t("training_qa_nouveautes"), href: "/training/nouveautes" },
            { label: t("training_qa_parcours"), href: "/training/parcours" },
            { label: t("training_qa_certifiantes"), href: "/training/formations-certifiantes" },
            { label: t("training_qa_classes_virtuelles"), href: "/training/classes-virtuelles" },
            { label: t("training_qa_offre_lde"), href: "/training/offre-lde" },
            { label: t("training_qa_recherche"), href: "/training/recherche" },
          ],
          isFocused: true
        },
      ],

    },
    {
      id: 4,
      label: t("about"),
      link: "/about",
    },
    {
      id: 5,
      label: t("contact"),
      link: "/contact",
    },
  ]

  return <DropdownNavigation navItems={NAV_ITEMS} />
}

export { NavDropdown }
