"use client"

import { useLayoutEffect } from "react";

export function SetColors(){
    useLayoutEffect(() => {

        function setColors() {
            document.documentElement.style.setProperty("--patron-background", "137, 3, 107");
            document.documentElement.style.setProperty("--patron-card-background", "158, 12, 156");
        }

        setColors();
    }, []);

    return null;
}