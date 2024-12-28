import { create } from 'zustand';

const useUserStore = create((set) => ({
    student: {},
    tutor: {},

    setStudent: (studentData) => {
        set((state) => ({ student: { ...state.student, ...studentData } }))
    },
    setTutor: (tutorData) => {
        set((state) => ({ tutor: { ...state.tutor, ...tutorData } }))
    },

}))

export { useUserStore };