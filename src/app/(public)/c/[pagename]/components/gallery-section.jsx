"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import 'swiper/css/pagination';
import { Image } from "@/components/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export default function GallerySection({ data }) {

    return (
        <div
            style={{
                backgroundImage: `url('${BASE_URL + data.backgroundImage}')`
            }}
            className="py-12 bg-cover">

            <div className="max-w-7xl mx-auto px-4 space-y-8">
                <h3 className="text-5xl text-center font-bold text-landing-background">{data.title}</h3>
                <Slider slides={data.images} />
            </div>
        </div>
    )
}


function Slider({ slides }) {
    return (
        <div className="rounded-xl w-full overflow-hidden elevation-2">
            <Swiper
                className="swiper-bullet-active:!bg-primary swiper-bullet:opacity-100 swiper-bullet:bg-white swiper-bullet:w-4 swiper-bullet-active:!w-8 swiper-bullet:!rounded-md"
                spaceBetween={0}
                keyboard={true}
                mousewheel={{
                    forceToAxis: true,
                }}
                pagination={{
                    enabled: true,
                    clickable: true
                }}
                modules={[Keyboard, Mousewheel, Pagination, Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    waitForTransition: true,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false

                }}
            >

                {
                    slides?.map((slide, index) => (

                        <SwiperSlide key={index} className='w-full'>
                            <div className="w-full aspect-w-[1.78] relative aspect-h-1">
                                <Image fill className="w-full h-full object-cover" src={BASE_URL + slide} />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
