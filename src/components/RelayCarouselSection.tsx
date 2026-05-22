import { useCallback, useEffect, useRef, useState } from 'react'
import { NeonHeading } from './NeonHeading'

const INTERVAL_MS = 3000

type Slide = { src: string; alt: string }

type RelayCarouselSectionProps = {
  titleId: string
  titleLines: string[]
  slides: readonly Slide[]
  carouselLabel: string
  layout: 'title-left' | 'title-right'
  titleCompact?: boolean
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M15 6L9 12L15 18' : 'M9 6L15 12L9 18'}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RelayCarouselSection({
  titleId,
  titleLines,
  slides,
  carouselLabel,
  layout,
  titleCompact = false,
}: RelayCarouselSectionProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const liveRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length)
  }, [slides.length])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === 'hidden')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (paused || hidden) return

    const id = window.setInterval(goNext, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, hidden, goNext])

  useEffect(() => {
    const el = liveRef.current
    if (!el) return
    el.textContent = `Nuotrauka ${index + 1} iš ${slides.length}: ${slides[index].alt}`
  }, [index, slides])

  const layoutClass =
    layout === 'title-left'
      ? 'relaySectionInner--titleLeft'
      : 'relaySectionInner--titleRight'

  const title = (
    <div className="relayTitleCol">
      <NeonHeading
        lines={titleLines}
        compact={titleCompact || titleLines.length > 2}
      />
    </div>
  )

  const carousel = (
    <div
      className="relayCarousel"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="relayCarouselViewport">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            className={`relayCarouselSlide${i === index ? ' isActive' : ''}${prefersReducedMotion ? ' relayCarouselSlide--noMotion' : ''}`}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}
        <div className="relayCarouselVignette" aria-hidden />

        <button
          type="button"
          className="relayCarouselArrow relayCarouselArrow--prev"
          aria-label="Ankstesnė nuotrauka"
          onClick={goPrev}
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          className="relayCarouselArrow relayCarouselArrow--next"
          aria-label="Kita nuotrauka"
          onClick={goNext}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="relayCarouselDots" role="tablist" aria-label="Pasirinkti nuotrauką">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            className={`relayCarouselDot${i === index ? ' isActive' : ''}`}
            aria-selected={i === index}
            aria-label={`${slide.alt} (${i + 1} iš ${slides.length})`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div ref={liveRef} className="sr-only" aria-live="polite" />
    </div>
  )

  return (
    <section className="relaySection" aria-labelledby={titleId}>
      <h2 id={titleId} className="sr-only">
        {titleLines.join(' ')}
      </h2>
      <div className={`relaySectionInner ${layoutClass}`}>
        {layout === 'title-left' ? (
          <>
            {title}
            {carousel}
          </>
        ) : (
          <>
            {carousel}
            {title}
          </>
        )}
      </div>
    </section>
  )
}

const WOMEN_SLIDES = [
  { src: '/relay/01-podium.png', alt: 'Moterų estafetės nugalėtojos ant podiumo' },
  { src: '/relay/02-baton.png', alt: 'Moterų estafetės dalyvė su estafetės batonu' },
  { src: '/relay/03-relay-race.png', alt: 'Moterų estafetės lenktynės trasoje' },
  { src: '/relay/04-sprint.png', alt: 'Moterų estafetės bėgikės finišo tiesiojoje' },
] as const

const MEN_SLIDES = [
  { src: '/relay-men/01-podium.png', alt: 'Vyrų estafetės nugalėtojai ant podiumo' },
  { src: '/relay-men/02-baton.png', alt: 'Vyrų estafetės estafetės perdavimas' },
  { src: '/relay-men/03-baton-pass.png', alt: 'Vyrų estafetės batono perdavimas trasoje' },
  { src: '/relay-men/04-baton-exchange.png', alt: 'Vyrų estafetės komandos draugų perdavimas' },
  { src: '/relay-men/05-baton-sprint.png', alt: 'Vyrų estafetės bėgikai perduoda batoną' },
  { src: '/relay-men/06-team.png', alt: 'Vyrų estafetės komanda prieš startą' },
  { src: '/relay-men/07-start.png', alt: 'Vyrų estafetės startas naktį' },
] as const

export function WomenRelayCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="women-relay-title"
      titleLines={['Moterų estafetė', '5x1km']}
      slides={WOMEN_SLIDES}
      carouselLabel="Moterų estafetės nuotraukos"
      layout="title-right"
    />
  )
}

export function MenRelayCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="men-relay-title"
      titleLines={['Vyrų estafetė', '5x1km']}
      slides={MEN_SLIDES}
      carouselLabel="Vyrų estafetės nuotraukos"
      layout="title-left"
    />
  )
}

const MIXED_SLIDES = [
  { src: '/relay-mixed/01-team.png', alt: 'Mišrios estafetės komanda su medaliais' },
  { src: '/relay-mixed/02-podium.png', alt: 'Mišrios estafetės nugalėtojai ant podiumo' },
  { src: '/relay-mixed/03-podium-group.png', alt: 'Mišrios estafetės komandos ant podiumo' },
  { src: '/relay-mixed/04-team-flag.png', alt: 'Mišrios estafetės komanda su vėliava' },
  { src: '/relay-mixed/05-celebration.png', alt: 'Mišrios estafetės komandos šventė' },
  { src: '/relay-mixed/06-baton-runner.png', alt: 'Mišrios estafetės dalyvė su batonu' },
  { src: '/relay-mixed/07-neon-runner.png', alt: 'Mišrios estafetės bėgikė naktį' },
  { src: '/relay-mixed/08-sprint.png', alt: 'Mišrios estafetės bėgimas su batonu' },
  { src: '/relay-mixed/09-relay-race.png', alt: 'Mišrios estafetės lenktynės trasoje' },
  { src: '/relay-mixed/10-start.png', alt: 'Mišrios estafetės startas po arku' },
] as const

export function MixedRelayCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="mixed-relay-title"
      titleLines={['Mišri estafetė', '(lyčių santykis 2:3)', '5x1km']}
      slides={MIXED_SLIDES}
      carouselLabel="Mišrios estafetės nuotraukos"
      layout="title-right"
    />
  )
}

const WOMEN_INDIVIDUAL_SLIDES = [
  {
    src: '/women-individual/01-podium.png',
    alt: 'Individualaus moterų kilometro nugalėtojos ant podiumo',
  },
  {
    src: '/women-individual/02-runner.png',
    alt: 'Moterų individualus bėgimas naktį',
  },
  {
    src: '/women-individual/03-sprint.png',
    alt: 'Moterų bėgikės sprintas trasoje',
  },
  {
    src: '/women-individual/04-kids-run.png',
    alt: 'Jaunos bėgikės individualiame kilometre',
  },
  {
    src: '/women-individual/05-night-run.png',
    alt: 'Moterų bėgimas su neoninėmis šviesomis',
  },
  {
    src: '/women-individual/06-start-line.png',
    alt: 'Moterų bėgikės prieš startą',
  },
  {
    src: '/women-individual/07-blue-run.png',
    alt: 'Moterų bėgikė mėlynose šviesose',
  },
  {
    src: '/women-individual/08-neon-start.png',
    alt: 'Moterų startas su neon apšvietimu',
  },
  {
    src: '/women-individual/09-pink-run.png',
    alt: 'Moterų bėgikė rožinėse šviesose',
  },
] as const

export function WomenIndividualCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="women-individual-title"
      titleLines={['Individualus moterų', '1 km bėgimas']}
      slides={WOMEN_INDIVIDUAL_SLIDES}
      carouselLabel="Individualaus moterų kilometro nuotraukos"
      layout="title-left"
      titleCompact
    />
  )
}

const MEN_INDIVIDUAL_SLIDES = [
  { src: '/men-individual/01-finish.png', alt: 'Vyrų individualus bėgimas finišo tiesiojoje' },
  { src: '/men-individual/02-neon-start.png', alt: 'Vyrų bėgikai prieš startą su neon šviesomis' },
  { src: '/men-individual/03-run-together.png', alt: 'Vyras ir vaikas bėga kartu trasoje' },
  { src: '/men-individual/04-podium-group.png', alt: 'Vyrų individualaus kilometro nugalėtojai ant podiumo' },
  { src: '/men-individual/05-podium.png', alt: 'Vyrų kilometro podiumas' },
  { src: '/men-individual/06-superman.png', alt: 'Vyrų bėgikas Supermano kostiumu trasoje' },
  { src: '/men-individual/07-arch-start.png', alt: 'Vyrų startas po arku' },
  { src: '/men-individual/08-lithuania-run.png', alt: 'Lietuvos komandos bėgikas trasoje' },
  { src: '/men-individual/09-night-sprint.png', alt: 'Vyrų naktinis sprintas trasoje' },
  { src: '/men-individual/10-volvere-run.png', alt: 'Vyrų bėgikas VOLVERE RUN trasoje' },
  { src: '/men-individual/11-purple-run.png', alt: 'Vyrų bėgimas violetinėse šviesose' },
  { src: '/men-individual/12-purple-pack.png', alt: 'Vyrų bėgikų grupė violetinėse šviesose' },
  { src: '/men-individual/13-start-line.png', alt: 'Vyrų starto linija su mėlyna šviesa' },
  { src: '/men-individual/14-blue-start.png', alt: 'Vyrų startas po žaliu arku' },
] as const

export function MenIndividualCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="men-individual-title"
      titleLines={['Individualus vyrų', '1 km bėgimas']}
      slides={MEN_INDIVIDUAL_SLIDES}
      carouselLabel="Individualaus vyrų kilometro nuotraukos"
      layout="title-right"
      titleCompact
    />
  )
}

const TRICYCLE_SLIDES = [
  { src: '/tricycle/01-frame-run.png', alt: 'Triračių bėgimas su lydėtoju trasoje' },
  { src: '/tricycle/02-kid-race.png', alt: 'Vaikas triračiu lenktyniauja trasoje' },
  { src: '/tricycle/03-pink-run.png', alt: 'Triračių dalyvė rožinėse šviesose' },
  { src: '/tricycle/04-red-frame.png', alt: 'Triračių lenktynės su raudonu rėmu' },
  { src: '/tricycle/05-stadium.png', alt: 'Triračių bėgimas stadione naktį' },
  { src: '/tricycle/06-trophy.png', alt: 'Triračių nugalėtojas su trofėjumi' },
  { src: '/tricycle/07-group-start.png', alt: 'Triračių dalyviai prieš startą' },
  { src: '/tricycle/08-celebration.png', alt: 'Triračių komandos šventė' },
  { src: '/tricycle/09-team.png', alt: 'Triračių sportininkų komanda su medaliais' },
] as const

export function TricycleCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="tricycle-title"
      titleLines={['Triračių', '1 km bėgimas']}
      slides={TRICYCLE_SLIDES}
      carouselLabel="Triračių kilometro nuotraukos"
      layout="title-left"
    />
  )
}

const KIDS_60M_ALTS = [
  'Vaikų 60 m bėgimas trasoje',
  'Vaikų sprintas naktį',
  'Vaikų lenktynės su neoninėmis šviesomis',
  'Vaikų bėgimas stadione',
  'Vaikų bėgikės starto linijoje',
  'Vaikų 60 m lenktynės',
  'Vaikų bėgikas su medaliu',
  'Vaikų bėgimas rožinėse šviesose',
  'Vaikų sprintas trasoje',
  'Vaikų bėgikės grupėje',
  'Vaikų lenktynės su violetine šviesa',
  'Vaikų bėgimas su lydėtojais',
  'Vaikų nugalėtojos ant podiumo',
  'Vaikų bėgimas su meškiuku talismanu',
  'Vaikų šventė po lenktynių',
  'Vaikų bėgimas su talismanu trasoje',
  'Vaikų sprintas finišo tiesiojoje',
  'Vaikų startas prie starto blokų',
  'Vaikų bėgikų grupė trasoje',
  'Vaikų džiaugsmas su medaliu',
  'Vaikų bėgimas su šeima',
  'Vaikų bėgikai po varžybų',
  'Vaikų 60 m bėgimo akimirka',
] as const

const KIDS_60M_SLIDES = KIDS_60M_ALTS.map((alt, i) => ({
  src: `/kids-60m/${String(i + 1).padStart(2, '0')}.png`,
  alt,
})) as readonly Slide[]

export function Kids60mCarouselSection() {
  return (
    <RelayCarouselSection
      titleId="kids-60m-title"
      titleLines={['Vaikų 60 m bėgimas', '(iki 12 metų amžiaus)']}
      slides={KIDS_60M_SLIDES}
      carouselLabel="Vaikų 60 m bėgimo nuotraukos"
      layout="title-right"
      titleCompact
    />
  )
}
