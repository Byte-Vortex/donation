import Header from "../../_components/header"
import Hero from "../../_components/hero"
import Benefits from "../../_components/benefits"
import VideoSection from "../../_components/video-section"
import Contribution from "../../_components/contribution"
import Form from "../../_components/form"
import background from "../../_images/pink-bg.png"
import heroBackground from "../../_images/hero-pink.webp"
import { getDonationPageDetails } from "@/server/get-donation-homepage-details"
import { notFound } from "next/navigation"
import { SetColors } from "./set-colors"


export async function generateStaticParams() {
    return [];
}


export default async function Pages({ params }) {

    const { pageType } = params;

    const data = await getDonationPageDetails();
    const patron = data.patron;



    let invalidRoute = false;

    let lifeCards = [];

    switch (pageType?.toLowerCase()) {
        case "royal":
            lifeCards = patron.royal_life_patron;
            break;
        case "chief":
            lifeCards = patron.chief_life_patron;
            break;
        case "principal":
            lifeCards = patron.principal_life_patron;
            break;
        case "special":
            lifeCards = patron.special_life_patron;
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
                "--patron-background": "137, 3, 107",
                "--patron-card-background": "158, 12, 156"
            }}

            className="bg-patron-background text-patron-foreground min-h-screen w-full relative z-0">
            <SetColors />
            <Header />
            <Hero backgroundImage={heroBackground} pageName={pageType + " " + "life patron"} />

            <div
                style={{
                    backgroundImage: `radial-gradient(circle at left 46%, rgba(96, 5, 134, 1) 0%, rgba(0,0,0,0) 50%)`,
                }}
                className="bg-no-repeat"

            >
                <Benefits cards={lifeCards} />
                <Form pageName={pageType + " " + "life patron"} />
            </div>


            <div
                style={{
                    backgroundImage: `radial-gradient(circle at right, rgba(96, 5, 134, 1) 0%, rgba(0,0,0,0) 50%)`,
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