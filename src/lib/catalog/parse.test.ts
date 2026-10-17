import { describe, expect, it } from 'vitest'
import { parseCatalogParams } from './parse'

describe('parseCatalogParams', () => {
  it('returns safe defaults for empty params', () => {
    expect(parseCatalogParams({})).toEqual({
      filters: {
        q: '',
        category: null,
        materials: [],
        minPrice: null,
        maxPrice: null,
        configurableOnly: false,
      },
      sort: 'relevance',
      page: 1,
    })
  })

  it('reads every valid param', () => {
    expect(
      parseCatalogParams({
        q: 'shaft',
        category: 'shafts',
        material: 'S45C,SUS304',
        min: '10',
        max: '50.5',
        configurable: '1',
        sort: 'price-desc',
        page: '3',
      })
    ).toEqual({
      filters: {
        q: 'shaft',
        category: 'shafts',
        materials: ['S45C', 'SUS304'],
        minPrice: 10,
        maxPrice: 50.5,
        configurableOnly: true,
      },
      sort: 'price-desc',
      page: 3,
    })
  })

  it('ignores an unknown category', () => {
    expect(
      parseCatalogParams({ category: 'bogus' }).filters.category
    ).toBeNull()
  })

  it('drops unknown materials and keeps the valid ones', () => {
    const { filters } = parseCatalogParams({ material: 'S45C,bogus,SUS304' })
    expect(filters.materials).toEqual(['S45C', 'SUS304'])
  })

  it('returns no materials for an empty material param', () => {
    expect(parseCatalogParams({ material: '' }).filters.materials).toEqual([])
  })

  it.each(['', '   ', 'abc', '-5', 'Infinity'])(
    'treats the price "%s" as not set',
    (bad) => {
      const { filters } = parseCatalogParams({ min: bad, max: bad })
      expect(filters.minPrice).toBeNull()
      expect(filters.maxPrice).toBeNull()
    }
  )

  it('keeps a price of 0 instead of treating it as not set', () => {
    expect(parseCatalogParams({ min: '0' }).filters.minPrice).toBe(0)
  })

  it.each(['true', '0', '', 'yes'])(
    'only "1" turns on configurable, not "%s"',
    (value) => {
      const { filters } = parseCatalogParams({ configurable: value })
      expect(filters.configurableOnly).toBe(false)
    }
  )

  it('falls back to relevance for an unknown sort', () => {
    expect(parseCatalogParams({ sort: 'bogus' }).sort).toBe('relevance')
  })

  it.each(['price-asc', 'price-desc', 'name', 'relevance'] as const)(
    'accepts the sort "%s"',
    (sort) => {
      expect(parseCatalogParams({ sort }).sort).toBe(sort)
    }
  )

  it.each(['0', '-1', 'abc', '2abc', '1.5', '', 'Infinity'])(
    'falls back to page 1 for "%s"',
    (bad) => {
      expect(parseCatalogParams({ page: bad }).page).toBe(1)
    }
  )

  it('uses only the first value when a param is repeated', () => {
    const result = parseCatalogParams({ q: ['a', 'b'], page: ['2', '5'] })
    expect(result.filters.q).toBe('a')
    expect(result.page).toBe(2)
  })

  it('treats an empty array as not set', () => {
    expect(parseCatalogParams({ q: [] }).filters.q).toBe('')
  })
})
