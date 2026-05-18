type Partner = {
  id: string
  label: string
  className: string
  /** Set when real logo is added, e.g. `/partners/nike.svg` */
  logoSrc?: string
}

/** Placeholder partners — set `logoSrc` when final assets are ready */
const PARTNERS: Partner[] = [
  { id: 'nike', label: 'Nike', className: 'partnerLogo--nike' },
  { id: 'adidas', label: 'adidas', className: 'partnerLogo--adidas' },
  { id: 'puma', label: 'PUMA', className: 'partnerLogo--puma' },
  { id: 'asics', label: 'ASICS', className: 'partnerLogo--asics' },
  { id: 'garmin', label: 'GARMIN', className: 'partnerLogo--garmin' },
  { id: 'decathlon', label: 'DECATHLON', className: 'partnerLogo--decathlon' },
  { id: 'on', label: 'On', className: 'partnerLogo--on' },
]

export function PartnersFooter() {
  return (
    <footer className="partnersFooter" aria-labelledby="partners-footer-title">
      <div className="partnersFooterInner">
        <h2 id="partners-footer-title" className="partnersFooterTitle">
          Mūsų partneriai ir remėjai
        </h2>

        <ul className="partnersLogoGrid" role="list">
          {PARTNERS.map((partner) => (
            <li key={partner.id} className="partnersLogoItem">
              <div
                className={`partnerLogo ${partner.className}`}
                aria-label={`${partner.label} — partnerio logotipas`}
              >
                {partner.logoSrc ? (
                  <img
                    className="partnerLogoImage"
                    src={partner.logoSrc}
                    alt={partner.label}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="partnerLogoLabel">{partner.label}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
