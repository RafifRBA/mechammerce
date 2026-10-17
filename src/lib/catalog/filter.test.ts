import { describe, expect, it } from 'vitest'
import type {
  CatalogItem,
  CategoryId,
  ConfigurableFamily,
  MaterialId,
  StandardProduct,
} from '@/types'
import { filterProducts, type CatalogFilters } from './filter'

// Small fake items: only the fields the filters read are meaningful.
function standard(
  name: string,
  overrides: Partial<StandardProduct> = {}
): StandardProduct {
  return {
    kind: 'standard',
    id: name,
    slug: name,
    sku: name,
    category: 'fasteners',
    materials: ['S45C'],
    name,
    description: '',
    specs: [],
    unitPrice: 10,
    tiers: [],
    keywords: [],
    ...overrides,
  }
}

function configurable(
  name: string,
  fromPrice: number,
  category: CategoryId = 'shafts'
): ConfigurableFamily {
  return {
    kind: 'configurable',
    id: 'custom-shaft',
    slug: 'shaft',
    category,
    name,
    description: '',
    fromPrice,
  }
}

const noFilters: CatalogFilters = {
  q: '',
  category: null,
  materials: [],
  minPrice: null,
  maxPrice: null,
  configurableOnly: false,
}

const names = (items: CatalogItem[]) => items.map((item) => item.name)

const bolt = standard('Hex Bolt', {
  category: 'fasteners',
  materials: ['S45C', 'SUS304'],
  unitPrice: 5,
  keywords: ['screw'],
})
const bearing = standard('Ball Bearing', {
  category: 'bearings',
  materials: ['SUS304'],
  unitPrice: 20,
})
const profile = standard('Aluminium Profile', {
  category: 'profiles',
  materials: ['A6061'],
  unitPrice: 50,
})
const shaft = configurable('Custom Shaft', 14.61, 'shafts')

const items: CatalogItem[] = [bolt, bearing, profile, shaft]

function run(filters: Partial<CatalogFilters>): string[] {
  return names(filterProducts(items, { ...noFilters, ...filters }))
}

describe('filterProducts', () => {
  it('returns every item when no filter is set', () => {
    expect(run({})).toEqual([
      'Hex Bolt',
      'Ball Bearing',
      'Aluminium Profile',
      'Custom Shaft',
    ])
  })

  it('keeps only the selected category', () => {
    expect(run({ category: 'bearings' })).toEqual(['Ball Bearing'])
  })

  it('keeps items that have any of the selected materials', () => {
    const materials: MaterialId[] = ['SUS304']
    expect(run({ materials })).toEqual(['Hex Bolt', 'Ball Bearing'])
  })

  it('matches several selected materials with OR', () => {
    expect(run({ materials: ['A6061', 'S45C'] })).toEqual([
      'Hex Bolt',
      'Aluminium Profile',
    ])
  })

  it('drops configurable items while a material filter is active', () => {
    expect(run({ materials: ['S45C'] })).not.toContain('Custom Shaft')
  })

  it('includes items priced exactly at the min and max', () => {
    expect(run({ minPrice: 5, maxPrice: 20 })).toEqual([
      'Hex Bolt',
      'Ball Bearing',
      'Custom Shaft',
    ])
  })

  it('uses fromPrice for configurable items', () => {
    expect(run({ maxPrice: 14.61 })).toContain('Custom Shaft')
    expect(run({ maxPrice: 14.6 })).not.toContain('Custom Shaft')
  })

  it('keeps only configurable items when configurableOnly is on', () => {
    expect(run({ configurableOnly: true })).toEqual(['Custom Shaft'])
  })

  it('searches the name ignoring letter case', () => {
    expect(run({ q: 'BEARING' })).toEqual(['Ball Bearing'])
  })

  it('searches the category', () => {
    expect(run({ q: 'profiles' })).toEqual(['Aluminium Profile'])
  })

  it('searches the material', () => {
    expect(run({ q: 'a6061' })).toEqual(['Aluminium Profile'])
  })

  it('searches the keywords', () => {
    expect(run({ q: 'screw' })).toEqual(['Hex Bolt'])
  })

  it('finds configurable items by name and category', () => {
    expect(run({ q: 'custom' })).toEqual(['Custom Shaft'])
    expect(run({ q: 'shafts' })).toEqual(['Custom Shaft'])
  })

  it('treats a query of only spaces as empty', () => {
    expect(run({ q: '   ' })).toHaveLength(items.length)
  })

  it('ignores spaces around the query', () => {
    expect(run({ q: '  bolt ' })).toEqual(['Hex Bolt'])
  })

  it('combines filters with AND', () => {
    expect(run({ materials: ['SUS304'], maxPrice: 10 })).toEqual(['Hex Bolt'])
    expect(run({ category: 'bearings', q: 'bolt' })).toEqual([])
  })

  it('returns an empty list when min price is above max price', () => {
    expect(run({ minPrice: 50, maxPrice: 10 })).toEqual([])
  })

  it('returns an empty list when nothing matches', () => {
    expect(run({ q: 'does not exist' })).toEqual([])
  })

  it('does not change the original array', () => {
    const before = [...items]
    filterProducts(items, { ...noFilters, category: 'bearings' })
    expect(items).toEqual(before)
  })
})
