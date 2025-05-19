"use client"

import { useContext, createContext, useMemo, useState, useEffect } from "react";

const CampaignAuthContext = createContext(null);

export function CampaignAuthProvider({ children }) {

    const isLocalStorageAvailable = typeof localStorage !== "undefined"

    const [user, setUser] = useState(() => {
        try {
            if (isLocalStorageAvailable) {
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    return JSON.parse(storedUser) || ""
                }
            }
        } catch (error) { }
        return ""
    })

    useEffect(() => {
        if (isLocalStorageAvailable) {
            localStorage.setItem("user", JSON.stringify(user))
        }
    }, [isLocalStorageAvailable, user])

    const values = useMemo(() => {

        return {
            user,
            setUser,
        }

    }, [user, setUser]);


    return (
        <CampaignAuthContext.Provider value={values}>
            {children}
        </CampaignAuthContext.Provider>
    )
}

export function useCampaignAuth() {
    return useContext(CampaignAuthContext);
}