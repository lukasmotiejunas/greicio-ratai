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
    id: 'volvere-run',
    label: 'Volvere Run',
    logoSrc: '/partners/volvere-run.png',
  },
  { id: 'remejas-3', label: 'Rėmėjas', logoSrc: '/partners/3.svg' },
  { id: 'remejas-4', label: 'Rėmėjas', logoSrc: '/partners/4.svg' },
  { id: 'remejas-5', label: 'Rėmėjas', logoSrc: '/partners/5.svg' },
  { id: 'remejas-8', label: 'Rėmėjas', logoSrc: '/partners/8.svg' },
  { id: 'remejas-10', label: 'Rėmėjas', logoSrc: '/partners/10.svg' },
  { id: 'remejas-11', label: 'Rėmėjas', logoSrc: '/partners/11.svg' },
  { id: 'remejas-13', label: 'Rėmėjas', logoSrc: '/partners/13.svg' },
  { id: 'remejas-14', label: 'Rėmėjas', logoSrc: '/partners/14.svg' },
  { id: 'remejas-1', label: 'Rėmėjas', logoSrc: '/partners/1.svg' },
  { id: 'remejas-2', label: 'Rėmėjas', logoSrc: '/partners/2.svg' },
  { id: 'remejas-6', label: 'Rėmėjas', logoSrc: '/partners/6.svg' },
  { id: 'remejas-7', label: 'Rėmėjas', logoSrc: '/partners/7.svg' },
  { id: 'remejas-9', label: 'Rėmėjas', logoSrc: '/partners/9.svg' },
  { id: 'remejas-12', label: 'Rėmėjas', logoSrc: '/partners/12.svg' },
  { id: 'lumo', label: 'Lumo', logoSrc: '/partners/lumo-logo.png' },
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
