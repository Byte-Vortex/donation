"use client"

import { Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card';
import Image1 from "./images/Image1.webp"
import Image2 from "./images/Image2.webp"
import Image3 from "./images/Image3.webp"
import Image4 from "./images/Image4.webp"
import Image5 from "./images/Image5.webp"
import Image6 from "./images/Image6.webp"

import { FaStar } from "react-icons/fa";
import { SwiperNextNavigationButton, SwiperPrevNavigationButton } from '@/components/ui/swiper-buttons';
import { useRef } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ImportanceSection({ importanceData }) {

    const sliderRef = useRef(null);


    const defaultImportanceData = [
        {
            image_link: Image1,
            importanceTitle: "Srimad Bhagavatam 10.11.11",
            importanceType: "फलिवकियणी तस चुतधानकरदयम् ।\n फलैरपूरयद्रतै: फलभाणमपूिर च ॥",
            importanceText: "While Kṛṣṇa was going to the fruit vendor very hastily, most of the grains He was holding fell. Nonetheless, the fruit vendor filled Kṛṣṇa’s hands with fruits, and her fruit basket was immediately filled with jewels and gold.. ",
        },

        {
            image_link: Image2,
            importanceTitle: "Srimad Bhagavatam 11.27.51",
            importanceType: "पूजादीनां प्रवाहार्थं महापर्वस्वथान्वहम् ।\n क्षेत्रापणपुरग्रामान् दत्त्वा मत्सार्ष्टितामियात् ॥",
            importanceText: "One who offers the Deity gifts of land, markets, cities and villages so that the regular daily worship and special festivals of the Deity may go on continually will achieve opulence equal to My own. ",
        },

        {
            image_link: Image3,
            importanceTitle: "Bhagavad Gita 2.40",
            importanceType: "नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते ।\n स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् ॥",
            importanceText: "In this endeavour of offering service to Lord Kṛṣṇa, you get eternal credit, and a little service offer to Lord Kṛṣṇa can protect one from the most dangerous type of fear. ",
        },
        {
            image_link: Image4,
            importanceTitle: "Srimad Bhagavatam 8.19.41",
            importanceType: "पराग् रिक्तमपूर्णं वा अक्षरं यत् तदोमिति ।\r\nयत् किञ्चिदोमिति ब्रूयात् तेन रिच्येत वै पुमान् ।\r\nभिक्षवे सर्वम्ॐ कुर्वन्नालं कामेन चात्मने ॥",
            importanceText: "If one has money, it should be used to push forward the Krishna consciousness movement so that all of human society will become happy, prosperous and hopeful of being promoted back home, back to Godhead. ",
        },
        {
            image_link: Image5,
            importanceTitle: "Gita Mahatmya 68",
            importanceType: "सत्-पुस्तक-दानं च, गीतयः प्रकरोति यः\r\nस याति ब्रह्म-सदनं, पुनर्-आवृत्ति-दुर्लभम्",
            importanceText: "One who makes a gift of one hundred copies of the Gita attains to the plane of the Absolute wherefrom rebirth practically never occurs. ",
        },
        {
            image_link: Image6,
            importanceTitle: "Srimad Bhagavatam 10.22.35",
            importanceType: "एतावज्जन्मसाफल्यं देहिनामिह देहिषु ।\n प ्राणैरर्थैर्धिया वाचा श्रेयआचरणं सदा ॥",
            importanceText: "It is the duty of every living being to perform welfare activities for the benefit of others with his life, wealth, intelligence and words. ",
        },
    ];


    return (

        <section className="w-full max-w-7xl mx-auto space-y-12 px-4 py-24">

            <div className='flex items-center gap-2 ml-3'>
                <div className='p-2 bg-landing-primary text-2xl rounded-full'>
                    <FaStar className='text-landing-background' />
                </div>
                <h3 className="font-bold text-landing-primary">
                    <span>Importance</span>
                </h3>

                <SwiperPrevNavigationButton className="ml-auto border-2 bg-transparent hover:bg-landing-tertiary" ref={sliderRef} />

                <SwiperNextNavigationButton className="border-2 bg-transparent hover:bg-landing-tertiary" ref={sliderRef} />

            </div>


            <Swiper
                centeredSlides
                centeredSlidesBounds
                ref={sliderRef}
                className="w-full flex flex-col  relative"
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Keyboard]}
                keyboard={{
                    enabled: true,
                }}
                mousewheel={{
                    forceToAxis: true,
                }}
                slidesPerView={1.1}
                breakpoints={{
                    600: {
                        slidesPerView: 2
                    },
                    864: {
                        slidesPerView: 3
                    },
                    1100: {
                        slidesPerView: 3.4
                    }
                }}
            >

                {
                    importanceData?.length ?

                        importanceData.map((cardData, index) => (
                            <SwiperSlide key={index} className='!h-auto min-h-[420px]'>
                                <Card
                                    src={BASE_URL + cardData.image_link}
                                    importanceTitle={cardData.importanceTitle}
                                    importanceType={cardData.importanceType}
                                    importanceText={cardData.importanceText}
                                />
                            </SwiperSlide>
                        ))

                        :


                        defaultImportanceData.map((cardData, index) => (
                            <SwiperSlide key={index} className='!h-auto min-h-[420px]'>
                                <Card
                                    src={cardData.image_link}
                                    importanceTitle={cardData.importanceTitle}
                                    importanceType={cardData.importanceType}
                                    importanceText={cardData.importanceText}
                                />
                            </SwiperSlide>
                        ))
                }

            </Swiper>

        </section>

    )
}
