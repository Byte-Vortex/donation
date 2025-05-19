import React from 'react'
import { Image } from '@/components/image'
import Effect from '@/assets/effect.png'
import { Button } from '@/components/ui/button'

export default function ChangeSection() {
    return (
        <div className="w-full py-12 bg-white px-4">
            <div className="max-w-7xl mx-auto w-full rounded-xl px-4 md:px-20 py-10 bg-background flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Left Content */}
                <div className="flex flex-col gap-2 lg:max-w-xl md:w-1/2 text-center md:text-left">
                    <h3>
                        Get Involved in Social change in India
                    </h3>
                    <p className="text-sm md:text-base">
                        Kick the tries the best class template with a free space account
                    </p>
                    <Button className="text-white rounded-md px-6 self-center md:self-start mt-4">
                        Donate now
                    </Button>
                </div>

                {/* Right Image - Larger now */}
                <div className="relative w-full flex-1 flex justify-center">
                    <Image
                        src={Effect}
                        alt="Temple Illustration"
                        width={700}
                        height={500}
                        className="w-full max-w-[400px] object-contain"
                        loadingAnimation={false}
                    />
                </div>
            </div>
        </div>

    )
}
