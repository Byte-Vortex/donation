import React from 'react'
import { Image } from '@/components/image'

const testimonials = [
    {
        name: 'Vinod Khosla',
        designation: 'Vinod Ventures',
        image: '/vinod.jpg',
        text: `People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it's a very good, reliable organization. People should have confidence in giving to GiveIndia and know that the money will be used immediately to help somebody.`,
    },
    {
        name: 'Vinod Khosla',
        designation: 'Vinod Ventures',
        image: '/vinod.jpg',
        text: `When Nick & I decided to start our #TogetherForIndia fundraiser for the COVID-19 crisis, we wanted a partner with experience & boots on the ground. So we turned to GiveIndia. They were transparent...`,
    },
    {
        name: 'Vinod Khosla',
        designation: 'Vinod Ventures',
        image: '/vinod.jpg',
        text: `People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it's a very good, reliable organization...`,
    },
    // Add more testimonials as needed
];

export default function TestimonialSection2() {
    return (
        //   <section className="bg-[#F1F5FE] py-20 ">

        //       {/* <div className="max-w-7xl mx-auto text-center mb-12">
        //           <h2 className="text-3xl md:text-4xl font-bold">
        //               Here&apos;s what people say <br />
        //               <span className="text-primary">about us</span>
        //           </h2>
        //       </div> */}

        //       {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        //           {testimonials.map((t, index) => (
        //               <div
        //                   key={index}
        //                   className="bg-white rounded-xl py-6 px-4  shadow-md text-left flex flex-col justify-between"
        //               >
        //                   <p className="text-sm mb-6 text-gray-800">{t.text}</p>
        //                   <div className="flex items-center gap-3 mt-auto">
        //                       <Image
        //                           src={t.image}
        //                           alt={t.name}
        //                           width={40}
        //                           height={40}
        //                           className="rounded-full object-cover"
        //                       />
        //                       <div>
        //                           <p className="font-semibold">{t.name}</p>
        //                           <p className="text-sm text-gray-500">{t.designation}</p>
        //                       </div>
        //                   </div>
        //               </div>
        //           ))}
        //       </div> */}
        //   </section>
        <div className='max-w-6xl w-full px-4 mx-auto py-14 grid grid-cols-1 md:grid-cols-3 gap-10'>
            <div className='flex flex-col gap-10'>
                <div
                    className="bg-white rounded-xl py-6 px-4  shadow-md text-left flex flex-col justify-between"
                >
                    <p className="text-sm mb-9 text-justify">People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it&apos;s a very good, reliable organization. People should have confidence in giving to GiveIndia and know that the money will be used immediately to help somebody.</p>
                    <div className="flex items-center gap-3 mt-auto">
                        <div className='h-14 w-14 rounded-sm bg-surface'></div>
                        <div className='flex flex-col'>
                            <h5>Vinod Khosla</h5>
                            <p className="text-sm text-gray-500">Vinod Ventures</p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white rounded-xl py-6 px-4  shadow-md text-left flex flex-col justify-between"
                >
                    <p className="text-sm mb-9 text-justify">People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it&apos;s a very good, reliable organization. People should have confidence in giving to GiveIndia and know that the money will be used immediately to help somebody.</p>
                    <div className="flex items-center gap-3 mt-auto">
                        <div className='h-14 w-14 rounded-sm bg-surface'></div>
                        <div className='flex flex-col gap-3'>
                            <h5>Vinod Khosla</h5>
                            <p className="text-sm text-gray-500">Vinod Ventures</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div >
                    <h2 className='text-center'>Here&apos;s what people say <span className='text-primary'>about us</span></h2>
                </div>
                <div
                    className="bg-white rounded-xl py-6 px-4  shadow-md text-left flex flex-col justify-between"
                >
                    <p className="text-sm mb-6 text-justify">When Nick & I decided to start our #TogetherForIndia fundraiser for the COVID-19 crisis, we wanted a partner with experience & boots on the ground. So we turned to Give India. They were transparent, providing regular updates on where & how funds were deployed. Also, their work on ground meant we could pivot our objectives basis changing needs. Their team of professional, passionate people ensured aid was given where most needed.</p>
                    <div className="flex items-center gap-3 mt-auto">
                        <div className='h-14 w-14 rounded-sm bg-surface'></div>
                        <div className='flex flex-col'>
                            <h5>Vinod Khosla</h5>
                            <p className="text-sm text-gray-500">Vinod Ventures</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div
                    className="bg-white rounded-xl py-6 px-4  shadow-md text-left flex flex-col justify-between"
                >
                    <p className="text-sm mb-9 text-justify">People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it&apos;s a very good, reliable organization. People should have confidence in giving to GiveIndia and know that the money will be used immediately to help somebody.</p>
                    <div className="flex items-center gap-3 mt-auto">
                        <div className='h-14 w-14 rounded-sm bg-surface'></div>
                        <div className='flex flex-col'>
                            <h5>Vinod Khosla</h5>
                            <p className="text-sm text-gray-500">Vinod Ventures</p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white rounded-xl py-6 px-4  shadow-md text-left flex flex-col justify-between"
                >
                    <p className="text-sm mb-9 text-justify">People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it&apos;s a very good, reliable organization. People should have confidence in giving to GiveIndia and know that the money will be used immediately to help somebody.</p>
                    <div className="flex items-center gap-3 mt-auto">
                        <div className='h-14 w-14 rounded-sm bg-surface'></div>
                        <div className='flex flex-col'>
                            <h5>Vinod Khosla</h5>
                            <p className="text-sm text-gray-500">Vinod Ventures</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
