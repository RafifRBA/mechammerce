export type CategoryId =
  'shafts' | 'brackets' | 'fasteners' | 'bearings' | 'pulleys' | 'profiles'

export type MaterialId = 'S45C' | 'SUS304' | 'A6061'

export interface PriceTier {
  minQty: number
  discountPct: number // e.g. { minQty: 10, discountPct: 5 }
}

export interface StandardProduct {
  kind: 'standard'
  id: string
  slug: string
  sku: string // e.g. "MC-SH-0120"
  category: CategoryId
  materials: MaterialId[]
  name: string
  description: string
  specs: { key: string; value: string }[] // key = label shown in the spec table
  unitPrice: number // USD, 2 decimals
  tiers: PriceTier[]
  keywords: string[]
  featured?: boolean
}

export interface ConfigurableFamily {
  kind: 'configurable'
  id: 'custom-shaft' | 'custom-bracket'
  slug: 'shaft' | 'bracket'
  category: CategoryId
  name: string
  description: string
  fromPrice: number // shown as "From $x" in the catalog
}

export type CatalogItem = StandardProduct | ConfigurableFamily

export interface ShaftConfig {
  diameter: 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 // mm
  length: number // mm, 20..500
  material: MaterialId
  chamfer: boolean // chamfer both ends
  keyway: boolean // only if diameter >= 8
  quantity: number // 1..1000
}

export interface BracketConfig {
  width: number // leg A length, mm, 20..200
  height: number // leg B length, mm, 20..200
  depth: number // mm, 20..100
  thickness: 2 | 3 | 4 | 5 | 6 // mm
  holesPerLeg: 0 | 1 | 2 | 3
  holeDiameter: 4 | 5 | 6 | 8 | 10 // mm
  material: MaterialId
  quantity: number // 1..1000
}

export interface Quote {
  unitPrice: number // after tier discount
  listUnitPrice: number // before discount
  discountPct: number
  lineTotal: number
  leadTimeDays: number // business days
  massKg: number // per piece
}

export type CartItem =
  | { type: 'standard'; productId: string; quantity: number }
  | {
      type: 'shaft'
      config: ShaftConfig
      unitPrice: number
      leadTimeDays: number
    }
  | {
      type: 'bracket'
      config: BracketConfig
      unitPrice: number
      leadTimeDays: number
    }

export interface Order {
  id: string // MC-YYYYMMDD-XXXX
  createdAt: string // ISO
  items: CartItem[]
  contact: { name: string; email: string; phone: string }
  shipping: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  payment: 'card' | 'bank' | 'cod'
  totals: { subtotal: number; shipping: number; total: number }
}
