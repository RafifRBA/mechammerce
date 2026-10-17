const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/** 14.6 -> "$14.60", 1234.5 -> "$1,234.50" */
export function formatPrice(value: number): string {
  return usd.format(value)
}
