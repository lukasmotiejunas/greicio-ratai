import { Fragment } from 'react'

const TAGLINE = [
  { word: 'Šviesos', tone: 'lights' as const },
  { word: 'Muzika', tone: 'music' as const },
  { word: 'Adrenalinas', tone: 'rush' as const },
]

export function EventTagline() {
  return (
    <div className="eventTaglineWrap">
      <p className="eventTagline" aria-label="Šviesos, Muzika, Adrenalinas">
        {TAGLINE.map((item, i) => (
          <Fragment key={item.word}>
            {i > 0 && <span className="eventTaglineSep" aria-hidden />}
            <span className={`eventTaglineWord eventTaglineWord--${item.tone}`}>
              {item.word}
            </span>
          </Fragment>
        ))}
      </p>
      <div className="eventTaglineRule" aria-hidden />
    </div>
  )
}
