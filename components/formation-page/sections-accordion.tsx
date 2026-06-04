"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import type { Avi, FormationWithRelations } from "@/lib/data"
import {
  Star,
  Target,
  BookOpen,
  User,
  Wallet,
  MessageSquare,
  Link,
  Clock,
} from "lucide-react"
import LinkNext from "next/link"
import { TipTapContent } from "@/components/formation-page/tiptap-content"

type SectionsAccordionProps = {
  description: string
  objectifs: string[]
  programmes: string | null
  pourQui: string | null
  financement: string | null
  avis: Avi[]
  complementaryFormations: FormationWithRelations[]
  programmePdfHref: string | null
}

const sectionMeta = {
  description: { icon: BookOpen, label: "Description" },
  objectifs: { icon: Target, label: "Objectifs" },
  programme: { icon: BookOpen, label: "Programme" },
  pourQui: { icon: User, label: "Pour qui ?" },
  financement: { icon: Wallet, label: "Financement" },
  avis: { icon: MessageSquare, label: "Avis" },
  complementaires: { icon: Link, label: "Formations complémentaires" },
}

function SectionIcon({
  icon: Icon,
  label,
}: {
  icon: React.ElementType
  label: string
}) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-bea-primary/10 text-bea-primary">
      <Icon className="size-4" />
    </span>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-bea-surface-dim text-bea-outline-variant"}`}
        />
      ))}
    </div>
  )
}

function AvisCard({ avi }: { avi: Avi }) {
  return (
    <div className="rounded-2xl border border-bea-outline-variant bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-bea-on-surface">
          {avi.name}
        </span>
        <StarRating rating={avi.rating} />
      </div>
      {avi.comment && (
        <p className="text-sm leading-relaxed text-bea-on-surface-variant">
          {avi.comment}
        </p>
      )}
    </div>
  )
}

export function FormationSectionsAccordion({
  description,
  objectifs,
  programmes,
  pourQui,
  financement,
  avis,
  complementaryFormations,
  programmePdfHref,
}: SectionsAccordionProps) {
  return (
    <Accordion
      multiple
      className="border-0"
      defaultValue={[
        "description",
        "objectifs",
        "programme",
        "pourQui",
        "financement",
        "avis",
        "complementaires",
      ]}
    >
      {description && (
        <AccordionItem value="programme" id="programme">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.description.icon}
                label={sectionMeta.description.label}
              />
              <span className="font-semibold">
                {sectionMeta.description.label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TipTapContent html={description} />
          </AccordionContent>
        </AccordionItem>
      )}
      {objectifs.length > 0 && (
        <AccordionItem value="objectifs" id="objectifs">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.objectifs.icon}
                label={sectionMeta.objectifs.label}
              />
              <span className="font-semibold">
                {sectionMeta.objectifs.label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-bea-on-surface-variant">
              {objectifs.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {programmes && (
        <AccordionItem value="programme" id="programme">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.programme.icon}
                label={sectionMeta.programme.label}
              />
              <span className="font-semibold">
                {sectionMeta.programme.label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TipTapContent html={programmes} />
          </AccordionContent>
        </AccordionItem>
      )}

      {pourQui && (
        <AccordionItem value="pourQui" id="pourQui">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.pourQui.icon}
                label={sectionMeta.pourQui.label}
              />
              <span className="font-semibold">{sectionMeta.pourQui.label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TipTapContent html={pourQui} />
          </AccordionContent>
        </AccordionItem>
      )}

      {financement && (
        <AccordionItem value="financement" id="financement">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.financement.icon}
                label={sectionMeta.financement.label}
              />
              <span className="font-semibold">
                {sectionMeta.financement.label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TipTapContent html={financement} />
          </AccordionContent>
        </AccordionItem>
      )}

      {avis.length > 0 && (
        <AccordionItem value="avis" id="avis">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.avis.icon}
                label={sectionMeta.avis.label}
              />
              <span className="font-semibold">{sectionMeta.avis.label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3">
              {avis.map((a) => (
                <AvisCard key={a.id} avi={a} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {complementaryFormations.length > 0 && (
        <AccordionItem value="complementaires" id="complementaires">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <SectionIcon
                icon={sectionMeta.complementaires.icon}
                label={sectionMeta.complementaires.label}
              />
              <span className="font-semibold">
                {sectionMeta.complementaires.label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3">
              {complementaryFormations.map((f) => (
                <LinkNext
                  key={f.id}
                  href={`/formations/${f.slug}`}
                  className="group rounded-2xl border border-bea-outline-variant bg-white p-4 transition-colors hover:border-bea-primary/30"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {(f.badges ?? []).map((badge) => (
                      <span
                        key={badge.id}
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          backgroundColor: badge.color + "18",
                          color: badge.color,
                        }}
                      >
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: badge.color }}
                        />
                        {badge.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-bea-on-surface group-hover:text-bea-primary">
                      {f.title}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-bea-on-surface-variant">
                      {f.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {f.duration}
                        </span>
                      )}
                      <span className="font-medium text-bea-on-surface">
                        {f.priceVisible
                          ? f.salePrice || f.price || "Sur demande"
                          : "Sur demande"}
                      </span>
                    </div>
                  </div>
                </LinkNext>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}
