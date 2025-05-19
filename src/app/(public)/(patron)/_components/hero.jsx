"use client"

import { clsx } from "clsx";
import { useState } from "react";
import Prop2 from "../_images/prop-2.svg"
import { Image } from "@/components/image";

export default function Hero({ pageName, backgroundImage }) {

    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
    return (
        <section
            id="home"
            className="flex text-white  w-full bg-cover bg-center bg-no-repeat relative z-[1] font-Hero text-center bg-blend-overlay"
        >
            <div data-aos-delay="300" className="flex min-h-screen flex-col justify-end items-center p-4 w-full mx-auto max-w-7xl gap-4 z-10">
                <div className="mb-32 max-w-max">
                    <Image loadingAnimation={false} src={Prop2} className="mb-4 w-full" alt="" />
                    <h1 className="font-normal font-Hero uppercase">
                        {pageName}
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl uppercase">
                        Of Gupt Vrindavan Dham, Jaipur
                    </p>
                    <Image loadingAnimation={false} src={Prop2} className="rotate-180 mt-4 w-full" alt="" />
                </div>

            </div>


            <div
                className="absolute w-full h-full bottom-0 left-0 bg-transparent select-none">
                <Image loadingAnimation={false} priority onLoad={() => setBackgroundImageLoaded(true)} className={clsx("object-cover h-full w-full duration-500 delay-75", !backgroundImageLoaded && "opacity-0")} src={backgroundImage} alt="" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-patron-background">
                </div>
            </div>
        </section>
    )
}