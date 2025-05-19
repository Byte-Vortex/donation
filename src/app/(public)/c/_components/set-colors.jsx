"use client"

import { useLayoutEffect } from "react";

export function SetColors(){
    useLayoutEffect(() => {

        function setColors() {
            document.documentElement.style.setProperty("--landing-primary", "4, 12, 92");
            document.documentElement.style.setProperty("--landing-secondary", "55, 73, 137");
            document.documentElement.style.setProperty("--landing-tertiary", "208, 208, 255");
            document.documentElement.style.setProperty("--landing-background", "248, 248, 255");
        }

        setColors();
    }, []);

    return null;
}