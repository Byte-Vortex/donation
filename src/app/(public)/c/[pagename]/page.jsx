import Header from "./components/Header";
import HeroSection from "../_components/hero-section";
import Donation from "./components/donation/Donation";
import ImportanceSection from "./components/importance-section/importance-section";
import { AboutAndProgressSection } from "./components/about-and-progress-section";
import DonorPrivilegesSection from "./components/donor-privileges-section";
import TestimonialsSection from "./components/testimonials-section";
import OtherSection from "./components/other-section";
import ContributorsSection from "./components/contributors-section";
import FaqSection from "./components/faq-section";
import GallerySection from "./components/gallery-section";
import { DonateStrip } from "./components/donate-strip/donate-strip";
import OtherDonorPrivilagesSection from "./components/other-donor-privilages-section";
import PatronshipPrivilagesSection from "./components/patronship-privilages-section";
import CharitableActivitiesSection from "./components/charitable-activities-section";
import TempleFeaturesSection from "./components/temple-features-section";
import { AboutUserSection } from "./components/about-user-section";
import { RegisterSection } from "./components/register-section/register-section";
import { getCampaignDetails } from "../_server/get-campaign-details";
import { redirect } from "next/navigation";
import { setSlug } from "../_server/slug-context";
import dynamic from "next/dynamic";
import { CampaignPageProvider } from "../_context/campaign-context";
import { getBasicDetails } from "@/server/get-basic-details";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { getScriptTags } from "@/app/_server/get-script-tags";
// import NewPageDialog from "./components/new-page-dialog";

const NewPageDialog = dynamic(() => import("./components/new-page-dialog"), {
  ssr: false,
});

export async function generateStaticParams() {
  return [];
}

export default async function CampaignPage({ params }) {
  setSlug(params.pagename);

  const [data, scripts] = await Promise.all([
    getCampaignDetails(),
    getScriptTags("/c/" + params.pagename + "/"),
  ]);
  const basicDetails = await getBasicDetails();

  if (data.redirect) return redirect("/c/square-feet-seva", "replace");

  return (
    <CampaignPageProvider data={data} basicDetails={basicDetails}>
      <DynamicScripts
        pathname={"/c/" + params.pagename + "/"}
        scripts={scripts}
      />
      <Page key={params.pagename} data={data} />
    </CampaignPageProvider>
  );
}

function Page({ data }) {
  return (
    <>
      <div className="bg-background relative z-0">
        <NewPageDialog />
        <div className="">
          {!data.userDetails && (
            <div className="bg-[#fdec03] w-full font-bold text-center py-1 px-4 text-sm md:text-base">
              {data.header_text}
            </div>
          )}
          <div className="absolute w-full z-20 left-0">
            <Header donationDetails={data.donationDetails} />
          </div>
        </div>
        <main className="flex flex-col w-full bg-landing-background text-landing-foreground">
          <AboutUserSection userDetails={data.userDetails} />
          {data.userDetails && (
            <div className="bg-[#fdec03] w-full font-bold text-center py-1 px-4 text-sm md:text-base">
              {data.header_text}
            </div>
          )}
          <HeroSection heroData={data.heroSection} />
          <AboutAndProgressSection data={data} />
          <div className="py-16 space-y-16">
            <DonorPrivilegesSection data={data.donorPrivilagesSection} />
            <OtherDonorPrivilagesSection
              data={data.otherDonorPrivilagesSection}
            />
            <PatronshipPrivilagesSection data={data.patronshipPrivilages} />
          </div>
          <div className="bg-gradient-to-b from-landing-primary via-landing-secondary to-landing-tertiary">
            <div className="max-w-7xl mx-auto space-y-24 py-12">
              <TestimonialsSection data={data.testimonialsSection} />
            </div>
          </div>
          <div className="py-16 space-y-24">
            <CharitableActivitiesSection
              data={data.charitableActivitySection}
            />
            <TempleFeaturesSection data={data.templeFeatureSection} />
          </div>
          <GallerySection data={data.gallerySection} />
          <ImportanceSection importanceData={data.importanceSection} />
          <FaqSection data={data.faqSection} />
          <ContributorsSection data={data.contributorsSection} />
          <Donation />
          <RegisterSection data={data} />
          <OtherSection otherData={data.othersection} />
        </main>
        <DonateStrip stripe_text={data.stripe_text} />
      </div>
    </>
  );
}
