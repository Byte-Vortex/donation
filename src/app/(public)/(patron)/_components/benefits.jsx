"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from "@/components/image";
import { Keyboard, Mousewheel } from 'swiper/modules';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Benefits({ cards }) {
    return (

        <div>

            <div className="w-full h-16 bg-gradient-to-t from-transparent to-patron-background" />
            <section className="p-4 pt-28 pb-20 space-y-4">

                <div className="max-w-7xl mx-auto">

                    <p className="max-w-3xl text-lg">
                        A unique opportunity to participate in the activities of our society along with your family members. This seva is valid for life time & following privileges: Special Darshan, Festival pass for special entry, Newsletter, Special Pujas, Bhagavadgita & Srimad Bhagavatham Booksets, 80G Receipt, Guest House accomodation facility etc.
                    </p>

                </div>

                <div>
                    <h2 className="text-[calc((min(100vw,1280px)_-_4.5rem)_/_4.5)] max-w-7xl mx-auto">
                        Benefits
                    </h2>

                    <div className="mt-[calc((min(100vw,1280px)_-_4.5rem)_/_-8)] relative -mx-4">

                        <div className='absolute top-0 left-0 h-full w-4 z-10 bg-gradient-to-r to-transparent' />



                        <div className='absolute top-0 right-0  z-10 h-full w-4 bg-gradient-to-l from-patron-background to-transparent' />

                        <Swiper
                            className="h-max"
                            spaceBetween={15}
                            mousewheel={{
                                releaseOnEdges: true,
                                forceToAxis: true,
                            }}

                            slidesPerView={1.2}
                            keyboard={true}
                            modules={[Keyboard, Mousewheel]}
                            centeredSlides={true}

                            breakpoints={{
                                560: {
                                    slidesPerView: 2
                                },
                                // 768: {
                                //     slidesPerView: 3
                                // },
                                1024: {
                                    slidesPerView: 4
                                }
                            }}
                        >

                            {
                                cards.map((card, index) => (
                                    <SwiperSlide className="h-96" key={index}>
                                        <Card card={card} />
                                    </SwiperSlide>
                                ))
                            }

                            <div className='mt-12'></div>

                        </Swiper>

                    </div>

                </div>
            </section>

        </div>
    )
}


function Card({ card }) {
    return (
        <div className="p-4 rounded-xl h-full w-full bg-patron-card-background/90 border-4 border-patron-foreground/30 flex flex-col gap-1 hover:bg-card-background hover:brightness-110 duration-150">
            <h4>{card.cardtitle}</h4>
            <p>
                {card.cardtext}
            </p>

            <div className="rounded-full h-32 w-32 border-patron-foreground/30 border-2 overflow-hidden p-1 bg-white/40 ml-auto mt-auto relative">
                <Image alt={card.image_alt} fill className="w-full h-full object-cover object-top rounded-full" src={BASE_URL + card.imagelink} />
            </div>
        </div>
    )
}