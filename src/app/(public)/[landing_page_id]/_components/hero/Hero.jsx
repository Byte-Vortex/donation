"use client"

import { clsx } from "clsx";
import { Image } from "@/components/image";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import dynamic from "next/dynamic";
import Link from "next/link";
// import YtVideo from "./yt-video";
const YtVideo = dynamic(() => import("./yt-video").then((_) => _.YtVideo), { ssr: false })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Hero({ heroData }) {

    const [isPhone, setIsPhone] = useState(false);


    function isPhoneWidth() {
        return (window.innerWidth < 767);
    }

    const setPhone = useDebouncedCallback(() => {
        setIsPhone(isPhoneWidth());
    }, 300);

    useEffect(() => {
        setIsPhone(isPhoneWidth());
        window.addEventListener('resize', setPhone);

        return () => window.removeEventListener('resize', setPhone);
    }, []);


    const videoId = isPhone ? heroData.phone.video : heroData.desktop.video

    return (
        <div
            id="home"
            className="w-full relative z-0 bg-landing-tertiary select-none aspect-w-[0.59] min-[767px]:aspect-w-[2.63] aspect-h-1"
        >
            <Link href="#form" className="rounded-b-[3rem] overflow-hidden shadow-xl h-full w-full block">

                <div className="relative h-full w-full">

                    <div className={clsx("w-full h-full duration-500 delay-75")}>


                        <picture>
                            <source media="(max-width: 767px)" srcSet={BASE_URL + heroData.phone.image} />
                            <source srcSet={BASE_URL + heroData.desktop.image} />

                            <Image
                                loadingAnimation={false}
                                fill
                                priority
                                className='w-full h-full object-cover'
                                src={BASE_URL + heroData.desktop.image}
                            />

                        </picture>
                    </div>

                    {videoId && <YtVideo videoId={videoId} />}


                </div>


            </Link>

        </div >
    )
}