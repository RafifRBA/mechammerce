import type { ReactNode } from 'react'
import type { CategoryId } from '@/types'

// Simple technical line drawings on a 200 × 200 canvas, one "front" and one "end" view per category.
// Colours come from design tokens through Tailwind classes, so they follow the theme.

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  }
}

const part = 'fill-surface stroke-text stroke-2' // solid body
const hole = 'fill-surface-2 stroke-text stroke-2' // cut-out: the background shows through
const thin = 'fill-none stroke-text-muted stroke-1' // centre and hidden lines

const centreLine = '8 3 2 3'

const shaftFront = (
  <>
    <path
      className={part}
      strokeLinejoin="round"
      d="M30 92 L34 88 L166 88 L170 92 L170 108 L166 112 L34 112 L30 108 Z"
    />
    <rect className="fill-accent" x="64" y="90" width="46" height="5" />
    <line
      className={thin}
      strokeDasharray={centreLine}
      x1="18"
      y1="100"
      x2="182"
      y2="100"
    />
  </>
)

const shaftEnd = (
  <>
    <circle className={part} cx="100" cy="100" r="34" />
    <circle className={thin} cx="100" cy="100" r="29" />
    <rect className="fill-accent" x="95" y="66" width="10" height="6" />
    <line
      className={thin}
      strokeDasharray={centreLine}
      x1="100"
      y1="52"
      x2="100"
      y2="148"
    />
    <line
      className={thin}
      strokeDasharray={centreLine}
      x1="52"
      y1="100"
      x2="148"
      y2="100"
    />
  </>
)

const bracketFront = (
  <>
    <path
      className={part}
      strokeLinejoin="round"
      d="M60 46 L92 46 L92 116 L152 116 L152 152 L60 152 Z"
    />
    <circle className={hole} cx="76" cy="70" r="5" />
    <circle className={hole} cx="76" cy="96" r="5" />
    <circle className={hole} cx="112" cy="134" r="5" />
    <circle className={hole} cx="136" cy="134" r="5" />
  </>
)

const bracketEnd = (
  <>
    <rect className={part} x="50" y="60" width="100" height="80" />
    <rect
      className="fill-surface-2 stroke-text stroke-2"
      x="50"
      y="60"
      width="32"
      height="80"
    />
    <line
      className={thin}
      strokeDasharray="4 3"
      x1="82"
      y1="60"
      x2="82"
      y2="140"
    />
    <circle className={hole} cx="116" cy="82" r="6" />
    <circle className={hole} cx="116" cy="118" r="6" />
  </>
)

const threadX = [92, 100, 108, 116, 124, 132, 140, 148, 156]

const fastenerFront = (
  <>
    <rect className={part} x="40" y="80" width="26" height="40" rx="2" />
    <rect className={part} x="66" y="87" width="96" height="26" />
    {threadX.map((x) => (
      <line key={x} className={thin} x1={x} y1="87" x2={x} y2="113" />
    ))}
    <line
      className={thin}
      strokeDasharray={centreLine}
      x1="30"
      y1="100"
      x2="176"
      y2="100"
    />
  </>
)

const hexPoints = [0, 60, 120, 180, 240, 300]
  .map((deg) => polar(100, 100, 38, deg))
  .map((p) => `${p.x},${p.y}`)
  .join(' ')

const fastenerEnd = (
  <>
    <polygon className={part} strokeLinejoin="round" points={hexPoints} />
    <circle
      className="fill-surface-2 stroke-accent stroke-2"
      cx="100"
      cy="100"
      r="18"
    />
  </>
)

const balls = Array.from({ length: 8 }, (_, i) => polar(100, 100, 38, i * 45))

const bearingFront = (
  <>
    <circle className={part} cx="100" cy="100" r="62" />
    <circle
      className="fill-surface-2 stroke-text stroke-1"
      cx="100"
      cy="100"
      r="46"
    />
    {balls.map((b) => (
      <circle
        key={`${b.x}-${b.y}`}
        className="fill-surface stroke-text stroke-1"
        cx={b.x}
        cy={b.y}
        r="7"
      />
    ))}
    <circle className={part} cx="100" cy="100" r="30" />
    <circle
      className="fill-surface-2 stroke-accent stroke-2"
      cx="100"
      cy="100"
      r="20"
    />
  </>
)

const bearingEnd = (
  <>
    <rect className={part} x="82" y="38" width="36" height="124" />
    <line className={thin} x1="82" y1="60" x2="118" y2="60" />
    <line className={thin} x1="82" y1="140" x2="118" y2="140" />
    <line
      className={thin}
      strokeDasharray="4 3"
      x1="82"
      y1="78"
      x2="118"
      y2="78"
    />
    <line
      className={thin}
      strokeDasharray="4 3"
      x1="82"
      y1="122"
      x2="118"
      y2="122"
    />
  </>
)

const lighteningHoles = [45, 135, 225, 315].map((deg) =>
  polar(100, 100, 38, deg)
)

const pulleyFront = (
  <>
    <circle className={part} cx="100" cy="100" r="60" />
    <circle className={thin} cx="100" cy="100" r="50" />
    {lighteningHoles.map((h) => (
      <circle key={`${h.x}-${h.y}`} className={hole} cx={h.x} cy={h.y} r="8" />
    ))}
    <circle className={part} cx="100" cy="100" r="22" />
    <circle
      className="fill-surface-2 stroke-accent stroke-2"
      cx="100"
      cy="100"
      r="9"
    />
  </>
)

const pulleyEnd = (
  <>
    <path
      className={part}
      strokeLinejoin="round"
      d="M72 46 L128 46 L128 68 L112 84 L112 116 L128 132 L128 154 L72 154 L72 132 L88 116 L88 84 L72 68 Z"
    />
    <line
      className={thin}
      strokeDasharray="4 3"
      x1="94"
      y1="46"
      x2="94"
      y2="154"
    />
    <line
      className={thin}
      strokeDasharray="4 3"
      x1="106"
      y1="46"
      x2="106"
      y2="154"
    />
    <line
      className={thin}
      strokeDasharray={centreLine}
      x1="100"
      y1="34"
      x2="100"
      y2="166"
    />
  </>
)

// One T-slot, drawn on the top side; rotated to the other three sides below.
const tSlot = 'M91 58 L91 69 L83 69 L83 81 L117 81 L117 69 L109 69 L109 58'

const profileFront = (
  <>
    <rect className={part} x="60" y="60" width="80" height="80" rx="3" />
    {[0, 90, 180, 270].map((deg) => (
      <path
        key={deg}
        className={hole}
        strokeLinejoin="round"
        transform={`rotate(${deg} 100 100)`}
        d={tSlot}
      />
    ))}
    <circle
      className="fill-surface-2 stroke-accent stroke-2"
      cx="100"
      cy="100"
      r="7"
    />
  </>
)

const profileEnd = (
  <>
    <rect className={part} x="24" y="86" width="152" height="28" />
    <line className={thin} x1="24" y1="96" x2="176" y2="96" />
    <line className={thin} x1="24" y1="104" x2="176" y2="104" />
    <rect className="fill-accent" x="88" y="94" width="24" height="12" />
  </>
)

export const SHAPES: Record<CategoryId, { front: ReactNode; end: ReactNode }> =
  {
    shafts: { front: shaftFront, end: shaftEnd },
    brackets: { front: bracketFront, end: bracketEnd },
    fasteners: { front: fastenerFront, end: fastenerEnd },
    bearings: { front: bearingFront, end: bearingEnd },
    pulleys: { front: pulleyFront, end: pulleyEnd },
    profiles: { front: profileFront, end: profileEnd },
  }

// Dimension line along the bottom edge, with an optional text such as "Ø20 mm".
export function dimensionLine(label?: string): ReactNode {
  return (
    <g className="stroke-accent stroke-2">
      <line x1="30" y1="184" x2="170" y2="184" />
      <line x1="30" y1="178" x2="30" y2="190" />
      <line x1="170" y1="178" x2="170" y2="190" />
      {label && (
        <text
          x="100"
          y="174"
          textAnchor="middle"
          className="fill-text stroke-none font-mono text-[11px]"
        >
          {label}
        </text>
      )}
    </g>
  )
}
