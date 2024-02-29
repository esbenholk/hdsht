import { create } from "zustand";
export const useFooterOffset = create((set) => ({
  footerOffset: 0,
  setFooterOffset: (offset) => {
    set({ footerOffset: offset });
  },
}));
