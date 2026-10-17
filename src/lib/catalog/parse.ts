import { CATEGORIES } from '@/data/categories'
import { CatalogFilters } from './filter'
import { SortKey } from './sort'
import { MATERIALS } from '@/data/materials'
import { CategoryId, MaterialId } from '@/types'

export type CatalogQuery = {
  filters: CatalogFilters
  sort: SortKey
  page: number
}

const VALID_SORT_KEYS: SortKey[] = [
  'relevance',
  'price-asc',
  'price-desc',
  'name',
]
const VALID_CATEGORIES = CATEGORIES.map((c) => c.id)
const VALID_MATERIALS = MATERIALS.map((m) => m.id)

function getFirstParam(
  param: string | string[] | undefined
): string | undefined {
  if (Array.isArray(param)) {
    return param[0]
  }
  return param
}

function parsePrice(param: string | undefined): number | null {
  if (!param || param.trim() === '') return null

  const num = Number(param)
  if (!Number.isFinite(num) || num < 0) {
    return null
  }
  return num
}

export function parseCatalogParams(
  params: Record<string, string | string[] | undefined>
): CatalogQuery {
  const rawQ = getFirstParam(params.q)
  const rawCategory = getFirstParam(params.category)
  const rawMaterial = getFirstParam(params.material)
  const rawMin = getFirstParam(params.min)
  const rawMax = getFirstParam(params.max)
  const rawConfigurable = getFirstParam(params.configurable)
  const rawSort = getFirstParam(params.sort)
  const rawPage = getFirstParam(params.page)

  const filters: CatalogFilters = {
    q: rawQ || '',
    category: VALID_CATEGORIES.includes(rawCategory as CategoryId)
      ? (rawCategory as CategoryId)
      : null,
    materials: rawMaterial
      ? (rawMaterial
          .split(',')
          .filter((m) =>
            VALID_MATERIALS.includes(m as MaterialId)
          ) as MaterialId[])
      : [],
    minPrice: parsePrice(rawMin),
    maxPrice: parsePrice(rawMax),
    configurableOnly: rawConfigurable === '1',
  }

  const sort: SortKey = VALID_SORT_KEYS.includes(rawSort as SortKey)
    ? (rawSort as SortKey)
    : 'relevance'

  let page = 1
  if (rawPage && rawPage.trim() !== '') {
    const parsedPage = Number(rawPage)
    if (Number.isInteger(parsedPage) && parsedPage >= 1) {
      page = parsedPage
    }
  }

  return { filters, sort, page }
}
