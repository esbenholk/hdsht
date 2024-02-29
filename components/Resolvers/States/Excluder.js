import { useEffect } from "react";
import { create } from "zustand";
export const useExcluder = create((set) => ({
  height: 0,
  width: 0,
  offsetTop: 0,
  offsetLeft: 0,
  opacity: 0,
  borderRadius: 0,
  moveExcluder: (ref) => {
    set({
      height: ref.clientHeight,
      width: ref.clientWidth,
      offsetTop: ref.getBoundingClientRect().y,
      offsetLeft: ref.getBoundingClientRect().x,
      opacity: 0.9,
      borderRadius: ref.style.borderRadius,
    });
  },
  removeExcluder: () => {
    set({
      height: 0,
      width: 0,
      offsetTop: 0,
      offsetLeft: 0,
      opacity: 0,
      borderRadius: 0,
    });
  },
}));
