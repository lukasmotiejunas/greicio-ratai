import { QuoteSection } from './QuoteSection'

const VITALIJ_QUOTE =
  'Man greičio ratai tai tie vakarai, kai stadionas trumpam tampa kažkuo daugiau nei stadionu. Kai tamsa aplink, o čia – šviesa, žmonės, balsai... Ir tu supranti, kad ne apie greitį čia viskas. Apie tai, kad metai bėga, žmonės keičiasi, bet šitas jausmas – likti kartu dar vienam ratui – niekur nedingsta.'

export function OrganizerQuote() {
  return (
    <QuoteSection
      sectionId="organizer-quote-title"
      sectionTitle="Organizatoriaus žodis"
      imageSrc="/vitalij-kozlov.png"
      imageAlt="Vitalij Kozlov — „Greičio ratų“ organizatorius"
      imagePosition="72% center"
      quote={VITALIJ_QUOTE}
      roles="Olimpietis, „Volvere Run“ bėgimo klubo įkūrėjas ir treneris, „Greičio ratų“ organizatorius"
      name="Vitalij Kozlov"
    />
  )
}
