import { Header } from "./_components/header";
import { Donation } from "./_components/donation/donation";
import { BankDetails } from "./_components/bank_details/bank-details";
import { Importance } from "./_components/importance/importance";
import { HeroSection } from "./_components/hero-section";
import { getDonationPageDetails } from "@/server/get-donation-homepage-details";
import { Footer } from "@/components/footer/footer";
import { FaqSection } from "./_components/faq-section";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import Navbar from "./_components/navbar";
import DonationTabs from "./_components/donation";
import { PopularDonations } from "./_components/popular-donations";
import EmpowerPrograms from "./_components/programs-section";
import PatronsSection from "./_components/patrons-section";
import ChangeSection from "./_components/change-section";
import TestimonialSection from "./_components/testimonial";
import TestimonialSection2 from "./_components/testimonial-section";

export async function generateMetadata({ params }) {

  return {
    other: {
      'facebook-domain-verification': "6nz3m5aohicnvmk75dryx0k6uee564",
    },
  }
};

export default async function Home() {
  const [data, scripts] = await Promise.all([
    getDonationPageDetails(),
    getScriptTags("global"),
  ]);
  return (
    <>
      <Header />
      <Navbar />
      <DynamicScripts pathname={"global"} scripts={scripts} />
      <main className="flex flex-col w-full z-0 relative">
        {/* Hero section */}
        <HeroSection data={data.heroSection} />
        {/* <Donation /> */}
        <PopularDonations data={data} />
        <EmpowerPrograms />
        <TestimonialSection/>
        <DonationTabs data={data} limit={8}/>
        <ChangeSection/>
        <TestimonialSection2 />
        <PatronsSection data={data}/>
        <BankDetails />
        <Importance />
        <FaqSection data={data.faqSection} />
        <div className="max-w-7xl w-full mx-auto">
          <ProseInnerHtmlContainer
            className="px-4 mt-8 mb-20"
            html={data.footer_body}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
