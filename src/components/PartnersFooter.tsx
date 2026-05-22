type Partner = {
  id: string
  label: string
  logoSrc: string
}

const PARTNERS: Partner[] = [
  {
    id: 'sporto-renginiai',
    label: 'Sporto renginiai',
    logoSrc: '/partners/sporto-renginiai.png',
  },
  {
    id: 'partner-shield',
    label: 'Partneris',
    logoSrc: '/partners/partner-shield.png',
  },
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
                className="partnerLogo"
                aria-label={`${partner.label} — partnerio logotipas`}
              >
                <img
                  className="partnerLogoImage"
                  src={partner.logoSrc}
                  alt={partner.label}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
