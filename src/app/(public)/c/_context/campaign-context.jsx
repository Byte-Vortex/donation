"use client";

import { createContext, useContext } from "react";
const Context = createContext(null);

export function CampaignPageProvider({ data, basicDetails, children }) {

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

export function useCampaignPageDetails() {
    return useContext(Context);
}