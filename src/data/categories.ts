import type { CategoryId } from '@/types'

export interface Category {
  id: CategoryId
  name: string
  description: string
  skuCode: string // two letters used in product SKUs, e.g. MC-SH-0120
}

export const CATEGORIES: Category[] = [
  {
    id: 'shafts',
    name: 'Shafts',
    description: 'Precision ground round shafts and stepped pins.',
    skuCode: 'SH',
  },
  {
    id: 'brackets',
    name: 'Brackets',
    description: 'Angle, corner and mounting brackets.',
    skuCode: 'BR',
  },
  {
    id: 'fasteners',
    name: 'Fasteners',
    description: 'Bolts, nuts, screws and washers.',
    skuCode: 'FS',
  },
  {
    id: 'bearings',
    name: 'Bearings & Bushings',
    description: 'Ball bearings, flanged bearings and plain bushings.',
    skuCode: 'BG',
  },
  {
    id: 'pulleys',
    name: 'Pulleys & Belts',
    description: 'Timing and V-belt pulleys and tensioners.',
    skuCode: 'PL',
  },
  {
    id: 'profiles',
    name: 'Aluminum Profiles',
    description: 'T-slot extrusions and profile accessories.',
    skuCode: 'AP',
  },
]
