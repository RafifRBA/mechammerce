import Link from 'next/link'
import { ProductVisual } from '@/components/product/ProductVisual'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES } from '@/data/categories'
import { formatPrice } from '@/lib/format/currency'
import type { CatalogItem } from '@/types'

type ProductCardProps = {
  item: CatalogItem
}

function hrefOf(item: CatalogItem): string {
  return item.kind === 'standard'
    ? `/products/${item.slug}`
    : `/configurator/${item.slug}`
}

function categoryName(item: CatalogItem): string {
  return CATEGORIES.find((c) => c.id === item.category)?.name ?? item.category
}

// The product name is the only link; its ::after covers the whole card, so the
// whole card is clickable but a screen reader still hears one link per product.
export function ProductCard({ item }: ProductCardProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg transition-shadow hover:shadow-md has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
      <ProductVisual category={item.category} label={item.name} />

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {categoryName(item)}
        </p>

        <h2 className="text-base font-semibold leading-snug">
          <Link
            href={hrefOf(item)}
            className="after:absolute after:inset-0 focus-visible:outline-hidden"
          >
            {item.name}
          </Link>
        </h2>

        <div className="mt-auto flex flex-col items-start gap-1 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          {item.kind === 'standard' ? (
            <>
              <p className="font-mono text-xs text-text-muted">
                {item.materials.join(' · ')}
              </p>
              <p className="text-lg font-semibold">
                {formatPrice(item.unitPrice)}
              </p>
            </>
          ) : (
            <>
              <Badge variant="accent">Configurable</Badge>
              <p className="text-lg font-semibold">
                <span className="mr-1 text-xs font-medium text-text-muted">
                  From
                </span>
                {formatPrice(item.fromPrice)}
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
