import { describe, it, expect } from 'vitest'
import { CATEGORIES } from './categories'
import { MATERIALS } from './materials'
import {
  catalogItems,
  configurableFamilies,
  standardProducts,
} from './products.seed'

const categoryIds = CATEGORIES.map((c) => c.id)
const materialIds = MATERIALS.map((m) => m.id)

function hasDuplicates(values: string[]): boolean {
  return new Set(values).size !== values.length
}

describe('seed data: uniqueness', () => {
  it('has unique ids across standard products and families', () => {
    expect(hasDuplicates(catalogItems.map((i) => i.id))).toBe(false)
  })

  it('has unique slugs among standard products', () => {
    expect(hasDuplicates(standardProducts.map((p) => p.slug))).toBe(false)
  })

  it('has unique SKUs', () => {
    expect(hasDuplicates(standardProducts.map((p) => p.sku))).toBe(false)
  })
})

describe('seed data: content rules', () => {
  it('has 24 standard products, 4 in each of the 6 categories', () => {
    expect(standardProducts).toHaveLength(24)
    for (const id of categoryIds) {
      expect(standardProducts.filter((p) => p.category === id)).toHaveLength(4)
    }
  })

  it('has the 2 configurable families', () => {
    expect(configurableFamilies.map((f) => f.slug).sort()).toEqual([
      'bracket',
      'shaft',
    ])
  })

  it('has 4 featured products for the home page', () => {
    expect(standardProducts.filter((p) => p.featured)).toHaveLength(4)
  })

  it('has a price above zero on every item', () => {
    for (const p of standardProducts) expect(p.unitPrice).toBeGreaterThan(0)
    for (const f of configurableFamilies) expect(f.fromPrice).toBeGreaterThan(0)
  })

  it('uses a SKU that matches its category code', () => {
    for (const p of standardProducts) {
      const code = CATEGORIES.find((c) => c.id === p.category)?.skuCode
      expect(p.sku).toMatch(new RegExp(`^MC-${code}-\\d{4}$`))
    }
  })

  it('only references known categories and materials', () => {
    for (const item of catalogItems)
      expect(categoryIds).toContain(item.category)
    for (const p of standardProducts) {
      expect(p.materials.length).toBeGreaterThan(0)
      for (const m of p.materials) expect(materialIds).toContain(m)
    }
  })

  it('has at least one spec and some keywords on every product', () => {
    for (const p of standardProducts) {
      expect(p.specs.length).toBeGreaterThan(0)
      expect(p.keywords.length).toBeGreaterThan(0)
    }
  })
})

describe('seed data: price tiers', () => {
  it('starts every tier list at quantity 1 with no discount', () => {
    for (const p of standardProducts) {
      expect(p.tiers[0]).toEqual({ minQty: 1, discountPct: 0 })
    }
  })

  it('has quantities and discounts that only go up', () => {
    for (const p of standardProducts) {
      for (let i = 1; i < p.tiers.length; i++) {
        const prev = p.tiers[i - 1]
        const curr = p.tiers[i]
        expect(curr?.minQty).toBeGreaterThan(prev?.minQty ?? Infinity)
        expect(curr?.discountPct).toBeGreaterThan(prev?.discountPct ?? Infinity)
      }
    }
  })
})
