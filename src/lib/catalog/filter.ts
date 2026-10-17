import { CatalogItem, CategoryId, MaterialId } from '@/types'
import { priceOf } from './price'

export type CatalogFilters = {
  q: string
  category: CategoryId | null
  materials: MaterialId[]
  minPrice: number | null
  maxPrice: number | null
  configurableOnly: boolean
}

export function filterProducts(
  items: CatalogItem[],
  filters: CatalogFilters
): CatalogItem[] {
  const searchQuery = filters.q.toLowerCase().trim()

  return items.filter((item) => {
    // 1. configurability
    if (filters.configurableOnly && item.kind !== 'configurable') {
      return false
    }

    // 2. materials
    if (filters.materials.length > 0) {
      if (item.kind === 'configurable') {
        return false
      }

      const hasMatchingMaterials = item.materials.some((mat) =>
        filters.materials.includes(mat)
      )
      if (!hasMatchingMaterials) {
        return false
      }
    }

    // 3. category
    if (filters.category && item.category !== filters.category) {
      return false
    }

    // 4. Price (min or max)
    const price = priceOf(item)
    if (filters.minPrice !== null && price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== null && price > filters.maxPrice) {
      return false
    }

    // 5. query search (q)
    if (searchQuery) {
      const matchName = item.name.toLowerCase().includes(searchQuery)
      const matchCategory = item.category.toLowerCase().includes(searchQuery)

      let matchMaterials = false
      let matchKeywords = false

      if (item.kind === 'standard') {
        matchMaterials = item.materials.some((m) =>
          m.toLowerCase().includes(searchQuery)
        )
        matchKeywords = item.keywords.some((k) =>
          k.toLowerCase().includes(searchQuery)
        )
      }

      if (!matchName && !matchCategory && !matchKeywords && !matchMaterials) {
        return false
      }
    }
    return true
  })
}
