import Header from "../../_components/header"
import Hero from "../../_components/hero"
import Benefits from "../../_components/benefits"
import VideoSection from "../../_components/video-section"
import Contribution from "../../_components/contribution"
import Form from "../../_components/form"
import background from "../../_images/blue-bg.png"
import heroBackground from "../../_images/hero.webp"
import { getDonationPageDetails } from "@/server/get-donation-homepage-details"
import { notFound } from "next/navigation"
import { SetColors } from "./set-colors"


export async function generateStaticParams() {
    return [];
}



export default async function Pages({ params }) {

    const { pageType } = params;

    const data = await getDonationPageDetails();
    const founderCards = data.patron.founder_patron;


    let invalidRoute = false;
    switch (pageType?.toLowerCase()) {
        case "royal":
        case "chief":
        case "principal":
        case "special":
            break;
        default: (
            invalidRoute = true
        )
    }

    if (invalidRoute) return notFound();

    return (
        <div
            style={{
                backgroundImage: `url('${background.src}')`,
                "--patron-background": "10, 36, 85",
                "--patron-card-background": "41, 137, 228"
            }}

            className="bg-patron-background text-patron-foreground min-h-screen w-full relative z-0">
            <SetColors />
            <Header />
            <Hero backgroundImage={heroBackground} pageName={pageType + " " + "founder patron"} />
            <div
                style={{
                    backgroundImage: `radial-gradient(circle at left 45%, rgba(22,125,224,1) 0%, rgba(0,0,0,0) 40%)`,
                }}
                className="bg-no-repeat"

            >
                <Benefits cards={founderCards} />
                <Form pageName={pageType + " " + "founder patron"} />
            </div>
            <div
                style={{
                    backgroundImage: `radial-gradient(circle at right, rgba(22,125,224,1) 0%, rgba(0,0,0,0) 40%)`,
                }}
                className="bg-no-repeat"

            >

                <div className="bg-gradient-to-b from-transparent to-[#181818] pb-20">
                    <VideoSection />
                    <Contribution />
                </div>

            </div>
        </div>
    )
}