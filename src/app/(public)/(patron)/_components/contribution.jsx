"use client"

import Prop from "@/assets/images/prop-1.svg"
import cardBackground from "../_images/cardbackground.webp"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from "swiper/modules";
import { useRef } from "react";
import { SwiperNextNavigationButton, SwiperPrevNavigationButton } from "@/components/ui/swiper-buttons";
import Image from "next/image";

export default function Contribution() {

    const sliderRef = useRef();


    const cards = [
        {
            title: "Skanda Purana ",
            text: "Just by starting the construction of a temple for Lord Sri Hari, sins committed in seven births will be wiped out and one will deliver his forefathers who are suffering in the hellish planets."
        },
        {
            title: "Bhagavatam",
            text: "One who offers the Deity gifts of land, markets, cities and villages so that the regular daily worship and special festivals of the Deity may go on continually will achieve opulence equal to My own."
        },
        {
            title: "Narsimha Purana",
            text: "O devoted one, one who builds a beautiful temple for Lord Narsimha will be freed from all sinful reactions & he will enter the Vaikuntha planets."
        },
        {
            title: "Vamana Purana",
            text: "A Person who builds. a temple for Lord Vishnu, will save his father, Grand father & his eight generations of ancestors from going to hell."
        },
        {
            title: "Vishnu Darmottar",
            text: "A person who builds temple for Lord Vishnu will get same result of performing Rajsuya Yajna or Ashwamedh Yajna"
        }

    ];
    return (

        <div className="px-4">

            <section className="w-full max-w-7xl mx-auto space-y-12 p-4 mb-12">

                <h2 data-aos="fade-up" className="text-center font-bold text-white">
                    “Glories of building a Temple for Lord Vishnu”
                </h2>

                <div className='relative'>

                    <div className="rounded-xl overflow-hidden">
                        <Swiper
                            ref={sliderRef}
                            className="max-w-7xl overflow-x-hidden  "
                            spaceBetween={10}
                            modules={[Mousewheel, Keyboard]}
                            keyboard={{
                                enabled: true,
                            }}
                            mousewheel={{
                                releaseOnEdges: true,
                            }}
                            slidesPerView={1.15}
                            centeredSlides
                            centeredSlidesBounds
                            breakpoints={{
                                600: {
                                    slidesPerView: 2
                                },
                                864: {
                                    slidesPerView: 3
                                },
                                1100: {
                                    slidesPerView: 4
                                }
                            }}
                        >

                            {

                                cards.map((card, index) => (
                                    <SwiperSlide key={index}>
                                        <div

                                            style={{
                                                backgroundImage: `url(${cardBackground.src})`
                                            }}
                                            className="bg-blend-overlay text-foreground h-96 rounded-xl p-6 pt-12 space-y-2 text-center bg-cover font-semibold">
                                            <h4 className="font-bold text-xl">{card.title}</h4>
                                            <p>
                                                {card.text}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))


                            }


                        </Swiper>
                    </div>

                    <div className='h-full absolute top-0 -left-3 z-10 flex items-center'>
                        < SwiperPrevNavigationButton className="relative" ref={sliderRef} />
                    </div>

                    <div className='h-full absolute top-0 -right-3 z-10 flex items-center'>
                        <SwiperNextNavigationButton ref={sliderRef} />
                    </div>

                </div>

            </section>


            <section data-aos="fade" className='max-w-6xl mx-auto text-center p-4 sm:p-8 border-[6px] border-patron-card-background rounded-xl text-lg bg-white text-foreground'>


                <h2 data-aos="fade-up" className='text-center leading-[1.1]'>
                    “Contribution for Lord&apos;s Service”
                </h2>

                <div className='mt-6 max-w-3xl mx-auto space-y-6'>

                    <div className="space-y-4">
                        <p>
                            If anything is offered to Krishna with love and affection, Krishna can reciprocate
                            many millions of times over, both materially and spiritually And we don&apos;t lose anything.
                        </p>

                        <p>
                            कृष्ण को स्नेह के साथ कुछ अर्पित करने पर हम कुछ नहीं है परन्तु भगवान् हमे भौतिक
                            तथा आध्यात्मिक रूप में लाखों गुना बढ़ाकर फल प्रदान करते हैं। मूल बात है प्रेम का विनिमय |
                        </p>

                        <p className="text-sm">Srimad Bhagavatam 10.11.11</p>

                    </div>

                    <div className="space-y-4">

                        <Image className="block max-w-max mx-auto" src={Prop} width={233} height={21} alt="Prop image" />

                        <p>
                            Those who give contributions to expand the activities of the Krishna consciousness movement and to
                            accomplish its objectives will never be losers; they will get their wealth back with the blessings of Lord Krishna.
                        </p>

                        <p>
                            जो लोग कृष्ण भावनामृत आन्दोलन के कार्यों को बढ़ावा देने के लिए और इसके उद्देश्यों को पूरा करने के लिए दान देते हैं,
                            वे कभी घाटे में नहीं रहते उन्हें भगवान् श्रीकृष्ण के आशीर्वाद से सब कुछ वापस मिल जाता है।
                        </p>

                        <p className="text-sm">
                            Srimad Bhagavatam 5.24.18
                        </p>

                        <Image className="block max-w-max mx-auto" src={Prop} width={233} height={21} alt="Prop image" />

                    </div>

                    <div className="space-y-4">

                        <p>
                            Money is also called Lakshmi, and Lakshmi is always engaged in the service of Narayana.
                            Wherever there is money, it must be engaged in the service of Lord Narayana.
                        </p>

                        <p>
                            धनको लक्ष्मी भी कहते हैं और लक्ष्मी जी सदैव नारायण की सेवा में संलग्न रहती है।
                            अतः जहाँ भी धन हो, उसे भगवान् नारायण की सेवा में लगाना चाहिए।
                        </p>

                        <p className="text-sm">Srimad Bhagavatam 5.26.36</p>

                    </div>
                </div>

            </section>

        </div>

    )
}