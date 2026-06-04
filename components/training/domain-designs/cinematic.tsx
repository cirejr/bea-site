import { ArrowDown, GraduationCap, Sparkles } from "lucide-react"
import { DomainFilterAndGrid } from "./parts/domain-filter-and-grid"
import { DomainHeroImage } from "./parts/domain-hero-image"
import { FeaturedRow } from "./parts/featured-row"
import { SubCategoryCardGrid } from "./parts/sub-category-card-grid"
import {
  getFeaturedFormationsByDomain,
  type getDomainPageData,
} from "@/lib/data"

export type DomainDesignCinematicProps = {
  slug: string
  locale: "fr" | "en"
  data: NonNullable<Awaited<ReturnType<typeof getDomainPageData>>>
}

export async function DomainDesignCinematic({
  slug,
  locale,
  data,
}: DomainDesignCinematicProps) {
  const {
    domain,
    formations,
    domainSubCategories,
    formationCounts,
    modalities,
  } = data
  const featured = (await getFeaturedFormationsByDomain(slug)).map(
    (r) => r.formation
  )
  return (
    <div>
      <div className="relative -mx-4 mb-14 h-[420px] overflow-hidden md:-mx-8 md:h-[560px]">
        <DomainHeroImage
          slug={slug}
          locale={locale}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 md:px-8 md:pb-14">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-white/80 uppercase">
            <GraduationCap className="h-4 w-4" />
            Domaine de formation
          </div>
          <h1 className="mb-4 max-w-3xl font-bea-headline text-5xl leading-[0.95] font-black tracking-tighter text-white md:text-7xl">
            Formation {domain.label}
          </h1>
          <p className="max-w-2xl font-bea-body text-base leading-relaxed text-white/85 md:text-lg">
            {domain.description ??
              `Découvrez les formations du domaine ${domain.label}.`}
          </p>
          <a
            href="#catalogue"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            Explorer les formations
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-bea-primary/10">
              <Sparkles className="h-4 w-4 text-bea-primary" />
            </div>
            <h2 className="font-bea-headline text-xl font-black tracking-tighter text-bea-primary">
              Formations mises en avant
            </h2>
          </div>
          <FeaturedRow formations={featured} />
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <SubCategoryCardGrid
          domainSlug={slug}
          subCategories={domainSubCategories}
          formationCounts={formationCounts}
          title="Explorez les sous-catégories"
          eyebrow="Catalogue"
        />

        <section id="catalogue" className="mb-8">
          <h2 className="mb-2 text-xs font-bold tracking-widest text-bea-primary uppercase">
            Recherche
          </h2>
          <h3 className="mb-6 font-bea-headline text-2xl font-black tracking-tighter text-bea-primary md:text-3xl">
            Trouvez votre formation
          </h3>
          <DomainFilterAndGrid
            activeDomain={slug}
            formations={formations}
            subCategories={domainSubCategories}
            modalities={modalities}
            showSubCategorySelect
            showModalityPills
          />
        </section>
      </div>
    </div>
  )
}
