import { useCallback, useEffect, useRef, useState } from 'react'

const INTERVAL_MS = 5500

const SLIDES = [
  {
    src: '/gallery/01-night-track.png',
    alt: 'Naktinis bėgimas trasoje su šviesomis ir dalyviais',
  },
  {
    src: '/gallery/02-trophies.png',
    alt: 'Apdovanojimų trofėjai ant scenos',
  },
  {
    src: '/gallery/03-kids-sprint.png',
    alt: 'Vaikų sprintas naktį trasoje',
  },
  {
    src: '/gallery/04-runner.png',
    alt: 'Bėgikas stadione naktį su violetinėmis šviesomis',
  },
  {
    src: '/gallery/05-stadium-blue.png',
    alt: 'Stadionas naktį su mėlynomis prožektorių šviesomis',
  },
  {
    src: '/gallery/06-stadium-pink.png',
    alt: 'Stadionas naktį su rožinėmis prožektorių šviesomis',
  },
  {
    src: '/gallery/07-timer.png',
    alt: 'Lenktynių chronometras trasoje',
  },
] as const

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

export function RegistrationCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const liveRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const goTo = useCallback((next: number) => {
    setIndex(next)
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length)
  }, [])

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
    el.textContent = `Nuotrauka ${index + 1} iš ${SLIDES.length}: ${SLIDES[index].alt}`
  }, [index])

  return (
    <section
      className="regCarousel"
      aria-roledescription="carousel"
      aria-label="Renginio nuotraukų galerija"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="regCarouselViewport">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            className={`regCarouselSlide${i === index ? ' isActive' : ''}${prefersReducedMotion ? ' regCarouselSlide--noMotion' : ''}`}
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
          />
        ))}
        <div className="regCarouselVignette" aria-hidden />
      </div>

      <div className="regCarouselDots" role="tablist" aria-label="Pasirinkti nuotrauką">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            className={`regCarouselDot${i === index ? ' isActive' : ''}`}
            aria-selected={i === index}
            aria-label={`${slide.alt} (${i + 1} iš ${SLIDES.length})`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div ref={liveRef} className="sr-only" aria-live="polite" />
    </section>
  )
}
