import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const navLinkClasses =
  'inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-text hover:bg-surface-2'

export function Header() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="text-text order-1 inline-flex min-h-11 items-center rounded-md text-lg font-semibold tracking-tight"
        >
          Mecham<span className="text-accent">merce</span>
        </Link>

        <nav
          aria-label="Main"
          className="order-3 flex w-full gap-1 md:order-2 md:w-auto"
        >
          <Link href="/catalog" className={navLinkClasses}>
            Catalog
          </Link>
          <Link href="/configurator/shaft" className={navLinkClasses}>
            Configurator
          </Link>
        </nav>

        <form
          role="search"
          action="/catalog"
          className="order-4 w-full md:order-3 md:ml-auto md:w-72"
        >
          <label htmlFor="header-search" className="sr-only">
            Search parts
          </label>
          <input
            id="header-search"
            type="search"
            name="q"
            placeholder="Search parts…"
            className="min-h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-text placeholder:text-text-muted/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </form>

        <div className="order-2 ml-auto flex items-center gap-1 md:order-4 md:ml-0">
          <Button variant="ghost" disabled aria-label="Language">
            ID / EN
          </Button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-text hover:bg-surface-2"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
