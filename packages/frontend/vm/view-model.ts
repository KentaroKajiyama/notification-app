import { create } from "zustand";

type State = {
  count: number;
}

type Action = {
  setCount: (count: number) => void;
  addCount: (current: number) => void;
  removeCount: () => void;
}

export const useNotificationsVM = create<State&Action>()(
  (set) => ({
    count: 0,
    setCount: (count) => set({ count }),
    addCount: () => set(state => ({ count: state.count + 1 })),
    removeCount: () => set({ count: 0 }),
  })
)