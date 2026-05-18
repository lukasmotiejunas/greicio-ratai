import { QuoteSection } from './QuoteSection'

const MARTYNAS_QUOTE =
  'Man „Greičio ratai“ tai tokia keista rudens šventė, kur visi ateina savo noru pavargti. Muzika groja, šviesos mirga, dūmai sukasi... o mes vis dar tikim, kad „dar vienas ratas“ nieko tokio. Ir kasmet tas pats – sakai sau, kad šįkart jau ramiau... bet kažkaip vėl atsiduri vidury viso to šurmulio, su šypsena ir skaudančiom kojom.'

export function CoOrganizerQuote() {
  return (
    <QuoteSection
      sectionId="co-organizer-quote-title"
      sectionTitle="Organizatoriaus žodis"
      imageSrc="/martynas-dilys.png"
      imageAlt="Martynas Dilys — „Greičio ratų“ organizatorius"
      imagePosition="58% center"
      quote={MARTYNAS_QUOTE}
      roles="Vaikų treneris, „Volvere Run Kids“ įkūrėjas, „Greičio ratų“ organizatorius"
      name="Martynas Dilys"
      reversed
    />
  )
}
