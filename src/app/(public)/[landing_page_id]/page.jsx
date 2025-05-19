import { Header } from "./_components/header";
import HeroSection from "./_components/hero/HeroSection";
import Donation from "./_components/donation/Donation";
import DonationCardsSection from "./_components/donation-cards-section";
import ContentSection from "./_components/content-section";
import { getLandingDetails } from "./server/get-landing-details";
import { DonateStrip } from "./_components/donate-strip";
import { setSlug } from "./server/slug-context";
import { LandingPageProvider } from "./context/context";
import { getBasicDetails } from "@/server/get-basic-details";
import { SetColors } from "./_components/set-colors";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer/footer";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";
import dynamic from "next/dynamic";
import QuotesSection from "./_components/quotes-section";
import AboutSection from "./_components/about-section";
import { InsightCard } from "./_components/insight-card";
import { HeaderStrip } from "./_components/header-strip";
import FundraisingProgress from "./_components/fund-raising-progress";
// import DonorPrivilegesSection from "./_components/donor-privileges-section";
// import TestimonialsSection from "./_components/testimonials-section";
// import ContributorsSection from "./_components/contributors-section";
// import ImportanceSection from "./_components/importance-section/importance-section";
// import GallerySection from "./_components/gallery-section";
// import FaqSection from "./_components/faq-section";
// import CardSlider from "./_components/card-slider/card-slider";
const DonorPrivilegesSection = dynamic(() => import("./_components/donor-privileges-section"), { ssr: false });
const TestimonialsSection = dynamic(() => import("./_components/testimonials-section"), { ssr: false });
const CardSlider = dynamic(() => import("./_components/card-slider/card-slider"), { ssr: false });
const ContributorsSection = dynamic(() => import("./_components/contributors-section"), { ssr: false });
const ImportanceSection = dynamic(() => import("./_components/importance-section/importance-section"), { ssr: false });
const GallerySection = dynamic(() => import("./_components/gallery-section"), { ssr: false });
const FaqSection = dynamic(() => import("./_components/faq-section"), { ssr: false });

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  setSlug(params.landing_page_id);
  const [data] = await Promise.all([getLandingDetails()]);

  const Banner = data.banners.banners[0];

  return {
    openGraph: {
      images: [{
        url: Banner.desktop,
        width: "1920",
        height: "729",
      }],
    },
    twitter: {
      images: [Banner.desktop],
    }
  };
}

export default async function LandingPage({ params }) {
  setSlug(params.landing_page_id);
  let data = null;
  let scripts = null;

  try {
    [data, scripts] = await Promise.all([
      getLandingDetails(),
      getScriptTags("/" + params.landing_page_id + "/"),
    ]);
  } catch (err) {
    return notFound();
  }

  const basicDetails = await getBasicDetails();
  const colors = data?.colors;

  const contributorsData = data.sections.find(
    section => section.type === 'contributorsSection'
  )?.data;

  const filteredSections = data.sections.filter(
    section => section.type !== 'contributorsSection'
  );
  const page = data?.page_name;

  const sectionMap = {
    quote: (data,background) => <QuotesSection quoteSection={data} background={background} />,
    about: (data) => <AboutSection aboutSection={data} />,
    card_section: (data) => (
      <DonationCardsSection
        sevaName={data.title}
        donationTypes={data.donationTypes}
      />
    ),
    insights: (data,background,page) => (
      <>
        <InsightCard background={background} insightsData={data} />
        <FundraisingProgress page={page} />
      </>
    ),
    donor_privileges: (data) => (
      <DonorPrivilegesSection donorPrivilegesSection={data} />
    ),
    testimonial: (data) => (
      <TestimonialsSection testimonialsSection={data.testimonials} />
    ),
    cardslider_section: (data) => <CardSlider cardslider={data} />,
    form: () => (
      <>
        <ContributorsSection contributorsSection={contributorsData} />
        <Donation />
      </>
    ),
    imp_section: (data) => <ImportanceSection importanceSection={data} />,
    gallery_section: (data) => <GallerySection gallerySection={data} />,
    faq_section: (data) => <FaqSection faqSection={data} />,
    content_section: (data) => <ContentSection contentSection={data} />,
  };

  return (
    <>
      <DynamicScripts
        pathname={"/" + params.landing_page_id + "/"}
        scripts={scripts}
      />
      <LandingPageProvider basicDetails={basicDetails} data={data}>
        <SetColors colors={colors} />
        <div
          className="bg-landing-background relative z-0"
          style={{
            "--landing-primary": colors?.primary,
            "--landing-secondary": colors?.secondary,
            "--landing-tertiary": colors?.tertiary,
            "--landing-background": colors?.background || "255, 255, 255",
          }}
        >
          <HeaderStrip data={data} />
          <Header data={data} />
          <main className="flex flex-col w-full bg-landing-background text-landing-foreground gap-0 overflow-hidden">
            <HeroSection heroData={data} />
            {filteredSections.map((section, index) => {
              const renderSection = sectionMap[section.type];
              return renderSection ? (
                <>{renderSection(section.data,section.background,page)}</>
              ) : null;
            })}
            <DonateStrip stripe_text={data.stripe_text} />
          </main>

        </div>
      </LandingPageProvider>
      <Footer />
    </>
  );
}