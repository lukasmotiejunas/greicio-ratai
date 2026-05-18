import { useId } from 'react'

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

type NeonHeadingProps = {
  lines: string[]
  className?: string
  compact?: boolean
}

function NeonLine({
  text,
  y,
  centerX,
  strokeId,
  bloomId,
}: {
  text: string
  y: number
  centerX: number
  strokeId: string
  bloomId: string
}) {
  const shared = {
    x: centerX,
    y,
    textAnchor: 'middle' as const,
    fill: 'none' as const,
    stroke: `url(#${strokeId})`,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
    className: 'neonHeadingText',
  }

  return (
    <>
      <text
        {...shared}
        strokeWidth={10}
        opacity={0.22}
        filter={`url(#${bloomId})`}
      >
        {text}
      </text>
      <text {...shared} strokeWidth={4.5}>
        {text}
      </text>
      <text
        {...shared}
        strokeWidth={2}
        className="neonHeadingText neonHeadingTextCore"
      >
        {text}
      </text>
      <text
        {...shared}
        stroke="#f7f2ff"
        strokeWidth={0.85}
        opacity={0.72}
      >
        {text}
      </text>
    </>
  )
}

export function NeonHeading({
  lines,
  className = '',
  compact = false,
}: NeonHeadingProps) {
  const uid = useId().replace(/:/g, '')
  const strokeId = `neonHeadingStroke-${uid}`
  const bloomId = `neonHeadingBloom-${uid}`
  const lineCount = lines.length
  const lineStep = compact || lineCount > 2 ? 64 : 82
  const startY = compact || lineCount > 2 ? 54 : 68
  const width = compact ? 760 : 680
  const centerX = width / 2
  const height = startY + (lineCount - 1) * lineStep + 48
  const wrapClass = [
    'neonHeadingWrap',
    compact ? 'neonHeadingWrap--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapClass}>
      <svg
        className="neonHeadingSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        focusable="false"
        textRendering="geometricPrecision"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient
            id={strokeId}
            x1="0"
            y1="0"
            x2={width}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            {NEON_STOPS.map(({ offset, color }) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from={`0 ${centerX} 100`}
              to={`360 ${centerX} 100`}
              dur="14s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter
            id={bloomId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {lines.map((line, i) => (
          <NeonLine
            key={line}
            text={line}
            y={startY + i * lineStep}
            centerX={centerX}
            strokeId={strokeId}
            bloomId={bloomId}
          />
        ))}
      </svg>
    </div>
  )
}
