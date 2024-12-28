import { create } from 'zustand';

const useDeadlineStore = create((set) => ({
    deadline: [],

    addDeadline: (d) => set((state) => ({
        deadline: [...state, d]
    })),

    removeDeadline: (dId) => set((state) => ({
        deadline: state.deadline.filter(d => d.id !== dId)
    })),

    setDeadline: (d) => set({ d })
}))

export { useDeadlineStore };