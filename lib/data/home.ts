export type BeaNavLink = Readonly<{
  label: string
  href: string
}>

export type BeaConsultancyItem = Readonly<{
  icon: string
  title: string
  description: string
}>

export type BeaLeadershipTrack = Readonly<{
  icon: string
  title: string
  description: string
}>

export type BeaTrainingCourse = Readonly<{
  icon: string
  tag: string
  title: string
  description: string
  progressPercent: number
  enrolledLabel: string
}>

export const beaHomeNavLinks: readonly BeaNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const beaHomeHero = {
  title: "Strategic Growth and ",
  titleHighlight: "Professional Certification",
  description:
    "Empowering African enterprises through architectural precision in strategy, leadership mentoring, and financial excellence.",
  primaryCta: "Explore Catalog",
  secondaryCta: "Consulting Services",
  heroImageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnLdwwLRnTZ3p8yshpCZdKWFd1bJoNO2gPPs6LMICvwqlmzWzthz_GVRyoCxHoz7UTLLvICLP4-I3uwlwLiJzZqaYCS-RD60_aWwzIhZ7U-jne6jZ38mOVcIeqV_t5eA9YC0Zr9D5xA_yN4ukt7S0kKdv1f4UkVX1Tafs8FT70KsyQC1ryaySudLwTT3pKy2GaBkcipPHUZUfwDGNSIYLIZ_p1KtXcOWwn93BkEu0WiJpo3sWLS810rieVpg9DQ8lzJsHiQU_vOg",
  heroImageAlt:
    "modern glass boardroom interior with city view through large windows at dusk, sleek professional atmosphere",
  floatingCard: {
    icon: "architecture",
    title: "Structural Integrity",
    description:
      "Our methodology focuses on the foundational pillars of business architecture: audit, fiscal policy, and organizational culture.",
    badge: "Certified OHADA Expert",
  },
} as const

export const beaHomeConsultancy = {
  title: "Consultancy & Strategy",
  subtitle:
    "Refining organizational structures through academic rigor and practical field intelligence.",
  items: [
    {
      icon: "groups",
      title: "HR Strategy",
      description:
        "Optimization of human capital through competency mapping and structural alignment with organizational objectives.",
    },
    {
      icon: "account_balance",
      title: "Financial Audits",
      description:
        "Rigorous verification and advisory services ensuring total compliance with SYSCOHADA and international standards.",
    },
    {
      icon: "transform",
      title: "Organizational Transformation",
      description:
        "Leading systemic changes that foster resilience, agility, and long-term institutional health.",
    },
  ] as const satisfies readonly BeaConsultancyItem[],
} as const

export const beaHomeLeadership = {
  title: "Leadership Mentoring",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCCEB_yWh0qFwKm0fXP_8FjwPlOAXWFStf3j3yav8U2YPvyWMWJE2fOd0AFacVJBBUxy76712Xf2Dt1r4g9-QqRm-fNAuo6WG2302zgXxDYU0qMOF3UDGFinBueorrq3DzJEA7oWGHT4UHoSMW_Si7JhMBYc8K7BgO4O6CcxZOOBreHPr0PSOkkdNq9-m2V6m1FycZEeAjwaNkgUS9Tjx4Sb5DZ4UGb2YxtnmZ-Yk8GF2NgRggZfWIlxV8PHLGCoxdlaJv2A-4xcw",
  imageAlt:
    "diverse group of professionals in a high-end office discussing strategy around a white table with architectural plans",
  tracks: [
    {
      icon: "person_pin",
      title: "Individual Track",
      description:
        "Bespoke coaching for executives, focusing on emotional intelligence, strategic vision, and decision-making under uncertainty.",
    },
    {
      icon: "diversity_3",
      title: "Collective Track",
      description:
        "Synchronizing leadership teams to operate as a singular, high-performance unit through collaborative frameworking.",
    },
  ] as const satisfies readonly BeaLeadershipTrack[],
} as const

export const beaHomeTraining = {
  title: "Training Catalog",
  subtitle:
    "Elevating professional standards through specialized technical certifications.",
  viewAllLabel: "View All Programs",
  courses: [
    {
      icon: "payments",
      tag: "SAGE",
      title: "Finance & Accounting",
      description:
        "Mastery of Sage and SYSCOHADA reporting standards for modern enterprises.",
      progressPercent: 85,
      enrolledLabel: "85% Enrolled",
    },
    {
      icon: "gavel",
      tag: "Legal",
      title: "HR & Fiscal Policy",
      description:
        "Navigating complex fiscal landscapes and labor laws with technical precision.",
      progressPercent: 60,
      enrolledLabel: "60% Enrolled",
    },
    {
      icon: "volunteer_activism",
      tag: "NGO",
      title: "NGO Management",
      description:
        "QuickBooks training and SYCEBNL compliance for non-profit organizations.",
      progressPercent: 92,
      enrolledLabel: "92% Enrolled",
    },
    {
      icon: "lightbulb",
      tag: "Growth",
      title: "Entrepreneurship",
      description:
        "Developing robust Business Plans within the OHADA legal framework.",
      progressPercent: 74,
      enrolledLabel: "74% Enrolled",
    },
  ] as const satisfies readonly BeaTrainingCourse[],
} as const

export const beaHomeInstitutionalCta = {
  title: "Architecting the Future of African Business",
  description:
    "Join the ecosystem of high-performing leaders and certified professionals shaping the continent's economy.",
  primaryCta: "Start Your Transformation",
  secondaryCta: "Download Brochure",
} as const

export const beaHomeFooter = {
  company: "B.E.A. Dakar",
  addressLine: "B.E.A. Dakar (Rufisque Ouest) - Capital 1,000,000 FCFA",
  links: [
    { label: "Legal Mentions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Certifications", href: "#" },
  ] as const,
  copyright: "© 2024 Bosse Elanpro Afrique. All Rights Reserved.",
} as const
