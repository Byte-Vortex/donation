"use client"

import { clsx } from "clsx";
import { Image } from "@/components/image";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Hero({ heroData }) {

    const [videoLoaded, setVideoLoaded] = useState(false);

    const [isPhone, setIsPhone] = useState(false);


    function isPhoneWidth() {
        return (window.innerWidth < 767);
    }

    const setPhone = useDebouncedCallback(() => {
        setIsPhone(isPhoneWidth());
    }, 300);

    useEffect(() => {
        setVideoLoaded(false);
    }, [isPhone]);

    useEffect(() => {
        setIsPhone(isPhoneWidth());
        window.addEventListener('resize', setPhone);

        return () => window.removeEventListener('resize', setPhone);
    }, []);

    return (
        <div
            id="home"
            className="w-full relative z-0 bg-landing-tertiary select-none aspect-w-[0.59] min-[767px]:aspect-w-[2.63] aspect-h-1"
        >
            <a href="#form" className="rounded-b-3xl overflow-hidden shadow-xl h-full w-full block">

                <div className="relative h-full w-full">

                    <div className={clsx("w-full h-full duration-500 delay-75 absolute", videoLoaded ? "opacity-100" : "opacity-0 hidden")}>

                        <video
                            key={isPhone ? "phone" : "desktop"}
                            onPlay={() => setVideoLoaded(true)}
                            autoPlay
                            muted
                            loop
                            className={"object-cover h-full w-full duration-500 delay-75"}
                        >
                            <source src={BASE_URL + (isPhone ? heroData.phone.video : heroData.desktop.video)} />
                            Your browser does not support the video tag.
                        </video>
                    </div>


                    <div className={clsx("w-full h-full duration-500 delay-75 absolute", !videoLoaded ? "opacity-100" : "opacity-0 -z-10")}>


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

                </div>


            </a>

        </div >
    )
}