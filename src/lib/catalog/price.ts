import type { CatalogItem } from '@/types'

export function priceOf(item: CatalogItem): number {
  if (item.kind === 'standard') {
    return item.unitPrice
  }
  return item.fromPrice
}
