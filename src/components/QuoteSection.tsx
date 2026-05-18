type QuoteSectionProps = {
  sectionId: string
  sectionTitle: string
  imageSrc: string
  imageAlt: string
  imagePosition?: string
  quote: string
  roles: string
  name: string
  reversed?: boolean
}

export function QuoteSection({
  sectionId,
  sectionTitle,
  imageSrc,
  imageAlt,
  imagePosition = '72% center',
  quote,
  roles,
  name,
  reversed = false,
}: QuoteSectionProps) {
  const media = (
    <div className="quoteMedia">
      <img
        className="quoteImage"
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: imagePosition }}
      />
      <div className="quoteImageGlow" aria-hidden />
    </div>
  )

  const content = (
    <div className="quoteContent">
      <blockquote className="quoteBlock">
        <span className="quoteMark" aria-hidden>
          „
        </span>
        <p className="quoteText">{quote}</p>
      </blockquote>

      <footer className="quoteAttribution">
        <p className="quoteRoles">{roles}</p>
        <p className="quoteName">{name}</p>
      </footer>
    </div>
  )

  return (
    <section
      className={`quoteSection${reversed ? ' quoteSection--reversed' : ''}`}
      aria-labelledby={sectionId}
    >
      <h2 id={sectionId} className="sr-only">
        {sectionTitle}
      </h2>

      <div className="quoteSectionInner">
        {reversed ? (
          <>
            {content}
            {media}
          </>
        ) : (
          <>
            {media}
            {content}
          </>
        )}
      </div>
    </section>
  )
}
