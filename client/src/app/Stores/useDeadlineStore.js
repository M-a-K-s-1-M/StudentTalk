import { create } from 'zustand';

const useDeadlineStore = create((set) => ({
    deadline: [],

    setDeadline: (deadline) => set({ deadline })
}))

export { useDeadlineStore };