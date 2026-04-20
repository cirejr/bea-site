export type BeaContactNavLink = Readonly<{
  label: string
  href: string
}>

export const beaContactNavLinks: readonly BeaContactNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Training Catalog", href: "#" },
  { label: "About", href: "/about" },
]

export const beaContactFooter = {
  tagline: "© 2024 BOSSE ELANPRO AFRIQUE. The Academic Architect.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Institutional Profile", href: "#" },
  ] as const,
} as const

export const beaContactHero = {
  eyebrow: "Reach Out",
  title: "Get in Touch.",
  subtitle:
    "Institutional excellence begins with a conversation. Partner with BOSSE ELANPRO AFRIQUE for your consultancy and architectural training needs.",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDhoPG_PeCLC4IMV94ICnz4Zcu5ifvN1LOzWsyak1awoROr3hPmfINwAwH470QO94EACUSYHLU-z83GR9HLyggw1TP3rNcwm88WBaWmqPSW9f4fiyEjVlwDJv-1KLRD8n0BeFF_PBg45_5ZXVRDs8X2QvaluulJXFIUpOWMrbfkv3dPludjjaLo0foQh9wl0sizCk3xLXaLp_vWzS1yMEaQXdKAkAxyb1ihHUZHt0-0YAlrGfQNvYhtwqXUTccmkqmk_68ER9qaOw",
  imageAlt:
    "Modern high-end architectural building in Dakar with clean glass lines and blue sky reflecting in windows",
} as const

export const beaContactForm = {
  title: "Institutional Inquiry",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Dr. John Doe",
      type: "text" as const,
    },
    {
      name: "organization",
      label: "Organization",
      placeholder: "Global Institute",
      type: "text" as const,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "contact@institution.org",
      type: "email" as const,
    },
    {
      name: "serviceInterest",
      label: "Service Interest",
      type: "select" as const,
      options: ["Consultancy", "Training", "Mentoring"],
    },
    {
      name: "message",
      label: "Message",
      placeholder: "How can B.E.A support your vision?",
      type: "textarea" as const,
    },
  ],
  submitLabel: "Submit Request",
} as const

export const beaContactLocation = {
  title: "Dakar Office",
  subtitle: "Headquarters",
  address: "Rufisque Ouest, Dakar, Senegal",
  subAddress: "Strategic Information Hub",
  email: "office@bea-afrique.sn",
  phone: "+221 33 800 00 00",
  mapImageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC6I04oU0uo1LyeCuVeHBcEIp1NeB94C-eFN5xcVagrya-BDh8ca5y6i6BZsW2Ryo18y6X7h53lP7LJnawNnbR_KfsEBhtGwND2Ptc3wZ_Wyl3h39e_6HC3QBTFBeuhz6X3wPlBNJNWfPGH0B4e9rsfpxGCgOcOEgIyy1WilaICEc45XiTsjx6YUvLnbWIbqVffK21VHd__OmIrCflsxjdEryHW3nxjlXmB4Aej_T7N-ekp6V35-iwQ9V5_eQHn0q_bZCD1c2lJlg",
  mapImageAlt:
    "Clean minimal architectural map of Rufisque Ouest area in Dakar with simple blue and grey tones",
} as const

export const beaContactInquiries = {
  title: "Specific Inquiries",
  sections: [
    {
      title: "Consultancy Inquiries",
      description:
        "Institutional strategy and architectural auditing requests.",
      icon: "architecture" as const,
      href: "#",
    },
    {
      title: "Training Admissions",
      description:
        "Enrollment information for our certified training programs.",
      icon: "school" as const,
      href: "#",
    },
  ],
} as const
