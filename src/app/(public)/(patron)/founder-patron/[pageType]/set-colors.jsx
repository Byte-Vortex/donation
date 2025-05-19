"use client"

import { useLayoutEffect } from "react";

export function SetColors(){
    useLayoutEffect(() => {

        function setColors() {
            document.documentElement.style.setProperty("--patron-background", "10, 36, 85");
            document.documentElement.style.setProperty("--patron-card-background", "41, 137, 228");
        }

        setColors();
    }, []);

    return null;
}