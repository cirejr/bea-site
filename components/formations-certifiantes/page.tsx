import { getTranslations } from "next-intl/server"
import { ArrowRight, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFormations } from "@/lib/data"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { TipTapContent } from "../formation-page/tiptap-content"

export async function FormationsCertifiantesPage() {
  const t = await getTranslations("formationsCertifiantes")
  const formations = await getFormations({ badgeSlug: "certifiant" })

  const isEmpty = formations.length === 0
  const featured = formations[0]
  const rest = formations.slice(1)

  const domainIds = new Set(formations.map((f) => f.domain.id))
  const onlineCount = formations.filter((f) =>
    f.modalities.some((m) => m.slug === "distance")
  ).length
  const onlinePercent =
    formations.length > 0
      ? Math.round((onlineCount / formations.length) * 100)
      : 0

  const grouped = new Map<
    number,
    { id: number; label: string; items: typeof rest }
  >()
  for (const f of rest) {
    if (!grouped.has(f.domain.id)) {
      grouped.set(f.domain.id, {
        id: f.domain.id,
        label: f.domain.label,
        items: [],
      })
    }
    grouped.get(f.domain.id)!.items.push(f)
  }
  const groups = Array.from(grouped.values())

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f4] pt-20">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 right-1/4 h-[520px] w-[520px] rounded-full bg-bea-primary/20 blur-[140px]" />
        <div className="absolute top-1/3 left-0 h-[420px] w-[420px] rounded-full bg-fuchsia-300/15 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[380px] w-[380px] rounded-full bg-cyan-300/15 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-8 md:py-16">
        <section className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-bea-primary uppercase">
              <span className="h-px w-8 bg-bea-primary" />
              {t("heroEyebrow")} — {t("eyebrow")}
            </div>
            <h1 className="font-bea-headline text-4xl leading-[1.05] tracking-tight text-bea-on-surface md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-br from-bea-on-surface via-bea-on-surface to-bea-primary bg-clip-text text-transparent">
                {t("heroTitle")}
              </span>
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="font-bea-body text-lg leading-relaxed text-bea-on-surface-variant">
              {t("heroLead")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                render={
                  <Link href="/contact?interest=programme&badge=certifiant" />
                }
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={
                  <Link href="/contact?interest=brochure&badge=certifiant" />
                }
              >
                <FileText className="h-4 w-4" />
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </section>

        {!isEmpty && (
          <div className="flex flex-wrap items-center gap-6 rounded-2xl border-y border-bea-outline-variant/60 bg-white/40 px-4 py-4 text-sm text-bea-on-surface-variant backdrop-blur-sm">
            <span className="font-semibold tracking-widest text-bea-primary uppercase">
              {t("stat1", { count: formations.length })}
            </span>
            <span>·</span>
            <span>{t("stat2", { count: domainIds.size })}</span>
            <span>·</span>
            <span>{t("stat3", { percent: onlinePercent })}</span>
          </div>
        )}

        {isEmpty ? (
          <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/30 px-6 py-14 text-center shadow-sm backdrop-blur-md md:px-10 md:py-20">
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bea-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-300/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
            <div className="relative mx-auto flex max-w-xl flex-col items-center">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-bea-primary/20 bg-white/70 text-bea-primary backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="font-bea-headline text-2xl text-bea-on-surface md:text-3xl">
                {t("empty.title")}
              </h2>
              <p className="mt-3 max-w-md font-bea-body text-base text-bea-on-surface-variant">
                {t("empty.body")}
              </p>
              <Button
                size="lg"
                className="mt-7"
                render={
                  <Link href="/contact?interest=certification&badge=certifiant" />
                }
              >
                {t("emptyCta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        ) : (
          <>
            {featured && (
              <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/30 p-6 shadow-sm backdrop-blur-md md:p-10">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bea-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />
                <div className="relative grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-bea-primary/15 via-white/30 to-fuchsia-300/15 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_50%)]" />

                      <Image
                        src="/formations-certifiantes.jpg"
                        alt={featured.title}
                        className="object-cover"
                        fill
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center md:col-span-7">
                    <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-bea-primary/20 bg-white/60 px-3 py-1 text-xs font-semibold tracking-widest text-bea-primary uppercase backdrop-blur-sm">
                      {t("featured")}
                    </div>
                    <h2 className="mb-3 font-bea-headline text-3xl tracking-tight text-bea-on-surface md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="font-bea-body text-base text-bea-on-surface-variant">
                      <TipTapContent
                        html={
                          (featured.summary ?? featured.description) as string
                        }
                      />
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/formations/${featured.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-bea-primary hover:underline"
                      >
                        {t("featuredCta")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-10">
              {groups.map((group) => (
                <div key={group.id}>
                  <h3 className="mb-4 font-bea-headline text-2xl text-bea-on-surface">
                    <span className="text-bea-primary">§</span> {group.label}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((f) => (
                      <Link
                        key={f.id}
                        href={`/formations/${f.slug}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/40 p-5 backdrop-blur-md transition-all hover:border-bea-primary/40 hover:bg-white/60 hover:shadow-sm"
                      >
                        <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-bea-primary/0 blur-2xl transition-all duration-500 group-hover:bg-bea-primary/15" />
                        <div className="relative">
                          <div className="mb-2 text-xs font-semibold tracking-widest text-bea-primary uppercase">
                            {f.domain.label}
                          </div>
                          <h4 className="mb-2 font-bea-headline text-lg leading-snug text-bea-on-surface">
                            {f.title}
                          </h4>
                          {f.summary && (
                            <p className="line-clamp-3 text-sm text-bea-on-surface-variant">
                              {f.summary}
                            </p>
                          )}
                          <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-bea-primary opacity-0 transition-opacity group-hover:opacity-100">
                            <span>{t("featuredCta")}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bea-primary via-bea-primary to-fuchsia-600 px-6 py-10 text-white shadow-lg md:px-12 md:py-16">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-bea-headline text-3xl tracking-tight md:text-4xl">
                {t("ctaSection.title")}
              </h2>
              <p className="mt-3 max-w-md text-white/85">
                {t("ctaSection.body")}
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/95 backdrop-blur-sm hover:bg-white"
                render={
                  <Link href="/contact?interest=conseiller&badge=certifiant" />
                }
              >
                {t("ctaSection.button")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
