import type { MaterialId } from '@/types'

export interface Material {
  id: MaterialId
  name: string
  description: string
}

export const MATERIALS: Material[] = [
  {
    id: 'S45C',
    name: 'S45C steel',
    description:
      'Medium carbon steel. Strong and affordable; needs a coating against rust.',
  },
  {
    id: 'SUS304',
    name: 'SUS304 stainless steel',
    description:
      'Corrosion resistant and food safe. Harder to machine, so slightly longer lead time.',
  },
  {
    id: 'A6061',
    name: 'A6061 aluminum',
    description:
      'Light and easy to machine. About a third of the weight of steel.',
  },
]
