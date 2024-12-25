import { create } from 'zustand';

const useUserStore = create((set) => ({
    student: {},
    tutor: {},

    setStudent: (student) => set({ student }),
    setTutor: (tutor) => set({ tutor }),

}))

export { useUserStore };