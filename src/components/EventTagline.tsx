const TAGLINE = [
  { word: 'Šviesos', tone: 'lights' as const },
  { word: 'Muzika', tone: 'music' as const },
  { word: 'Adrenalinas', tone: 'rush' as const },
]

export function EventTagline() {
  return (
    <div className="eventTaglineWrap">
      <p className="eventTagline" aria-label="Šviesos. Muzika. Adrenalinas.">
        {TAGLINE.map((item, i) => (
          <span key={item.word} className="eventTaglineItem">
            {i > 0 && <span className="eventTaglineSep" aria-hidden />}
            <span className={`eventTaglineWord eventTaglineWord--${item.tone}`}>
              {item.word}
              <span className="eventTaglineDot" aria-hidden>
                .
              </span>
            </span>
          </span>
        ))}
      </p>
      <div className="eventTaglineRule" aria-hidden />
    </div>
  )
}
