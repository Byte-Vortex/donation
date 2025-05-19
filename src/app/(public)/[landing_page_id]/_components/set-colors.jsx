"use client"

import { useEffect } from "react";

export function SetColors({colors}){
    useEffect(() => {

        if (!colors) return;

        function setColors(colors) {
            document.documentElement.style.setProperty("--landing-primary", colors.primary);
            document.documentElement.style.setProperty("--landing-secondary", colors.secondary);
            document.documentElement.style.setProperty("--landing-tertiary", colors.tertiary);
            document.documentElement.style.setProperty("--landing-background", colors.background || "255, 255, 255");
        }

            setColors(colors);

    }, [colors]);

    return null;
}