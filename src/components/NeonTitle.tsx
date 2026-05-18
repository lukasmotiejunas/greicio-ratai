const TITLE = 'GREIČIO RATAI \u201926'

/** Brand purple, cyan accent, bright tube highlight — repeated for seamless spin */
const NEON_STOPS = [
  { offset: '0%', color: '#7030a0' },
  { offset: '14%', color: '#2596be' },
  { offset: '28%', color: '#f5d6ff' },
  { offset: '42%', color: '#7030a0' },
  { offset: '56%', color: '#2596be' },
  { offset: '70%', color: '#f5d6ff' },
  { offset: '84%', color: '#7030a0' },
  { offset: '100%', color: '#2596be' },
] as const

type NeonTitleProps = {
  titleId: string
}

export function NeonTitle({ titleId }: NeonTitleProps) {
  return (
    <h1 className="neonTitleWrap">
      <span id={titleId} className="sr-only">
        GREIČIO RATAI &rsquo;26
      </span>
      <svg
        className="neonSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 270"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        focusable="false"
        textRendering="geometricPrecision"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient
            id="neonStroke"
            x1="0"
            y1="0"
            x2="1400"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            {NEON_STOPS.map(({ offset, color }) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 700 135"
              to="360 700 135"
              dur="14s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter
            id="neonBloom"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="5" result="b1" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Soft outer glow — low opacity so letterforms stay distinct */}
        <text
          x="700"
          y="168"
          textAnchor="middle"
          fill="none"
          stroke="url(#neonStroke)"
          strokeWidth={16}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.22}
          filter="url(#neonBloom)"
          className="neonSvgText"
        >
          {TITLE}
        </text>
        {/* Mid tube body */}
        <text
          x="700"
          y="168"
          textAnchor="middle"
          fill="none"
          stroke="url(#neonStroke)"
          strokeWidth={6.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="neonSvgText"
        >
          {TITLE}
        </text>
        {/* Crisp outer edge of the glass */}
        <text
          x="700"
          y="168"
          textAnchor="middle"
          fill="none"
          stroke="url(#neonStroke)"
          strokeWidth={2.85}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="neonSvgText neonSvgTextCore"
        >
          {TITLE}
        </text>
        {/* Inner highlight for readability on black */}
        <text
          x="700"
          y="168"
          textAnchor="middle"
          fill="none"
          stroke="#f7f2ff"
          strokeWidth={1.05}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.72}
          className="neonSvgText"
        >
          {TITLE}
        </text>
      </svg>
    </h1>
  )
}
