import { Image } from "@/components/image";

import { GenericDonationSection } from "./generic-donation-section";
import { getDonationPageDetails } from "@/server/get-donation-homepage-details";
import { FestivalDonationSection } from "./_components/festival-donation-section";
import { EkadashiSection } from "./_components/ekadashi-section";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function Donation() {
  const data = await getDonationPageDetails();
  const beforeEkadashiSections = data.beforeEkadashiSection;
  const afterEkadashiSections = data.afterEkadashiSection;

  return (
    <div className="w-full">
      <div className="bg-background-dark text-background">
        <div className="max-w-7xl px-4 w-full mx-auto space-y-12 md:space-y-16 pb-12 md:pb-16 pt-12 md:pt-16">
          <GeneralDonationSection data={data.generalDonationSection} />
          <FestivalDonationSection data={data.festivalDonationSection} />
        </div>
      </div>

      <div className="py-12 md:py-16 space-y-12 md:space-y-16">
        {beforeEkadashiSections.map((section, index) => (
          <GenericDonationSection
            key={index}
            limit={8}
            title={section.sectionName}
            sectionBackground={section.sectionBackground}
            cards={section.sectionCards}
          />
        ))}
      </div>

      {/* ekadashiSection */}
      <EkadashiSection data={data.ekdashiSection} />

      <div className="py-12 md:py-16 space-y-12 md:space-y-16">
        {afterEkadashiSections.map((section, index) => (
          <GenericDonationSection
            key={index}
            limit={8}
            title={section.sectionName}
            sectionBackground={section.sectionBackground}
            cards={section.sectionCards}
          />
        ))}
      </div>
    </div>
  );
}

function GeneralDonationSection({ data }) {
  const cards = data.cards;
  return (
    <div className="space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">Popular Donations</h1>

      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="block overflow-hidden rounded-xl bg-white text-black flex-grow min-w-[48%] max-w-[48%] xs:min-w-[30%] xs:max-w-[30%] md:min-w-[236px] md:max-w-[236px]"
          >
            <div className="w-full h-40 relative">
              <Image
                sizes="300px"
                fill
                className="rounded-b-xl h-full w-full object-cover"
                src={BASE_URL + card.image}
                alt={card.image_alt}
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col">
              <h5 className="text-base sm:text-lg font-semibold">{card.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
