"use client";

import { create } from "zustand";

type ItemUIState = {
  search: string;
  category: string | null;
  setSearch: (v: string) => void;
  setCategory: (v: string | null) => void;
  reset: () => void;
};

export const useItemUIStore = create<ItemUIState>()((set) => ({
  search: "",
  category: null,
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  reset: () => set({ search: "", category: null }),
}));
