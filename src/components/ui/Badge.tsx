import type { ComponentProps } from 'react'

type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

type BadgeProps = ComponentProps<'span'> & {
  variant?: BadgeVariant
}

const baseClasses =
  'border border-transparent inline-flex items-center font-medium rounded-full text-xs px-3 py-1'

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'border-border bg-surface-2 text-text',
  accent: 'bg-accent text-accent-contrast',
  success: 'bg-success text-accent-contrast',
  warning: 'bg-warning text-accent-contrast',
  danger: 'bg-danger text-accent-contrast',
}

export function Badge({
  variant = 'neutral',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={[baseClasses, variantClasses[variant], className].join(' ')}
      {...props}
    />
  )
}
