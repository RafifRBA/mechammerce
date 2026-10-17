export type Page<T> = {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export function paginate<T>(items: T[], page: number, pageSize = 12): Page<T> {
  const totalItems = items.length
  // handler kalau ada totalitems nol
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // clamp page
  const wanted = Number.isInteger(page) && page >= 1 ? page : 1
  const safepage = Math.min(wanted, totalPages)

  const start = (safepage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    page: safepage,
    pageSize,
    totalItems,
    totalPages,
  }
}
