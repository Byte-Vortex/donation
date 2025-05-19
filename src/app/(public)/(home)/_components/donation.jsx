"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Image } from "@/components/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import { sortCardsByDate } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function DonationCardGrid({ cards }) {
    const [currentPage, setCurrentPage] = useState(0);
    const breakpoint = useBreakpoint();

    const gridCardLimits = {
        xl: 8, // grid-cols-4 (lg and above)
        lg: 6, // grid-cols-3
        md: 4, // grid-cols-2
        sm: 4, // grid-cols-2 (for sm screens, before Swiper kicks in)
    };

    const cardLimit = gridCardLimits[breakpoint] || 4;
    const totalPages = Math.ceil(cards.length / cardLimit);

    const visibleCards = useMemo(() => {
        const start = currentPage * cardLimit;
        return cards.slice(start, start + cardLimit);
    }, [cards, currentPage, cardLimit]);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Grid for sm and above with navigation buttons */}
            <div className="hidden sm:flex items-center w-full px-5 md:px-0 relative">
                {/* Previous Button (only shown if currentPage > 0) */}
                {currentPage > 0 && (
                    <button
                        onClick={handlePrev}
                        className="group absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 p-2 -mt-3.5 rounded-full bg-white transition hover:brightness-95"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                )}
                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {visibleCards.map((card, index) => (
                        <Link
                            key={index}
                            href={`/${card.link}`}
                            className="flex flex-col overflow-hidden group transition-all duration-200"
                        >
                            <div className="relative w-full h-80 overflow-hidden rounded-xl">
                                <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                                    <Image
                                        src={BASE_URL + card.image}
                                        alt={card.image_alt}
                                        width={500}
                                        height={500}
                                        className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden"
                                    />
                                </div>
                            </div>
                            <div className="px-4 mt-2 text-center text-sm font-semibold text-gray-800 flex justify-center gap-3 items-center">
                                {card.title}{" "}
                                <ArrowRight className="h-5 w-5 bg-white rounded-full p-1 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Next Button (only shown if there are more pages) */}
                {currentPage < totalPages - 1 && (
                    <button
                        onClick={handleNext}
                        className="group absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 -mt-3.5 p-2 rounded-full bg-white transition hover:brightness-95"
                    >
                        <ArrowRight className="h-5 w-5"/>
                    </button>
                )}
            </div>

            {/* Swiper for below sm */}
            <div className="sm:hidden w-full">
                <Swiper
                    className="h-[25rem] w-full"
                    spaceBetween={14}
                    mousewheel={{
                        releaseOnEdges: true,
                        forceToAxis: true,
                    }}
                    slidesPerView={1.4}
                    keyboard={true}
                    modules={[Keyboard, Mousewheel]}
                    centeredSlides={true}
                    breakpoints={{
                        360: {
                            slidesPerView: 1.5,
                        },
                        560: {
                            slidesPerView: 2.4,
                        },
                    }}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide className="h-full" key={index}>
                            <Link
                                href={`/${card.link}`}
                                className="flex flex-col overflow-hidden group transition-all duration-200 h-full"
                            >
                                <div className="relative w-full h-[18rem] overflow-hidden rounded-xl shadow-md">
                                    <Image
                                        src={BASE_URL + card.image}
                                        alt={card.image_alt}
                                        width={500}
                                        height={500}
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                </div>
                                <div className="px-4 py-3 text-center text-sm font-semibold text-gray-800 flex justify-center gap-3 items-center">
                                    {card.title}{" "}
                                    <ArrowRight className="h-5 w-5 bg-white rounded-full p-1 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState("sm");

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            if (width < 640) setBreakpoint("sm");
            else if (width < 768) setBreakpoint("md");
            else if (width < 1024) setBreakpoint("lg");
            else setBreakpoint("xl");
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return breakpoint;
}

export default function DonationTabs({ data }) {
    const [activeTab, setActiveTab] = useState("festival");

    const getCardsForTab = () => {
        switch (activeTab) {
            case "festival":
                return sortCardsByDate(data.festivalDonationSection.cards || []);
            case "charitable":
                return data.beforeEkadashiSection.find(sec => sec.sectionName === "Charitable Donations")?.sectionCards || [];
            case "other":
                return data.beforeEkadashiSection.find(sec => sec.sectionName === "Other Donations")?.sectionCards || [];
            case "cultural":
                return data.afterEkadashiSection.find(sec => sec.sectionName === "Cultural Centre Construction")?.sectionCards || [];
            case "ekadashi":
                return sortCardsByDate(data.ekdashiSection.sectionCards || []);
            default:
                return [];
        }
    };

    return (
        <div className="max-w-7xl px-4 w-full mx-auto pt-10 sm:pb-5">
            <div className="flex flex-col gap-5 pb-5 justify-center items-center text-center">
                <h2>Other Donations</h2>
                <p className="text-lg">Popular Donation delightfully celebrate the divine appearance</p>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${activeTab === tab.key
                            ? "bg-[#8050b1] text-white"
                            : "bg-[#dcc8f0] text-[#8050b1]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <DonationCardGrid cards={getCardsForTab()} />
        </div>
    );
}

const tabs = [
    { label: "Festival Donations", key: "festival" },
    { label: "Charitable Donations", key: "charitable" },
    { label: "Other Donations", key: "other" },
    { label: "Cultural Construction", key: "cultural" },
    { label: "Ekadashi Donations", key: "ekadashi" },
];