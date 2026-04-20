import Image from "next/image"
import { useTranslations } from "next-intl"

export type BeaAboutLeadershipSectionProps = Readonly<Record<string, never>>

export function BeaAboutLeadershipSection(_props: BeaAboutLeadershipSectionProps) {
  const t = useTranslations("about.leadership")

  const leaders = [
    { name: "Dr. Ibrahima Ndiaye", role: "Managing Partner", expertise: "Strategic Architecture", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKpLfBpUhuOlzWaHadIr6DHmR0rr2_8auMRXMRq0LUKvI_sCc1oIZyfdxEPESTdqQwb8gxZtWjkwfBJs0y2v42YTyPFRUSi3taf_CKhUpQlAvSfkt7k1eJ0cYuvbVRwlrP2blJpYBrnkjwToiXeTToD-fXRMnsKv3IHyqwAO9VNAMgkmx-ZOr5EnY8LXVrBLC351-nqfejie_uRkVcTHFpBoNIrOIumT0xbvxNHeNHt55ISkfiibE8CH03sGtlY7hubNJwHeJL6g", imageAlt: "Dr. Ibrahima Ndiaye" },
    { name: "Aïda Sow", role: "Director of Consultancy", expertise: "OHADA Compliance", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIAQxnmwfAR0LyRq8powETmdd4dFD7oG3oYOcpXb1nGxc8bY98DQ4U0CHFIEv9LqOPGKB3WH1ALouhcraC1SAnpwo_QVnCuHUx-ZmWaGjj8fTqLwEZARzc9supyrK3MskWw-MW_21ZkKSyXlZEWWPuhl_4TjFypncqM5_2eicYmLDphUNPRHKgwE8QlISgTde3oS7od0QXdJiJdT1S-ftb9FraZ7m8b6JUHaeMKGWX5sycbhKZ8jnAEKHFX5XCf6TH8MGqu7-nHA", imageAlt: "Aïda Sow" },
    { name: "Moussa Diop", role: "Training Director", expertise: "Financial Systems", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8RghciF_b3CDTj7FcMpMXUQvY1WwYbkK5Ucer3UgF21pHUhsxLrJ8oXpyMZ25IS2KzEEBG_4XM30kJbPdO23ThxaK6vQr_0legyWIwgJYHqQORt-cNQaeTxv6yWEsczqcOPl_blZnvYEAh0hKNSEH6s-N4C7XWCqtVjCMYarp4mt79Kg-ShYO8N7d6V1SURepDtOWj2K-Gb6N8pwdezXHu7CXN3rBG03yf1aSIVbcpgTm6SJCKns3l1QPUCUl5TcWdqopI5V_Rg", imageAlt: "Moussa Diop" },
    { name: "Fatou Thiam", role: "HR Strategy Lead", expertise: "Organizational Design", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKtxQEabqDRNfSZAgK-QHadufahotUo3PGIVoaiJmhk-P1LpBiosZEL_dh5QYgExDMrAD8zGhAD9LdX9Lq9h315NbwqeHKscyRon5RxLkO9qEdnKO04PfmEGzpI38PdYK6giMjyvHB5JcADHcR0nnhQ0YgQpB9YppZAZloljnQ6G-fiPChTLbZ5yj_qpSin4tFHbob8_W2foQaOw2uMysT-dHptG4obdYxOiwX8gkwgw7yIOX7INnhInMbviBdPR2iBlxyhSqqUQ", imageAlt: "Fatou Thiam" },
  ]

  return (
    <section className="bg-bea-surface py-32">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 text-center font-bea-headline text-4xl font-black tracking-tight text-bea-primary">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {leaders.map((leader) => (
            <div key={leader.name} className="group">
              <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-bea-lg bg-[#E5E4E2]">
                <Image
                  src={leader.imageSrc}
                  alt={leader.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <h4 className="font-bea-headline text-lg font-bold text-bea-primary">{leader.name}</h4>
              <p className="mb-2 font-bea-label text-sm text-bea-secondary">{leader.role}</p>
              <p className="font-bea-body text-xs italic text-bea-on-surface-variant">
                {leader.expertise}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
