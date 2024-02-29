import { create } from "zustand";

export const useCreditOffset = create((set) => ({
  creditOffset: 0,
  setCreditOffset: (offset) => set({ creditOffset: offset }),
}));
