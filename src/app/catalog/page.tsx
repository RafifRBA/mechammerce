import type { Metadata } from 'next'
import Link from 'next/link'
import { ProductCard } from '@/components/catalog/ProductCard'
import { catalogItems } from '@/data/products.seed'
import { filterProducts } from '@/lib/catalog/filter'
import { paginate } from '@/lib/catalog/paginate'
import { parseCatalogParams } from '@/lib/catalog/parse'
import { sortProducts } from '@/lib/catalog/sort'

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse standard mechanical parts or configure a custom shaft or bracket.',
}

// The URL is the source of truth: every request re-reads searchParams and runs
// the same four pure steps (parse -> filter -> sort -> paginate).
export default async function CatalogPage({
  searchParams,
}: PageProps<'/catalog'>) {
  const query = parseCatalogParams(await searchParams)
  const filtered = filterProducts(catalogItems, query.filters)
  const sorted = sortProducts(filtered, query.sort)
  const result = paginate(sorted, query.page)

  const first = (result.page - 1) * result.pageSize + 1
  const last = first + result.items.length - 1
  const noun = result.totalItems === 1 ? 'product' : 'products'

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Catalog</h1>

      <p
        role="status"
        aria-live="polite"
        className="mt-2 min-h-6 text-sm text-text-muted"
      >
        {result.totalItems === 0
          ? 'No products found'
          : `Showing ${first}–${last} of ${result.totalItems} ${noun}`}
      </p>

      {result.items.length > 0 ? (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {result.items.map((item) => (
            <li key={item.id}>
              <ProductCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-surface px-6 py-12 text-center">
          <p className="text-lg font-semibold">Nothing matches these filters</p>
          <p className="mt-1 text-sm text-text-muted">
            Try a different search or remove some filters.
          </p>
          <Link
            href="/catalog"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Clear filters
          </Link>
        </div>
      )}
    </div>
  )
}
