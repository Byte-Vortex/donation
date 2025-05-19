"use client"

import clsx from "clsx";
import { useState, useEffect } from "react";

import { DonateButton } from "../../../_components/donate-button";
import { useDebouncedCallback } from "use-debounce";
import { LoginProfileButton } from "./login-profile-button";

export function DonateStrip({ stripe_text }) {


    const [visible, setVisible] = useState(false)
    const handleScroll = useDebouncedCallback(() => {
        const currentScrollPos = window.scrollY
        setVisible(currentScrollPos > 150);
    }, 30);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <div className={clsx("text-sm fixed w-full bottom-0 left-0 font-bold  elevation-1 py-0.5 bg-landing-tertiary border-t-[2px] border-landing-primary flex justify-between items-center gap-1 px-2 md:text-base duration-300", visible ? "z-50 opacity-100" : "-z-10 opacity-0")} >

            <LoginProfileButton />

            <div className="block text-landing-primary text-center">
                {stripe_text ?? "Radha Krishna Temple Construction"}
            </div>

            <DonateButton />
        </div>
    )
}