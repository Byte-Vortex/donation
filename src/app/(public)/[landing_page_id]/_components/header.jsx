import { BsWhatsapp as WhatsappIcon } from "react-icons/bs";
import Logo from "@/assets/images/gupt-vrindavan-dham-logo.png";
import Link from "next/link";
import { getBasicDetails } from "@/server/get-basic-details";
import { Image } from "@/components/image";

export async function Header({ data }) {
  const basicDetails = await getBasicDetails();
  const headerStripeText = data?.header_stripe_text;
  return (
    <header className="w-full absolute z-20 left-0">
      <div
        className={`py-1 h-10 flex items-center px-4 w-full gap-2 ${headerStripeText
            ? "bg-gradient-to-b from-black/30"
            : "bg-gradient-to-b from-black/70"
          }`}
      >
        <Image
          loadingAnimation={false}
          className="h-auto max-w-[55px]"
          src={Logo}
          alt="HKM Logo"
        />

        <a
          target="_blank"
          rel="noopener"
          href={`https://wa.me/${basicDetails.mobile_number}`}
          className={`ml-auto h-7 w-7 shadow-md font-bold rounded-full text-2xl flex items-center justify-center ${headerStripeText
              ? "bg-landing-tertiary shadow-landing-tertiary/40"
              : "text-landing-primary bg-landing-background shadow-landing-background/40"
            }`}
        >
          <WhatsappIcon className="inline text-[16px]" />
        </a>

        <a
          href="#form"
          className={`rounded-[7px] px-4 text-sm md:text-base shadow-md font-semibold py-0.5 ${headerStripeText
              ? "bg-landing-tertiary shadow-landing-tertiary/40 ml-1"
              : "text-landing-primary bg-landing-background shadow-landing-background/40"
            }`}
        >
          Donate
        </a>
      </div>
    </header>
  );
}
