"use client"

import { createContext, useContext, useState } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from "zustand/middleware";
const StoreContext = createContext(null)


/*
The global store of this application, I first thought of just using context, but to prevent
re-renders on context value change I thought of using zustand as the external store, but then I read this article
https://tkdodo.eu/blog/zustand-and-react-context
so I thought of going with a mixture,

from the official docs of zustand I also found out the simple way to persist the zustand values to local storage.
*/
export const FormStoreProvider = ({ children }) => {

    const [store] = useState(() => {
        return createStore(
            persist(
                immer((set) => ({
                    formValues: {},
                    actions: {
                        setFormValues: (formKey, formValues) => {
                            const expiry = new Date();
                            expiry.setHours(expiry.getHours() + 1);
                            set((state) => {
                                state.formValues[formKey] = {
                                    values: formValues,
                                    expiry
                                }
                            })
                        },
                    },

                })
                ),
                {
                    name: "persist",
                    //we are using partialize so as to just persisit the required values in the local storage, for here, 
                    //it's only formValues.
                    partialize: (state) => ({ formValues: state.formValues }),
                }
            )

        )

    })

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useFormStore = (selector) => {

    const store = useContext(StoreContext)

    if (!store) {

        throw new Error('Missing FormStoreProvider')

    }

    return useZustandStore(store, selector)

}