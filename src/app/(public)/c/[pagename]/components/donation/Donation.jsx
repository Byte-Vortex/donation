import { getBasicDetails } from "@/server/get-basic-details";
import dynamic from "next/dynamic";
import { getCampaignDetails } from "../../../_server/get-campaign-details";
// import DonationForm from "./_components/donation-form/donation-form";

const DonationForm = dynamic(() => import("./_components/donation-form/donation-form"), { ssr: false });

export default async function Donation() {
    const basicDetails = await getBasicDetails();
    const campaignPageDetails = await getCampaignDetails();
    return (

        <section id="form" className="relative z-[1]">
            <div className="w-full py-10 p-4 relative bg-gradient-to-b from-landing-tertiary via-landing-secondary to-landing-primary">

                <div

                    className="w-full max-w-7xl mx-auto space-y-8">
                    <h2 className="text-center md:text-justify mx-auto">Offer your Seva and receive the blessings of Sri Radha Krishna</h2>

                    <div className="flex-wrap flex justify-center h-full">

                        <DonationForm
                            campaignPageDetails={campaignPageDetails}
                            basicDetails={basicDetails}
                        />

                    </div>
                </div>
            </div>

        </section>
    )
}

