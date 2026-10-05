import { describe, it, expect } from "vitest";
import { type PriceTier, getDiscount } from "./tiers";

const TIERS: PriceTier[] = [
    { minQty: 1, discountPct: 0 },
    { minQty: 10, discountPct: 5 },
    { minQty: 50, discountPct: 10 },
    { minQty: 200, discountPct: 15 },
];

describe('getDiscount', () => {
    it('returns empty array if null array', () => {
        expect(getDiscount(5, [])).toBe(0);
    });
    it('returns 0% at exactly 0 units', () => {
        expect(getDiscount(0, TIERS)).toBe(0);
    });
    it('returns 0% below the first discount tier', () => {
        expect(getDiscount(9, TIERS)).toBe(0);
    });
    it('returns 5% at exactly 10 units', () => {
        expect(getDiscount(10, TIERS)).toBe(5);
    });
    it('returns 5% below the second discount tier', () => {
        expect(getDiscount(49, TIERS)).toBe(5);
    });
    it('returns 10% at exactly 50 units', () => {
        expect(getDiscount(50, TIERS)).toBe(10);
    });
    it('returns 10% below the third discount tier', () => {
        expect(getDiscount(199, TIERS)).toBe(10);
    });
    it('returns 15%, the highest discount', () => {
        expect(getDiscount(200, TIERS)).toBe(15);
    });
});