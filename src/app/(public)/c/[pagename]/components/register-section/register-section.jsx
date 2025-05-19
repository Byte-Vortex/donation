import hkm_image from "../../images/hkm-image.png"
import Link from "next/link";
import { Image } from "@/components/image";

export function RegisterSection({ data }) {

    const { campaign_id, userDetails } = data;

    if (userDetails?.status !== undefined && userDetails?.status === false) return null;

    return (
        <div id="create-campaign" className="max-w-7xl mx-auto w-full py-12 px-4">
            <div className="rounded-xl grid md:grid-cols-5 text-landing-background bg-gradient-to-t md:bg-gradient-to-r from-landing-secondary via-landing-primary to-landing-primary overflow-hidden shadow-md shadow-landing-primary/50">

                <div className="w-full relative z-0 h-[20rem] sm:h-[24rem] md:col-span-2">
                    <Image
                        fill
                        className="h-full w-full object-cover object-center md:object-top"
                        src={hkm_image}
                    />
                    <div className="absolute top-0 bg-gradient-to-t md:bg-gradient-to-r from-landing-primary via-transparent to-transparent h-full w-full z-[1]" />
                </div>

                <div className="flex flex-col gap-4 p-4 ml-4 md:order-first sm:p-6 justify-around min-h-[18rem] sm:min-h-[28rem] md:min-h-full md:col-span-3">
                    <h3>Start Your Fundraising Campaign</h3>
                    <ul className="list-inside list-disc">
                        <li>Create your own fundraising campaign</li>
                        <li>Share your campaign with your friends & family</li>
                        <li>Encourage them to donate & start their own campaign</li>
                    </ul>
                    <Link href={"/c/register/" + campaign_id} className="bg-white px-6 py-2 font-semibold rounded-[7px] shadow-md shadow-white/60 text-landing-primary max-w-max hover:underline duration-150 text-center">Create My Fundraising Campaign</Link>

                </div>
            </div>

        </div>
    )
}