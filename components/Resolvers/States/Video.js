import { create } from "zustand";
const useVideo = create((set) => ({
  duration: null,
  currentTime: null,
  ended: false,
  currentVideo: null,
  setCurrentVideo: (ref) => set({ currentVideo: ref }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: ({ currentTime }) => set({ currentTime }),
  setPause: (paused) => set({ paused: !paused }),
}));
export default useVideo;
