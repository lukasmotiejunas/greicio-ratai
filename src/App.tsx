import { EventCountdown } from './components/EventCountdown'
import { VenueSection } from './components/VenueSection'
import { EventProgram } from './components/EventProgram'
import { OrganizerQuote } from './components/OrganizerQuote'
import { CoOrganizerQuote } from './components/CoOrganizerQuote'
import { PartnersFooter } from './components/PartnersFooter'
import { EventTagline } from './components/EventTagline'
import { NeonTitle } from './components/NeonTitle'
import { RegistrationCarousel } from './components/RegistrationCarousel'
import {
  Kids60mCarouselSection,
  MenIndividualCarouselSection,
  MenRelayCarouselSection,
  MixedRelayCarouselSection,
  TricycleCarouselSection,
  WomenIndividualCarouselSection,
  WomenRelayCarouselSection,
} from './components/RelayCarouselSection'
import { REGISTRACIJA_URL } from './constants'
import './App.css'

function App() {
  return (
    <div className="page">
      <main className="hero" aria-labelledby="page-title">
        <NeonTitle titleId="page-title" />
        <div className="registrationBlock">
          <a
            className="cta"
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
          <EventTagline />
          <RegistrationCarousel />
        </div>
        <WomenRelayCarouselSection />
        <MenRelayCarouselSection />
        <MixedRelayCarouselSection />
        <WomenIndividualCarouselSection />
        <MenIndividualCarouselSection />
        <TricycleCarouselSection />
        <Kids60mCarouselSection />
        <EventCountdown />
        <VenueSection />
        <EventProgram />
        <OrganizerQuote />
        <CoOrganizerQuote />
      </main>
      <PartnersFooter />
    </div>
  )
}

export default App
