"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css/effect-fade";
import clsx from "clsx";
import { Image } from "@/components/image";
// import { YtVideo } from "./yt-video";
const YtVideo = dynamic(() => import("./yt-video").then((m) => m.YtVideo), { ssr: false });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function HeroSection({ heroData }) {
    const [isPhone, setIsPhone] = useState(false);

    const isPhoneWidth = () => window.innerWidth < 767;

    const setPhone = useDebouncedCallback(() => {
        setIsPhone(isPhoneWidth());
    }, 300);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setIsPhone(isPhoneWidth());
        window.addEventListener("resize", setPhone);
        return () => window.removeEventListener("resize", setPhone);
    }, []);

    const firstType = heroData?.banners?.type;
    const banners = heroData?.banners?.banners || [];
    const insightsSection = heroData?.sections?.find(
        (section) => section.type === "insights"
    );

    const roundedBottom = insightsSection ? true : false;

    if (firstType === "image") {
        return (
            <section
                id="home"
                className="aspect-h-1 overflow-hidden aspect-w-[0.59] min-[767px]:aspect-w-[2.63] z-0 bg-landing-tertiary"
            >
                <Swiper
                    className={`w-full h-full ${roundedBottom ? "rounded-none" : "rounded-b-xl"}`}
                    spaceBetween={0}
                    keyboard={{ enabled: true }}
                    mousewheel={{ forceToAxis: true }}
                    modules={[Autoplay, Keyboard, Mousewheel]}
                    slidesPerView={1}
                    loop
                    autoplay={{
                        delay: 3000,
                        waitForTransition: true,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: true,
                    }}
                >
                    {banners.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ImageSlide rounded_bottom={roundedBottom} item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        );
    }

    if (firstType === "video") {
        const item = banners[0]; // Only one video
        return <VideoHero heroData={item} />;
    }

    return null;
}

// Slide for type: "image"
function ImageSlide({ item, rounded_bottom }) {
    return (
        <Link href="#form" className={`overflow-hidden h-full w-full block ${rounded_bottom ? "rounded-none" : "rounded-b-3xl"}`}>
            <div className="relative h-full w-full">
                <div className="w-full h-full duration-500 delay-75">
                    <picture>
                        <source media="(max-width: 767px)" srcSet={item.mobile} />
                        <source srcSet={item.desktop} />
                        <Image
                            loadingAnimation={false}
                            fill
                            priority
                            className="w-full h-full object-cover"
                            src={item.desktop}
                            alt="Hero Image"
                        />
                    </picture>
                </div>
            </div>
        </Link>
    );
}

// Video Hero
function VideoHero({ heroData, isPhone }) {
    const videoId = isPhone ? heroData.mobile?.video : heroData.desktop?.video;
    const imageSrc = isPhone ? heroData.mobile?.image : heroData.desktop?.image;

    return (
        <div className="relative aspect-w-[0.59] min-[767px]:aspect-w-[2.63] aspect-h-1 bg-landing-tertiary">
            <picture>
                <source media="(max-width: 767px)" srcSet={BASE_URL + imageSrc} />
                <source srcSet={BASE_URL + imageSrc} />
                <img
                    src={BASE_URL + imageSrc}
                    alt="Video Background"
                    className="object-cover w-full h-full"
                />
            </picture>
            {videoId && <YtVideo videoId={videoId} />}
        </div>
    );
}
