import type { CategoryId } from '@/types'
import { SHAPES, dimensionLine } from './visual-shapes'

export type VisualView = 0 | 1 | 2 // front, end, front with dimension line
export const VISUAL_VIEW_COUNT = 3

const VIEW_NAMES = ['front', 'end', 'dimensions'] as const

type ProductVisualProps = {
  category: CategoryId
  label: string // accessible name, normally the product name
  view?: VisualView
  dimensionLabel?: string // text on the dimension line (view 2 only)
  className?: string
}

export function ProductVisual({
  category,
  label,
  view = 0,
  dimensionLabel,
  className = '',
}: ProductVisualProps) {
  const shape = SHAPES[category]
  const accessibleName =
    view === 0 ? label : `${label}, ${VIEW_NAMES[view]} view`

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={accessibleName}
      className={['aspect-square w-full', className].join(' ')}
    >
      <rect width="200" height="200" className="fill-surface-2" />
      {view === 1 ? shape.end : shape.front}
      {view === 2 && dimensionLine(dimensionLabel)}
    </svg>
  )
}
