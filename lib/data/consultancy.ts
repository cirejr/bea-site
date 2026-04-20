export type BeaConsultancyNavLink = Readonly<{
  label: string
  href: string
}>

export type BeaConsultancyFooterLink = Readonly<{
  label: string
  href: string
  underlined?: boolean
}>

export const beaConsultancyNavLinks: readonly BeaConsultancyNavLink[] = [
  { label: "Services", href: "#" },
  { label: "HR Strategy", href: "#" },
  { label: "Financial Audit", href: "#" },
  { label: "Mentoring", href: "#" },
  { label: "About", href: "/about" },
]

export const beaConsultancyFooter = {
  tagline: "© 2024 BOSSE ELANPRO AFRIQUE. The Academic Architect.",
  links: [
    { label: "Strategic Strategy", href: "#", underlined: true },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ] as const satisfies readonly BeaConsultancyFooterLink[],
} as const

export const beaConsultancyHero = {
  title: "Strategic Excellence in African Business",
  description:
    "Tailored consultancy services designed for sustainable growth, navigating the unique complexities of the regional landscape with academic rigor and architectural precision.",
  primaryCta: "Explore Our Strategy",
  secondaryCta: "View Case Studies",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC-cvD01rAfC_jZ-wCoj5QSXJ3e76Q5fPQw0ShVHQzwonvpaHSrEEHGvPGLJuwUc-Nv3zMo4bmk9az3Xj8IY4lXbOS5QTjeIoXv7gf_yWlrjQ2v2Dun3cx9NLwu7T4q9tUVVUg-a-CoEX1_6mNBJ9iJfGzqNZzPnFMdJFcFCZUk7nysdkE0muBo93guQdqkc6CIdqO8Hd64AJYOqGxM_-qn0OHQORWz1fBnp2WdTMRUATpUknv2chKAKVwYA5aVFDSHqFpD5HtgsQ",
  imageAlt:
    "Modern glass architectural structure with sharp angles reflecting a clear blue sky at dawn, symbolizing corporate strength and transparency.",
} as const

export const beaConsultancyCoreIntro = {
  eyebrow: "The Pillars of Success",
  title: "Integrated Solutions.",
  description:
    "We build institutional health through a synthesis of human talent, financial integrity, and structural agility.",
} as const

export const beaConsultancyHrBlock = {
  title: "HR Strategy",
  description:
    "Optimization of human capital through bespoke performance systems and organizational design. We align your people with your long-term vision.",
  bullets: [
    "Talent Acquisition Systems",
    "Performance Management",
    "Org Design & Culture",
  ] as const,
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_qvAuGOsHjliUaQzTBv7jGicNWcT81ENvyqBOSk6Chthydm-A7fELuUSsxnbb-sSVnNzuk1OwCuI5EjyPsgj_n3O5h1tLM2jNR7Qe3hkj_20ZswbMpN5vhH9Zcwk9_4mz-9huB0LVfJci_023Z28jbRPYndLCZbB-HuMJNkckjGLfK-U_SVk2dXbiByMLXv2N_R3J4MM5b8DRFPv7bQPyLUVGZ4ECzhMxiLW9rtl-nNTHOxrhoHWEjLv4553FsbBRsAFa7BtnPw",
  imageAlt:
    "A professional collaborative workspace where diverse business executives are engaged in a strategic planning session around a light wood table.",
} as const

export const beaConsultancyAuditBlock = {
  title: "Financial Audits",
  description:
    "Rigorous oversight and internal controls with a focus on SYSCOHADA compliance and transparency.",
  calloutTitle: "Compliance First",
  calloutSubtitle: "Global standards, local expertise.",
} as const

export const beaConsultancyTransformBlock = {
  title: "Organizational Transformation",
  description:
    "We guide institutions through systemic change, ensuring agility and long-term vitality. Our transformation framework is built on resilience and the architecture of progress.",
  stats: [
    { value: "45%", label: "Average Efficiency Growth" },
    { value: "98%", label: "Compliance Retention" },
  ] as const,
} as const

export const beaConsultancyLeadership = {
  title: "Leadership Mentoring",
  subtitle: "Elevating decision-makers through structured, intellectual engagement.",
  individual: {
    title: "Individual Track",
    description:
      "A high-stakes coaching environment for C-suite executives focusing on personal leadership philosophy, emotional intelligence, and strategic visioning.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9OdaKHYnLMHSmoZEta86o8SCOoyZ-XhN7vLXpSSyMnuei2BAUA2E981kSw38Avn5Ys3U9MAWXuMonEztDAoInsnPJ_qob2xvsL3xtzLmxYX8SlMZoW3bXk5TwykNxpPd2sSgtgWSQmsHhjQeqlExLwKbOotwaRzMOLTJpqYNn6jAbOpVhNRxiG9vGBwPsnQjrRqSrvvmwsl2sMv2fOeIR4Vlp6siocUu2fyQQmvxhIrtxsSnUdRjNvgEsVmAIPe5Afk2zg-fYXQ",
    imageAlt:
      "A focused close-up of a senior executive in a deep blue suit looking thoughtfully out of a high-rise office window at the city horizon.",
    highlights: [
      { icon: "psychology" as const, title: "Executive Resilience", subtitle: "Mental framework for high-pressure environments." },
      { icon: "auto_graph" as const, title: "Strategic Foresight", subtitle: "Mastering the art of 10-year planning." },
    ],
  },
  collective: {
    title: "Collective Track",
    description:
      "Team-based acceleration focusing on collective intelligence, trust building, and unified strategic execution for management committees.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJJufRpfXPhweaSFt6i_fpatJLAdeAWLpJp9gfvRdxDr58bqzp9w0MTdA5YQKzUrJ2mDoTQiD7FD8r8TUL0MCgmnAbvV98HTitGAGhX_intHWx2-8naEki7AX_LdOuuvg1eDfjST38r5o3LpxTYTWbEryxdyfz2jRKQW99r_zspQ82h-llsMnHGCztef-swpyT5m2GsSQ_AVUz9tQcUqjx9Rslgfvd1aFfU6vvCdCSfVeWBBR6FEHRTIvUSHvXoIxoSupKfmB4jg",
    imageAlt:
      "A group of corporate leaders engaged in a high-level workshop, sketching out complex system diagrams on a large whiteboard.",
    highlights: [
      { icon: "hub" as const, title: "Synergy Calibration", subtitle: "Aligning departmental goals with the master plan." },
      { icon: "forum" as const, title: "Conflict Resolution", subtitle: "Architecture of healthy debate and resolution." },
    ],
  },
} as const

export const beaConsultancyMethodology = {
  eyebrow: "The Methodology",
  title: "The Academic Architect",
  body:
    "Our approach is not founded on fleeting trends but on the immutable laws of structural integrity—applied to business. We blend deep academic research with the precision of a master architect.",
  quote: "Advice without rigor is merely opinion. We provide blueprints for endurance.",
  attribution: "— B.E.A. Core Philosophy",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3UYXbYRcssoCgX-quWEc7qbx9_FHRjPrHx4nzOLMHA7uO6xe0niIC3KTX5uUuuiSTaprMMjHnBkfR43HF0Fxf9c6nkH-Gdg1lAjr1z9f-inwj80DCZ766O9IKhG4IGxRyUcn5Q6-LbWzOfbxctRRWCp1gGIqqzFb7Vx-rvM6YfWPrJ5cVgrdG_8f1o4SAkB1kMrIbPYaHe7UPWCAXS3hF3ZGhJKAtMP6Zm5lxSMW3xEK_LOxyNkDm6boB4bnCGgjdzHSHHrjQzg",
  imageAlt:
    "A grand, high-ceiling library with floor-to-ceiling bookshelves and soft ambient lighting, representing academic rigor and deep knowledge.",
} as const

export const beaConsultancyFinalCta = {
  title: "Partner for Growth",
  description:
    "Ready to transform your organizational landscape? Let's architect your future together.",
  buttonLabel: "Request a Consultation",
} as const
