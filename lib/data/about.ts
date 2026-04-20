export type BeaAboutNavLink = Readonly<{
  label: string
  href: string
  active?: boolean
}>

export type BeaAboutFooterLink = Readonly<{
  label: string
  href: string
}>

export type BeaAboutValue = Readonly<{
  icon: string
  title: string
  description: string
  tone?: "brand" | "neutral" | "soft"
}>

export type BeaAboutLeader = Readonly<{
  name: string
  role: string
  expertise: string
  imageSrc: string
  imageAlt: string
}>

export const beaAboutNavLinks: readonly BeaAboutNavLink[] = [
  { label: "Our Vision", href: "#" },
  { label: "Strategy", href: "/consultancy" },
  { label: "Architecture", href: "#" },
  { label: "Commitments", href: "/about", active: true },
]

export const beaAboutHero = {
  eyebrow: "Established Excellence",
  title: "Our Legacy of Excellence",
  description:
    "Forging the architectural backbone of African business through intellectual rigor and strategic precision.",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwytnxJS8Z3yKUNT7vjucbeVp4xE5UConlmrTEx__jmAELgfem-G6jbM_8vX6rMSprPcqEVtphTJw9-a_REk9uhY1fVmb6c5dfxjNOVFJsmeuJnC2AxwxN6xYN3NSytOEGxJwoyM4JQHW4SdlRJ0Q_yjsxYzTvWmueiT0xTi2LruTymDoFVXvA0NX3vnpYvI3VnDKhyARSrK9EWsnonyA4CFDbZKamgKyJsgC-DXd-sZjGWklChsyfO9WFNlYyquIODZjeDdlA0g",
  imageAlt:
    "Modern minimalist architectural office in Dakar with clean lines, glass walls, and bright natural light casting geometric shadows",
} as const

export const beaAboutMission = {
  title: "Architecting the Future of African Business",
  body:
    "BOSSE ELANPRO AFRIQUE (B.E.A.) stands as a beacon of institutional development in Dakar. We believe that true progress is built on a foundation of structural integrity and academic precision. Our vision is to empower the next generation of African leaders with the tools to navigate a globalized economy.",
  cards: [
    {
      icon: "visibility",
      title: "Our Vision",
      description:
        "To become the premier architectural firm for organizational strategy in West Africa.",
    },
    {
      icon: "rocket_launch",
      title: "Our Mission",
      description:
        "Bridging the gap between academic theory and operational excellence in Dakar's corporate landscape.",
    },
  ] as const,
} as const

export const beaAboutStory = {
  title: "The Genesis in Dakar",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEFJC1CmNQBgyByJLZ-K2MKYQj1c5m27Kv_p4VahMSdiFkd-ImGq78s12BWBP19U2RTCyfDyHUOIKbEhBalmDqCEgnEa7zBZeLVJcUQ0C0Mqv1CpyUNOA9NR3t835_CjceYMbnKvMp0q2ijD7R8-mZW27219D3D22JKqR7uTlNEnYKY8AuTI6TedBXmY1Ts57uDgv00VCQeCS8DqhqGYLJGG0RwlBL8ygT5a5H2dGvNTCvs1_eaz3-QcsYv_2MB5PRUSLdLueVtw",
  imageAlt:
    "Aerial view of Dakar business district with modern high-rise buildings and Atlantic ocean in the background at twilight",
  paragraphs: [
    "Founded on the principles of precision and local insight, B.E.A. emerged as a response to the growing need for high-tier consultancy in Senegal. From our headquarters in Rufisque Ouest, we have cultivated a reputation for intellectual rigor and unwavering commitment to client success.",
    "Our journey began with a simple premise: African businesses deserve world-class architectural strategies tailored to the unique pulse of our regional economy. Today, B.E.A. is synonymous with excellence in consultancy and training.",
  ] as const,
} as const

export const beaAboutValues = {
  title: "Our Foundational Values",
  items: [
    {
      icon: "lightbulb",
      title: "Innovation",
      description:
        "We don't just follow trends; we architect them. Our approach integrates cutting-edge digital transformations with traditional business wisdom.",
      tone: "neutral",
    },
    {
      icon: "verified",
      title: "Integrity",
      description:
        "The bedrock of our institution. We operate with absolute transparency and ethical clarity in every partnership.",
      tone: "brand",
    },
    {
      icon: "school",
      title: "Academic Rigor",
      description:
        "Our training programs and consulting frameworks are built on validated pedagogical research and empirical data.",
      tone: "neutral",
    },
    {
      icon: "query_stats",
      title: "Strategic Resilience",
      description:
        "Developing adaptive structures that withstand market volatility and foster long-term growth.",
      tone: "soft",
    },
  ] as const satisfies readonly BeaAboutValue[],
} as const

export const beaAboutLeadership = {
  title: "Architects of Vision",
  leaders: [
    {
      name: "Moussa Diop",
      role: "Managing Director",
      expertise: "Expert in Strategic Macroeconomics.",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKpLfBpUhuOlzWaHadIr6DHmR0rr2_8auMRXMRq0LUKvI_sCc1oIZyfdxEPESTdqQwb8gxZtWjkwfBJs0y2v42YTyPFRUSi3taf_CKhUpQlAvSfkt7k1eJ0cYuvbVRwlrP2blJpYBrnkjwToiXeTToD-fXRMnsKv3IHyqwAO9VNAMgkmx-ZOr5EnY8LXVrBLC351-nqfejie_uRkVcTHFpBoNIrOIumT0xbvxNHeNHt55ISkfiibE8CH03sGtlY7hubNJwHeJL6g",
      imageAlt:
        "Professional portrait of a West African male executive in a tailored navy suit with a sharp, intelligent gaze",
    },
    {
      name: "Fatou Ndiaye",
      role: "Head of Training",
      expertise: "Pedagogical Innovation Specialist.",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAIAQxnmwfAR0LyRq8powETmdd4dFD7oG3oYOcpXb1nGxc8bY98DQ4U0CHFIEv9LqOPGKB3WH1ALouhcraC1SAnpwo_QVnCuHUx-ZmWaGjj8fTqLwEZARzc9supyrK3MskWw-MW_21ZkKSyXlZEWWPuhl_4TjFypncqM5_2eicYmLDphUNPRHKgwE8QlISgTde3oS7od0QXdJiJdT1S-ftb9FraZ7m8b6JUHaeMKGWX5sycbhKZ8jnAEKHFX5XCf6TH8MGqu7-nHA",
      imageAlt:
        "Professional portrait of a West African female executive in a white silk blouse with minimalist silver jewelry",
    },
    {
      name: "Oumar Sall",
      role: "Principal Consultant",
      expertise: "Corporate Architecture & Structure.",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC8RghciF_b3CDTj7FcMpMXUQvY1WwYbkK5Ucer3UgF21pHUhsxLrJ8oXpyMZ25IS2KzEEBG_4XM30kJbPdO23ThxaK6vQr_0legyWIwgJYHqQORt-cNQaeTxv6yWEsczqcOPl_blZnvYEAh0hKNSEH6s-N4C7XWCqtVjCMYarp4mt79Kg-ShYO8N7d6V1SURepDtOWj2K-Gb6N8pwdezXHu7CXN3rBG03yf1aSIVbcpgTm6SJCKns3l1QPUCUl5TcWdqopI5V_Rg",
      imageAlt:
        "Mid-shot of a professional consultant in an architectural studio setting, looking contemplative",
    },
    {
      name: "Awa Fall",
      role: "Director of Ethics",
      expertise: "Institutional Integrity Advisor.",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKtxQEabqDRNfSZAgK-QHadufahotUo3PGIVoaiJmhk-P1LpBiosZEL_dh5QYgExDMrAD8zGhAD9LdX9Lq9h315NbwqeHKscyRon5RxLkO9qEdnKO04PfmEGzpI38PdYK6giMjyvHB5JcADHcR0nnhQ0YgQpB9YppZAZloljnQ6G-fiPChTLbZ5yj_qpSin4tFHbob8_W2foQaOw2uMysT-dHptG4obdYxOiwX8gkwgw7yIOX7INnhInMbviBdPR2iBlxyhSqqUQ",
      imageAlt:
        "Professional headshot of a young business woman with a bright confident smile and modern professional attire",
    },
  ] as const satisfies readonly BeaAboutLeader[],
} as const

export const beaAboutInstitution = {
  title: "Our Institutional Anchor",
  stats: [
    { value: "10,000,000", label: "FCFA Registered Capital" },
    { value: "Rufisque", label: "West Dakar HQ" },
  ] as const,
  buttonLabel: "Partner with Us",
  backgroundIcons: [
    "architecture",
    "domain",
    "account_balance",
    "architecture",
    "domain",
    "account_balance",
  ] as const,
} as const

export const beaAboutFooter = {
  copyright:
    "© 2024 BOSSE ELANPRO AFRIQUE (B.E.A.). Registered Capital: 10,000,000 FCFA. Headquarters: Rufisque Ouest, Dakar, Senegal.",
  links: [
    { label: "Legal Mentions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Institutional Ethics", href: "#" },
  ] as const satisfies readonly BeaAboutFooterLink[],
} as const
