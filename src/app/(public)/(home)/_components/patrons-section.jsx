"use client";

import { useState} from "react";
import Link from "next/link";
import { Image } from "@/components/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel } from 'swiper/modules';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
    { label: "Founder Patron", key: "founder" },
    { label: "Life Patron", key: "life" }
];

export default function PatronsSection({ data}) {
    const [activeTab, setActiveTab] = useState("founder");

    const getCardsForTab = () => {
        const allCards = data.afterEkadashiSection.find(
            sec => sec.sectionName === "Become a life Patron"
        )?.sectionCards || [];

        switch (activeTab) {
            case "founder":
                return allCards.slice(0, 4);
            case "life":
                return allCards.slice(4, 8);
            default:
                return [];
        }
    };


    return (
        <div className="bg-white">
            <div className="max-w-5xl w-full px-4 mx-auto py-10 flex flex-col md:flex-row items-start justify-between gap-8 ">
                <div className="md:w-1/2 w-full flex flex-col gap-6 md:mt-8">
                    <div className="text-center sm:text-left ">
                        <h2 className="mb-2">Become a Patron</h2>
                        <p>
                            You won&apos;t find anything more authentic and heartfelt.
                            This is what the internet needs. You won&apos;t find anything
                            more authentic and heartfelt. This is what the internet needs.
                        </p>
                    </div>

                    <div className="flex md:flex-col gap-4 justify-evenly">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2 rounded-lg text-base font-medium transition w-44 ${activeTab === tab.key
                                    ? "bg-[#8050b1] text-white"
                                    : "bg-[#dcc8f0] text-[#8050b1]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="md:w-1/2 w-full">
                    <PatronCards cards={getCardsForTab()} />
                </div>
            </div>
</div>
    );
}

function PatronCards({ cards }) {
    return (
        <div className="w-full">
            <Swiper
                className="md:h-fit lg:h-[24rem]"
                spaceBetween={10}
                mousewheel={{
                    releaseOnEdges: true,
                    forceToAxis: true,
                }}
                slidesPerView={1.9}
                keyboard={true}
                modules={[Keyboard, Mousewheel]}
                centeredSlides={true}
                breakpoints={{
                    560: {
                        slidesPerView: 1.8,
                    },
                    700:{
                        slidesPerView: 1.8,
                    },
                    1024: {
                        slidesPerView: 1.4,
                    },
                }}
            >
                {cards.map((card, index) => (
                    <SwiperSlide className="h-full" key={index}>
                        <Link
                            href={`/${card.link}`}
                            className="flex flex-col overflow-hidden group transition-all duration-200"
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md">
                                <Image
                                    src={BASE_URL + card.image}
                                    alt={card.image_alt}
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-full rounded-xl"
                                />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

