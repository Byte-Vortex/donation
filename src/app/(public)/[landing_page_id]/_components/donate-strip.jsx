"use client"
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ShinyLink } from "../../../../components/misc/shiny-link";
export function DonateStrip({ stripe_text }) {

    const [visible, setVisible] = useState(false)
    const handleScroll = useDebouncedCallback(() => {
        const currentScrollPos = window.scrollY
        setVisible(currentScrollPos > 150);
    }, 30);

    useEffect(() => {
        handleScroll();
        if (typeof window === "undefined") return;
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <div className={clsx("fixed w-full bottom-0 -mb-[1px] left-0 font-semibold tracking-wide elevation-1 text-white h-[48px] bg-[#080807] flex justify-between items-center gap-1 px-2 duration-300", visible ? "z-50 opacity-100" : "-z-10 opacity-0")} >
            <div className="block text-landing-tertiary">
                <p className="text-[18px]">{stripe_text ?? "Donate for Temple"}</p>
            </div>
            <ShinyLink className="px-4 py-1.5">Donate</ShinyLink>
        </div> 
    )
}