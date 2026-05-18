const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Vingio+parko+stadionas+Vingis+M.+K.+Čiurlionio+g.+112+Vilnius'

export function VenueSection() {
  return (
    <section className="venueSection" aria-labelledby="venue-section-title">
      <h2 id="venue-section-title" className="sr-only">
        Renginio vieta
      </h2>

      <div className="venueSectionInner">
        <div className="venueMedia">
          <img
            className="venueImage"
            src="/venue-stadium.png"
            alt="Vingio parko stadionas naktį — apšviestas bėgimo takas"
            loading="lazy"
            decoding="async"
          />
          <div className="venueImageGlow" aria-hidden />
        </div>

        <div className="venueContent">
          <p className="venueLead">
            Susitinkame ten, kur šviesu bus net ir saulei nusileidus...
          </p>

          <div className="venueDetails">
            <p className="venueName">Vingio parko stadionas „Vingis“</p>

            <a
              className="venueAddress"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="venueAddressIcon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              M. K. Čiurlionio g. 112, Vilnius
            </a>

            <p className="venueDate">
              <span className="venueDateIcon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 3v4M16 3v4M3 10h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              2026 m. Rugsėjo 25 d. (penktadienį)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
