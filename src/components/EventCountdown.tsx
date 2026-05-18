import { useEffect, useState } from 'react'
import { REGISTRACIJA_URL } from '../constants'

/** GREIČIO RATAI ’26 — September 25, 2026, 00:00 Vilnius time */
const EVENT_START = new Date('2026-09-25T00:00:00+03:00')

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

const UNITS = [
  { key: 'days', label: 'Dienos' },
  { key: 'hours', label: 'Valandos' },
  { key: 'minutes', label: 'Minutės' },
  { key: 'seconds', label: 'Sekundės' },
] as const

function getTimeLeft(): TimeLeft {
  const diff = EVENT_START.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, expired: false }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const values = {
    days: timeLeft.days,
    hours: timeLeft.hours,
    minutes: timeLeft.minutes,
    seconds: timeLeft.seconds,
  }

  return (
    <section className="eventCountdown" aria-labelledby="event-countdown-title">
      <h2 id="event-countdown-title" className="eventCountdownTitle">
        Renginys prasideda už
      </h2>

      {timeLeft.expired ? (
        <p className="eventCountdownExpired" role="status">
          Renginys jau prasidėjo!
        </p>
      ) : (
        <div
          className="eventCountdownGrid"
          role="timer"
          aria-label="Laikas iki renginio pradžios"
        >
          {UNITS.map(({ key, label }) => (
            <div key={key} className="eventCountdownUnit">
              <div className="eventCountdownValue" aria-hidden>
                {key === 'days' ? values.days : pad(values[key])}
              </div>
              <span className="eventCountdownLabel">{label}</span>
              <span className="sr-only">
                {values[key]} {label.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="eventCountdownActions">
        <a
          className="cta eventCountdownCta"
          href={REGISTRACIJA_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="ctaLabel">Registracija</span>
          <span className="ctaIcon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
