"use client";

import { createContext, useContext } from "react";
const Context = createContext(null);

export function LandingPageProvider({ data, basicDetails, children }) {

    const values = {
        data,
        basicDetails
    }
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export function useLandingPageDetails() {
    return useContext(Context);
}