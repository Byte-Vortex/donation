import { Image } from "@/components/image";
import { generateTextJSX } from "@/lib/utils";
import { RiDoubleQuotesL } from "react-icons/ri";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function AboutUserSection({userDetails}) {

    if (!userDetails) return null;

    return (
        <div className="bg-landing-tertiary">
            <div className="max-w-4xl w-full mx-auto pt-24 pb-20 space-y-6 px-4 text-center">
                <p className="font-bold text-lg">
                    <span className="text-landing-secondary capitalize">{userDetails.name}</span> needs your support to raise <span className="text-landing-secondary">{userDetails.goal} Square Feet</span> for Gupt Vrindavan Dham.
                </p>

                <div className="flex-wrap sm:flex-nowrap flex gap-8 items-start w-full">

                    {
                        userDetails.profilephoto &&
                        <div className="h-48 rounded-lg overflow-hidden border-4 border-landing-secondary min-w-[12rem] max-w-[12rem] mx-auto relative">
                            <Image fill className="h-full w-full object-cover" alt="Campaigner Image" title="Campaigner Image" src={BASE_URL + userDetails.profilephoto} />
                        </div>
                    }

                    <div className="border-4 border-landing-secondary p-4 rounded-xl w-full mx-auto relative flex-grow h-full">
                        <div className="text-landing-foreground min-h-[6rem]">
                            <div>
                                {generateTextJSX(userDetails.message)}
                            </div>
                        </div>

                        <div className="bg-landing-tertiary text-landing-secondary text-4xl absolute left-4 -top-5">
                            <RiDoubleQuotesL />
                        </div>

                        <div className="bg-landing-tertiary text-landing-secondary text-4xl absolute right-4 -bottom-4 rotate-180">
                            <RiDoubleQuotesL />
                        </div>
                    </div>

                </div>


                <div className="rounded-full w-full h-8 bg-landing-background/70 flex items-center justify-center text-center relative z-0 overflow-hidden">
                    <span className="invert mix-blend-difference z-[1] grayscale">{((userDetails.acheived_goal / userDetails.goal) * 100).toFixed(2)}%</span>

                    <div
                        style={{
                            // width: `'${((40 / userDetails.goal) * 100)}'%`
                            width: `${(userDetails.acheived_goal / userDetails.goal) * 100}%`
                        }}
                        className="bg-gradient-to-r h-full absolute top-0 left-0 from-landing-secondary to-landing-secondary z-0"
                    />
                </div>

                <p>
                    <span className="text-xl font-bold text-landing-secondary">{userDetails.acheived_goal} Sq. Ft.</span>&nbsp;
                    raised of <span className="text-landing-secondary font-bold">{userDetails.goal} Sq. Ft.</span> goal.&nbsp;
                    <span className="text-landing-secondary font-bold">{((userDetails.acheived_goal / userDetails.goal) * 100).toFixed(2)}%</span>&nbsp;
                    of goal met.

                </p>

                <p className="text-sm font-bold">*Please donate for square feet seva and support the construction of this grand temple.</p>


            </div>
        </div>
    )
}