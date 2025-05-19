"use client"

import { useEffect, useState } from "react"

export function YtVideo({ videoId }) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        mounted && <iframe
            loading="eager"
            className="bg-black pointer-events-none w-[300%] h-[100%] ml-[-100%] absolute z-10 top-0 left-0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&playlist=${videoId}&loop=1&mute=1&rel=0&controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
    )
}