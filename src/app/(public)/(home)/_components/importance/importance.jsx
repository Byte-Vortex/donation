import { SwiperSlider } from "./swiper-slider";
import { getDonationPageDetails } from "@/server/get-donation-homepage-details";

export async function Importance() {
  const data = await getDonationPageDetails();

  const importanceData = data.importanceSection;
  return (
    <div>
      <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h3 className="text-primary text-center mb-6 text-3xl md:text-4xl font-bold">IMPORTANCE</h3>

        <SwiperSlider importanceData={importanceData} />
      </section>
    </div>
  );
}
