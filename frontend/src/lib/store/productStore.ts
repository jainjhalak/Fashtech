import { create } from "zustand"

interface Product {
  id: string
  name: string
  price: number
  type: string
  images: string[]
  category: string
  description: string
  stock: number
}

interface ProductState {
  products: Product[]
  setProducts: (products: Product[]) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products })
}))