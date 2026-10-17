import { paginate } from './paginate'
import { describe, it, expect } from 'vitest'

const nums = (n: number) => Array.from({ length: n }, (_, i) => i + 1)

describe('pagination', () => {
  it('returns the middle page', () => {
    const result = paginate(nums(30), 2)
    expect(result.items).toEqual(Array.from({ length: 12 }, (_, i) => 13 + i))
    expect(result.page).toBe(2)
    expect(result.totalPages).toBe(3)
  })
  it('return last page', () => {
    const result = paginate(nums(25), 3)
    expect(result.items).toEqual([25])
  })
  it('return last page if out of bound', () => {
    const result = paginate(nums(30), 99)
    expect(result.page).toBe(3)
    expect(result.items).toEqual([25, 26, 27, 28, 29, 30])
  })
  it.each([0, -1, NaN, 1.5])('falls back to page 1 for %s', (bad) => {
    expect(paginate(nums(30), bad).page).toBe(1)
  })
  it('handles empty list', () => {
    const result = paginate([], 1)
    expect(result.page).toBe(1)
    expect(result.items).toEqual([])
    expect(result.totalPages).toBe(1)
  })
  it('return real array', () => {
    const input = nums(30)
    const copy = [...input]
    paginate(input, 2)
    expect(input).toEqual(copy)
  })
})
