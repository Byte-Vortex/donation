import React from 'react'
import { YouTubeEmbed } from '@/components/ui/youtube-embed'

export default function TestimonialSection() {
    return (
        <div className='bg-white'>
            <div className="max-w-7xl px-4 w-full mx-auto py-10 flex flex-col gap-10">
                <div className='flex flex-col md:flex-row justify-between gap-10'>
                    <div className="flex-[.70] max-h-max my-auto overflow-hidden rounded-xl min-h-28 shadow-lg">
                        <div className="aspect-w-16 aspect-h-9 relative">
                            <YouTubeEmbed videoId="c_Y-9AYFJ_g" />
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col text-left gap-2'>
                        <h2>Hear What Our Donors Say..</h2>
                        <p>Supporting this cause felt like offering a flower at the Lord&apos;s lotus feet—simple, sincere, and full of love.
                            Anjali shares why she chose to donate monthly and how it brought spiritual joy to her life.</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between gap-10'>
                    <div className='hidden md:flex flex-col flex-1 text-right gap-2'>
                        <h2>Voices That Inspire: Influencers Speak</h2>
                        <p>You won&apos;t find anything more authentic and heartfelt. This is what the internet needs You won&apos;t find anything more authentic and heartfelt. This is what the internet needs</p>
                    </div>
                    <div className="flex-[.70] max-h-max my-auto overflow-hidden rounded-xl min-h-28 shadow-lg">
                        <div className="aspect-w-16 aspect-h-9 relative">
                            <YouTubeEmbed videoId="7UXXaOowRNI" />
                        </div>
                    </div>
                    <div className='md:hidden flex-1 text-right gap-2'>
                        <h2>Voices That Inspire: Influencers Speak</h2>
                        <p>You won&apos;t find anything more authentic and heartfelt. This is what the internet needs You won&apos;t find anything more authentic and heartfelt. This is what the internet needs</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
