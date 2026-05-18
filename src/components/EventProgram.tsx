const PROGRAM_ITEMS = [
  {
    time: '19.30',
    event: '60m mergaitės (2013 - 2014 m, 2015 m ir jaunesnės)',
  },
  {
    time: '20.00',
    event: '60m berniukai (2013 - 2014 m, 2015 m ir jaunesni)',
  },
  {
    time: '20.30',
    event: '1000 m moterys ir su triračiais',
  },
  {
    time: '20.50',
    event: '1000 m vyrai',
  },
  {
    time: '21.30',
    event: 'estafetės 5x1000 m bėgimas (mišri)',
  },
  {
    time: '22.00',
    event: 'estafetės 5x1000 m bėgimas (vyrai)',
  },
  {
    time: '22.30',
    event: 'estafetės 5x1000 m bėgimas (moterys)',
  },
] as const

export function EventProgram() {
  return (
    <section className="eventProgram" aria-labelledby="event-program-title">
      <h2 id="event-program-title" className="eventProgramTitle">
        Varžybų programa:
      </h2>

      <ol className="eventProgramList">
        {PROGRAM_ITEMS.map((item, index) => (
          <li key={item.time} className="eventProgramItem">
            <span className="eventProgramMarker" aria-hidden>
              <span className="eventProgramMarkerDot" />
              {index < PROGRAM_ITEMS.length - 1 && (
                <span className="eventProgramMarkerLine" />
              )}
            </span>

            <div className="eventProgramCard">
              <time className="eventProgramTime" dateTime={`2026-09-25T${item.time.replace('.', ':')}:00`}>
                {item.time} val.
              </time>
              <span className="eventProgramDash" aria-hidden>
                —
              </span>
              <p className="eventProgramEvent">{item.event}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
