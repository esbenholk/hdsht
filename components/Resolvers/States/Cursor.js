import { create } from "zustand";
const useCursor = create((set) => ({
  cursorPosition: { x: 0, y: 0 },
  cursorVariant: "default",
  isOverProject: false,
  description: "",
  title: "",
  shouldrenderdetailsontop: false,
  nexturl:"",
  instruction: "",
  carouselTopLeftPos: {x:0,y:0}
}));
export default useCursor;
