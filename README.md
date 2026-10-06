# Mechammerce

An e-commerce web app for standard and custom mechanical parts, with a live 3D product configurator.

> **Demo project.** The brand, products, and prices are fictional. No real payment is processed.

**Live demo:** [Mechammerce](https://mechammerce.vercel.app/)

## Status

Work in progress. The app shell (layout, design tokens, base UI components) is done. Next up: product catalog, cart and checkout, then the 3D configurator.

## Planned features

- Product catalog with search, filters, and sorting (state kept in the URL)
- Product pages for standard parts
- Configurator for custom shafts and L-brackets with a live 3D preview, instant price, and lead time
- Cart and a mock checkout flow
- Responsive and keyboard-accessible UI

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · Zustand · React Hook Form + Zod · three.js with React Three Fiber · Vitest + Testing Library · Playwright

There is no backend: product data is seed data in the repo, and the cart and orders live in the browser's `localStorage`.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Scripts

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the dev server              |
| `npm run build`     | Create a production build         |
| `npm run lint`      | Run ESLint                        |
| `npm run typecheck` | Check types with TypeScript       |
| `npm run format`    | Format code with Prettier         |
| `npm run test`      | Run unit tests (Vitest)           |
| `npm run test:e2e`  | Run end-to-end tests (Playwright) |
