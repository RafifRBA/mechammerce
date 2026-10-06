import type { ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'lg'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-contrast hover:bg-accent-hover',
  secondary: 'border border-border bg-surface text-text hover:bg-surface-2',
  ghost: 'text-text hover:bg-surface-2',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    />
  )
}
