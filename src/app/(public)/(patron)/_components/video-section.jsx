import { YouTubeEmbed } from "@/components/ui/youtube-embed";

export default function VideoSection() {

    return (
        <section
            className="bg-cover bg-no-repeat relative">

            <div className="w-full max-w-6xl mx-auto p-4 py-20 overflow-x-hidden">

                <div className='aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden'>
                    <YouTubeEmbed videoId={"KW2vdm6N2B4"} autoplay />
                </div>

            </div>

        </section>
    )
}
