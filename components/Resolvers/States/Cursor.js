import { create } from "zustand";
const useCursor = create((set) => ({
  cursorPosition: { x: 0, y: 0 },
  cursorVariant: "default",
  isOverProject: false,
  description: "",
  title: "",
  shouldrenderdetailsontop: false,
  nexturl:""
}));
export default useCursor;
