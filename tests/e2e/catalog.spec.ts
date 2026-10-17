import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('catalog shows the first page of products', async ({ page }) => {
  await page.goto('/catalog')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Catalog')
  await expect(page.getByRole('status')).toHaveText(
    'Showing 1–12 of 26 products'
  )
  await expect(
    page.getByRole('listitem').filter({ has: page.locator('article') })
  ).toHaveCount(12)
})

test('the URL decides what is shown', async ({ page }) => {
  await page.goto('/catalog?category=shafts&sort=price-asc')

  await expect(page.getByRole('status')).toHaveText('Showing 1–5 of 5 products')
  // Cheapest shaft first.
  await expect(page.getByRole('heading', { level: 2 }).first()).toContainText(
    'Precision Ground Shaft Ø10'
  )
})

test('a page past the end shows the last page', async ({ page }) => {
  await page.goto('/catalog?page=99')
  await expect(page.getByRole('status')).toHaveText(
    'Showing 25–26 of 26 products'
  )
})

test('an empty result offers a working Clear filters link', async ({
  page,
}) => {
  await page.goto('/catalog?q=zzz')
  await expect(page.getByRole('status')).toHaveText('No products found')

  await page.getByRole('link', { name: 'Clear filters' }).click()
  await expect(page).toHaveURL(/\/catalog$/)
  await expect(page.getByRole('status')).toContainText('of 26 products')
})

test('catalog has no accessibility violations', async ({ page }) => {
  await page.goto('/catalog')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
