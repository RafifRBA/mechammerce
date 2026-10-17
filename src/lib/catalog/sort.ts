import type { CatalogItem } from '@/types'

export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'name'

function priceOf(item: CatalogItem): number {
  if (item.kind === 'standard') {
    return item.unitPrice
  }
  return item.fromPrice
}

export function sortProducts(
  items: CatalogItem[],
  sort: SortKey
): CatalogItem[] {
  if (sort === 'relevance') return [...items]

  return [...items].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return priceOf(a) - priceOf(b)
      case 'price-desc':
        return priceOf(b) - priceOf(a)
      case 'name':
        return a.name.localeCompare(b.name) // LocalCompare otomatis menangani perbedaan kapital
      default:
        return 0
    }
  })
}
