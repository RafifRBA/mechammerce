import { describe, expect, it } from 'vitest'
import { formatPrice } from './currency'

describe('formatPrice', () => {
  it.each([
    [5, '$5.00'],
    [14.6, '$14.60'],
    [14.61, '$14.61'],
    [0, '$0.00'],
    [1234.5, '$1,234.50'],
  ])('formats %s as %s', (value, expected) => {
    expect(formatPrice(value)).toBe(expected)
  })
})
