import { CampaignAuthProvider } from "./_context/context"
import { SetColors } from "./_components/set-colors";
import { Footer } from "@/components/footer/footer";

export default function CampaignLayout({ children }) {

    return (

        <>
            <div
                style={{
                    "--landing-primary": "4, 12, 92",
                    "--landing-secondary": "55, 73, 137",
                    "--landing-tertiary": "208, 208, 255",
                    "--landing-background": "248, 248, 255",
                }}
            >
                <CampaignAuthProvider>
                    {children}
                    <SetColors />
                </CampaignAuthProvider>
            </div>
            <Footer />
        </>
    )
}