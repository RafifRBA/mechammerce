import { describe, expect, it } from 'vitest'
import type { CatalogItem, ConfigurableFamily, StandardProduct } from '@/types'
import { sortProducts } from './sort'

// Small fake items: only name and price matter for sorting.
function standard(name: string, unitPrice: number): StandardProduct {
  return {
    kind: 'standard',
    id: name,
    slug: name,
    sku: name,
    category: 'shafts',
    materials: ['S45C'],
    name,
    description: '',
    specs: [],
    unitPrice,
    tiers: [],
    keywords: [],
  }
}

function configurable(name: string, fromPrice: number): ConfigurableFamily {
  return {
    kind: 'configurable',
    id: 'custom-shaft',
    slug: 'shaft',
    category: 'shafts',
    name,
    description: '',
    fromPrice,
  }
}

const names = (items: CatalogItem[]) => items.map((item) => item.name)

const items: CatalogItem[] = [
  standard('Bolt', 5),
  standard('axle', 30),
  configurable('Custom Shaft', 14.61),
  standard('Clamp', 12),
]

describe('sortProducts', () => {
  it('keeps the original order for relevance', () => {
    expect(names(sortProducts(items, 'relevance'))).toEqual([
      'Bolt',
      'axle',
      'Custom Shaft',
      'Clamp',
    ])
  })

  it('sorts by price low to high, using fromPrice for configurable items', () => {
    expect(names(sortProducts(items, 'price-asc'))).toEqual([
      'Bolt',
      'Clamp',
      'Custom Shaft',
      'axle',
    ])
  })

  it('sorts by price high to low', () => {
    expect(names(sortProducts(items, 'price-desc'))).toEqual([
      'axle',
      'Custom Shaft',
      'Clamp',
      'Bolt',
    ])
  })

  it('sorts by name A to Z ignoring letter case', () => {
    expect(names(sortProducts(items, 'name'))).toEqual([
      'axle',
      'Bolt',
      'Clamp',
      'Custom Shaft',
    ])
  })

  it.each(['relevance', 'price-asc', 'price-desc', 'name'] as const)(
    'does not change the original array for %s',
    (sort) => {
      const before = [...items]
      sortProducts(items, sort)
      expect(items).toEqual(before)
    }
  )

  it('returns an empty list for an empty list', () => {
    expect(sortProducts([], 'price-asc')).toEqual([])
  })
})
