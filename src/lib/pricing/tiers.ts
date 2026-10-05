export type PriceTier = {
  minQty: number
  discountPct: number
}

export function getDiscount(qty: number, tiers: PriceTier[]): number {
  // Kalau b positif dia bakal pindah ke depan a -> descending
  const sortedTiers = [...tiers].sort((a, b) => b.minQty - a.minQty)

  // Simpan objek yang minQty nya lebih kecil dari qty
  const matchedTier = sortedTiers.find((tier) => qty >= tier.minQty)

  return matchedTier ? matchedTier.discountPct : 0
}
