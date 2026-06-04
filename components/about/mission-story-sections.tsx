import Image from "next/image"
import { useTranslations } from "next-intl"

import { BeaHugeicon } from "@/components/home/hugeicon"

export type BeaAboutMissionStorySectionsProps = Readonly<Record<string, never>>

export function BeaAboutMissionStorySections(
  _props: BeaAboutMissionStorySectionsProps
) {
  const tm = useTranslations("about.mission")
  const ts = useTranslations("about.story")

  return (
    <>
      <section className="bg-bea-surface-container-low py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 font-bea-headline text-4xl font-black tracking-tight text-bea-primary">
                {tm("title")}
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="mb-8 font-bea-body text-xl leading-relaxed text-bea-on-surface">
                {tm("body")}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="rounded-bea-lg bg-bea-surface-container-lowest p-8">
                  <BeaHugeicon
                    name="visibility"
                    className="mb-4 text-bea-primary"
                  />
                  <h3 className="mb-2 font-bea-headline font-bold text-bea-primary">
                    {tm("visionTitle")}
                  </h3>
                  <p className="font-bea-body text-sm text-bea-secondary">
                    {tm("visionDescription")}
                  </p>
                </div>
                <div className="rounded-bea-lg bg-bea-surface-container-lowest p-8">
                  <BeaHugeicon name="flag" className="mb-4 text-bea-primary" />
                  <h3 className="mb-2 font-bea-headline font-bold text-bea-primary">
                    {tm("missionTitle")}
                  </h3>
                  <p className="font-bea-body text-sm text-bea-secondary">
                    {tm("missionDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bea-surface py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="w-full overflow-hidden rounded-bea-lg bg-bea-surface-container shadow-xl md:w-1/2">
              <Image
                src="/genese.jpg"
                alt={ts("title")}
                width={900}
                height={900}
                className="aspect-square w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="mb-8 font-bea-headline text-3xl font-black tracking-tight text-bea-primary">
                {ts("title")}
              </h2>
              <div className="space-y-6 font-bea-body leading-relaxed text-bea-on-surface-variant">
                <p>
                  BOSSE ELANPRO AFRIQUE (B.E.A.) was founded with a singular
                  vision: to bring architectural precision to organizational
                  strategy in West Africa.
                </p>
                <p>
                  From our headquarters in Dakar, we have built a reputation for
                  intellectual rigor and strategic insight, serving as the
                  backbone for institutional development across the region.
                </p>
                <p>
                  Our approach synthesizes academic theory with practical
                  expertise, creating structures that endure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
