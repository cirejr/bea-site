export type BeaTrainingNavLink = Readonly<{
  label: string
  href: string
  highlighted?: boolean
}>

export const beaTrainingNavLinks: readonly BeaTrainingNavLink[] = [
  { label: "Catalog", href: "#", highlighted: true },
  { label: "My Learning", href: "#" },
  { label: "Certifications", href: "#" },
  { label: "Resources", href: "#" },
]

export type BeaTrainingSidebarNavItem = Readonly<{
  label: string
  icon: string
  href: string
  highlighted?: boolean
}>

export const beaTrainingSidebar = {
  brand: {
    title: "Consultancy Training",
    subtitle: "Professional Excellence",
  },
  navItems: [
    { label: "Overview", icon: "dashboard", href: "#" },
    { label: "Finance", icon: "payments", href: "#", highlighted: true },
    { label: "Human Resources", icon: "groups", href: "#" },
    { label: "NGO Management", icon: "account_balance", href: "#" },
    { label: "Entrepreneurship", icon: "rocket_launch", href: "#" },
  ] as const satisfies readonly BeaTrainingSidebarNavItem[],
  ctaLabel: "Book Consultation",
} as const

export const beaTrainingHero = {
  title: "Training Catalog",
  description:
    "Elevate your professional trajectory with our accredited certification programs. From SYSCOHADA compliance to modern NGO management, master the frameworks that drive African excellence.",
} as const

export const beaTrainingFilters = {
  categories: [
    { label: "All Programs", active: true },
    { label: "Certifications", active: false },
    { label: "Short Courses", active: false },
  ],
  sortOptions: [
    { label: "Filter by Level", icon: "filter_list" },
    { label: "Sort by Relevance", icon: "sort" },
  ],
} as const

export type BeaTrainingProgram = Readonly<{
  id: string
  category: string
  title: string
  description: string
  progress: number
  icon: string
}>

export const beaTrainingPrograms: readonly BeaTrainingProgram[] = [
  {
    id: "finance-syscohada",
    category: "Finance & Accounting",
    title: "Sage & SYSCOHADA Mastery",
    description:
      "Advanced financial reporting and accounting compliance under the revised OHADA accounting system.",
    progress: 85,
    icon: "account_balance_wallet",
  },
  {
    id: "hr-strategic",
    category: "HR & Fiscal Policy",
    title: "Strategic Human Capital",
    description:
      "Navigating labor laws, fiscal optimization, and payroll management in regional ecosystems.",
    progress: 42,
    icon: "badge",
  },
  {
    id: "ngo-quickbooks",
    category: "NGO Management",
    title: "QuickBooks & SYCEBNL",
    description:
      "Dedicated training for non-profits on resource tracking and institutional governance standards.",
    progress: 12,
    icon: "diversity_3",
  },
  {
    id: "entrepreneur-business",
    category: "Entrepreneurship",
    title: "Business Plan Architect",
    description:
      "From concept to capital: Crafting investable business models within OHADA legal frameworks.",
    progress: 0,
    icon: "rocket_launch",
  },
  {
    id: "management-pro",
    category: "Executive Leadership",
    title: "Project Management Pro",
    description:
      "Agile methodologies and strategic planning for senior regional administrators.",
    progress: 67,
    icon: "leaderboard",
  },
  {
    id: "legal-tax",
    category: "Legal Compliance",
    title: "Tax Audit Excellence",
    description:
      "A deep dive into fiscal audits, tax litigation, and risk mitigation strategies for enterprises.",
    progress: 25,
    icon: "gavel",
  },
] as const

export const beaTrainingFooter = {
  tagline: "© 2024 B.E.A. Consultancy. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accreditation", href: "#" },
    { label: "Contact Us", href: "#" },
  ] as const,
} as const
