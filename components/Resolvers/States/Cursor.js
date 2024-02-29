import { create } from "zustand";
const useCursor = create((set) => ({
  cursorPosition: { x: 0, y: 0 },
  cursorVariant: "default",
  isOverProject: false
}));
export default useCursor;
