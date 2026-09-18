type Partner = {
  id: string;
  label: string;
  logoSrc: string;
  href: string;
};

const PARTNERS: Partner[] = [
  {
    id: "sporto-renginiai",
    label: "Sporto renginiai",
    logoSrc: "/partners/sporto-renginiai.png",
    href: "https://sportorenginiai.lt/lt/",
  },
  {
    id: "volvere-run",
    label: "Volvere Run",
    logoSrc: "/partners/volvere-run.png",
    href: "https://volvererun.lt/",
  },
  {
    id: "the-color-run",
    label: "The Color Run",
    logoSrc: "/partners/3.svg",
    href: "https://thecolorrun.lt/",
  },
  {
    id: "4-move",
    label: "4 Move",
    logoSrc: "/partners/4.svg",
    href: "https://www.facebook.com/4MOVE",
  },
  {
    id: "lrytas",
    label: "LRytas",
    logoSrc: "/partners/5.svg",
    href: "https://www.lrytas.lt/sportas/startai/2026/09/01/news/-greicio-ratai-2026-grizta-i-stadiona-rugsejo-25-d-vilniuje-laukia-greiciausia-rugsejo-naktis-43823604",
  },
  {
    id: "elmenhorster",
    label: "Elmenhorster",
    logoSrc: "/partners/8.svg",
    href: "https://www.elmenhorster.lt/",
  },
  {
    id: "gymon",
    label: "GymON",
    logoSrc: "/partners/10.svg",
    href: "https://www.gymon.lt/",
  },
  {
    id: "caudalie",
    label: "Caudalie",
    logoSrc: "/partners/11.svg",
    href: "https://en.caudalie.com/",
  },
  {
    id: "esminis-pokytis",
    label: "Esminis pokytis",
    logoSrc: "/partners/13.svg",
    href: "https://esminispokytis.lt/",
  },
  {
    id: "alfa-steps",
    label: "Alfa Steps",
    logoSrc: "/partners/14.svg",
    href: "https://alfasteps.com/",
  },
  {
    id: "meduoliu-namai",
    label: "Meduolių namai",
    logoSrc: "/partners/1.svg",
    href: "https://meduoliunamai.lt/",
  },
  {
    id: "cido",
    label: "Cido",
    logoSrc: "/partners/2.svg",
    href: "https://cido.lt/lt/apie-cido/",
  },
  {
    id: "adventica",
    label: "Adventica",
    logoSrc: "/partners/6.svg",
    href: "https://www.adventica.lt/",
  },
  {
    id: "brite",
    label: "Brite",
    logoSrc: "/partners/7.svg",
    href: "https://brite.lt/",
  },
  {
    id: "vilnius",
    label: "Vilnius",
    logoSrc: "/partners/9.svg",
    href: "https://vilnius.lt/",
  },
  {
    id: "nike-teamsport",
    label: "Nike",
    logoSrc: "/partners/12.svg",
    href: "https://www.teamsport.lt/",
  },
  {
    id: "lumosport",
    label: "Lumosport",
    logoSrc: "/partners/lumo-logo.png",
    href: "https://www.lumosport.lt/plans",
  },
];

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
              <a
                className="partnerLogo"
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.label} — atidaryti svetainę naujame lange`}
              >
                <img
                  className="partnerLogoImage"
                  src={partner.logoSrc}
                  alt={partner.label}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
