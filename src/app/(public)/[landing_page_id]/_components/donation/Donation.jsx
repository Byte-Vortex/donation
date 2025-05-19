import dynamic from "next/dynamic"
import { getLandingDetails } from "../../server/get-landing-details"
// import DonationForm from "@/app/(public)/c/[pagename]/components/donation/_components/donation-form/donation-form"
const DonationForm = dynamic(
  () => import("@/app/(public)/c/[pagename]/components/donation/_components/donation-form/donation-form"),
  {
    ssr: false,
  }
)
import { getBasicDetails } from "@/server/get-basic-details"
import { Suspense } from "react"
import Spinner from "@/components/ui/spinner"

export default async function Donation() {
  const basicDetails = await getBasicDetails()
  const landingDetails = await getLandingDetails()
  const pageType = landingDetails.page_type?.toLowerCase()
  
  return (
    <section id="form" className="relative z-[1]">
      <div className="w-full py-10 relative bg-gradient-to-b from-landing-tertiary via-landing-secondary to-landing-primary">
        <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-8 px-4">
          <h3 className="text-center mx-auto font-bold">
            Offer your Seva and receive the blessings of Sri Radha Krishna
          </h3>

          <div className="flex-wrap flex justify-center h-full">
            <Suspense
              fallback={
                <div className="min-h-96 flex items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              <DonationForm
                data={{
                  minAmount: landingDetails?.minimum_amount || 1,
                  amountSuggestion: landingDetails?.amountSuggestion ?? [],
                }}
                basicDetails={basicDetails}
                pageType={pageType}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
