import { create } from "zustand"

interface Outfit {
  id: string
  name: string
  description: string
  styleCategory: string
  coverImage: string
}

interface OutfitState {
  outfits: Outfit[]
  setOutfits: (outfits: Outfit[]) => void
}

export const useOutfitStore = create<OutfitState>((set) => ({
  outfits: [],
  setOutfits: (outfits) => set({ outfits })
}))