import { create } from 'zustand'

export const useDonationFormStore = create((set) => ({

    selectedSeva: null,
    setSelectedSeva: (newSeva) => set((state) => {
        return {
            ...state,
            selectedSeva: newSeva
        }
    }),
    formTabDetails: {
        current: "form",
        type: "indian",
        details: {}
    },
    setFormTabDetails: (newTabDetails) => set((state) => {
        return {
            ...state,
            formTabDetails: newTabDetails
        }
    }),



}))
